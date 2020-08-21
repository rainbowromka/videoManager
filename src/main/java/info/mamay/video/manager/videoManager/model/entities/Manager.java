package info.mamay.video.manager.videoManager.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Objects;

/**
 * Сущность Менеджер. Используется для входа в систему.
 */
@Entity
@Table(name = "manager", schema = "video_manager")
@SequenceGenerator(
        name = "jpaManagerSequence",
        allocationSize = 1,
        schema = "video_manager",
        sequenceName = "manager_sequence")
public class Manager {
    /**
     * Енкодер паролей.
     */
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    /**
     * ID менеджера.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "jpaManagerSequence")
    private Long id;

    /**
     * Имя менеджера.
     */
    private String name;

    /**
     * Пароль для входа в систему для менеджера.
     */
    private @JsonIgnore
    String password;

    // XXX: Очень своеобразное решение, но думаю это правильное решение и
    // быстрое, посмотреть на сеттер и геттер метода. Если все же не канает, то
    // изучить конвертирование.
    // https://www.baeldung.com/jpa-attribute-converters
    // Более тяжеловесное решение.
    // https://stackoverflow.com/questions/39119164/how-to-use-spring-data-jpa-to-insert-into-a-postgres-array-type-column
    // По все видимости для H2 базы данных такое решение вполне себе хорошее,
    // но мы работаем с постгре и ORM не имеет решения по интерпретации String[]
    /**
     * Роли менеджера. Перечислены через запятую.
     */
    private String roles;

    /**
     * Устанавливает и кодирует пароль менеджера.
     *
     * @param password пароль менеджера.
     */
    public void setPassword(String password)
    {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    /**
     * Создает пустую сущность менеджера.
     */
    public Manager()
    {
    }

    /**
     * Создает сущность менеджера.
     *
     * @param name Имя.
     * @param password Пароль.
     * @param roles Роли.
     */
    public Manager(String name, String password, String... roles)
    {
        this.name = name;
        this.setPassword(password);
        this.setRoles(roles);
    }

    /**
     * Сравнивает сущности.
     *
     * @param o - сравниваемая сущность.
     * @return true, если сущности равны.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Manager manager = (Manager) o;
        return Objects.equals(id, manager.id) &&
                Objects.equals(name, manager.name) &&
                Objects.equals(password, manager.password) &&
                Objects.equals(roles, manager.roles);
    }

    /**
     * Генерирует хешкод объекта.
     *
     * @return Хешкод объекта.
     */
    @Override
    public int hashCode() {
        int result = Objects.hash(id, name, password, roles);
        return result;
    }

    /**
     * Получить id менеджера.
     *
     * @return id менеджера.
     */
    public Long getId() {
        return id;
    }

    /**
     * Установить id менеджера.
     *
     * @param id id менеджера.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Получить имя менеджера.
     *
     * @return Имя менеджера.
     */
    public String getName() {
        return name;
    }

    /**
     * Установить имя менеджера.
     *
     * @param name Имя менеджера.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Получить пароль.
     * @return Пароль.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Преобразовать и получить роли ввиде массива.
     *
     * @return Роли ввиде массива.
     */
    public String[] getRoles() {
        return roles.split(",");
    }

    /**
     * Установить и преобразовать роли ввиде строки.
     *
     * @param roles Роли ввиде массива.
     */
    public void setRoles(String[] roles) {
        this.roles = "";
        for (String role: roles) {
            if (this.roles.length()>0) {
                this.roles += ",";
            }
            this.roles += role;
        }
    }

    /**
     * Преобразовать класс в втроку.
     *
     * @return преобразованный класс в строку.
     */
    @Override
    public String toString() {
        return "Manager{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", roles=" + roles + '\'' +
                '}';
    }
}
