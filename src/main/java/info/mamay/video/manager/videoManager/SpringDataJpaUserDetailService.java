package info.mamay.video.manager.videoManager;

import info.mamay.video.manager.videoManager.model.entities.Manager;
import info.mamay.video.manager.videoManager.model.repositories.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * Компонент описывающий работу пользователей авторизации.
 */
@Component
public class SpringDataJpaUserDetailService
implements UserDetailsService
{
    /**
     * Репозиторий менеджеров, используемого для авторизации в системе.
     */
    private final ManagerRepository repository;

    /**
     * Конструктор класса.
     *
     * @param repository Репозиторий менеджера, используемого для авторизации.
     */
    @Autowired
    public SpringDataJpaUserDetailService(
        ManagerRepository repository)
    {
        this.repository = repository;
    }

    /**
     * Загрузить пользователя по имени.
     *
     * @param name Имя пользователя.
     * @return Возвращает информацию о пользователе.
     * @throws UsernameNotFoundException В случае если пользователь не был
     * найден.
     */
    @Override
    public UserDetails loadUserByUsername(
        String name)
    throws UsernameNotFoundException
    {
        Manager manager = this.repository.findByName(name);
        return new User(manager.getName(), manager.getPassword(),
            AuthorityUtils.createAuthorityList(manager.getRoles()));
    }
}
