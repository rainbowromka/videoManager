package info.mamay.video.manager.videoManager;

import info.mamay.video.manager.videoManager.model.entities.Employee;
import info.mamay.video.manager.videoManager.model.entities.Manager;
import info.mamay.video.manager.videoManager.model.repositories.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Обработчик событий обращения к резпозиторию сотрудника. Для обновления
 * информации о менеджере, выполняющего изменения сущности сотрудника.
 */
@Component
@RepositoryEventHandler()
public class SpringDataRestEventHandler
{
    /**
     * Репозиторий менеджера.
     */
    private final ManagerRepository managerRepository;

    /**
     * Конструктор обработчика событий репозитория менеджера.
     *
     * @param managerRepository Репозиторий менеджера.
     */
    @Autowired
    public SpringDataRestEventHandler(
        ManagerRepository managerRepository)
    {
        this.managerRepository = managerRepository;
    }

    /**
     * В случае создания или после сохранения сотрудника, устанавливаем
     * менеджера, изменившего сотрудника. Если менеджера нет в системе, то
     * создаем менеджера.
     *
     * @param employee Изменяемый сотрудник.
     */
    @HandleBeforeCreate
    @HandleBeforeSave
    public void applyUserInformationUsingSecurityContext(
        Employee employee)
    {
        String name = SecurityContextHolder.getContext()
            .getAuthentication().getName();
        Manager manager = this.managerRepository.findByName(name);
        if (manager == null) {
            Manager newManger = new Manager();
            newManger.setName(name);
            newManger.setRoles(new String[]{"ROLE_MANAGER"});
            manager = this.managerRepository.save(newManger);
        }
        employee.setManager(manager);
    }

}
