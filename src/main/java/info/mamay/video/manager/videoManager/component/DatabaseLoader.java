package info.mamay.video.manager.videoManager.component;

import info.mamay.video.manager.videoManager.model.entities.Employee;
import info.mamay.video.manager.videoManager.model.entities.Manager;
import info.mamay.video.manager.videoManager.model.repositories.EmployeeRepository;
import info.mamay.video.manager.videoManager.model.repositories.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Формирует development-content.
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

    /**
     * Репозиторий сотрудников.
     */
    private final EmployeeRepository employees;

    /**
     * Репозиторий менеджеров.
     */
    private final ManagerRepository managers;


    /**
     * Конструктор инициализации класса формирования development-content'а
     * @param employees репозиторий сотрудников.
     * @param managers репозиторий менеджеров.
     */
    @Autowired
    public DatabaseLoader(
        EmployeeRepository employees,
        ManagerRepository managers)
    {
        this.employees = employees;
        this.managers = managers;
    }

    /**
     * Собственно непосредственно запуск после инициализации Spring Boot,
     * наполняем базу development content'ом.
     * @param strings параметры командной строки.
     * @throws Exception пробрасываем исключения.
     */
    @Override
    public void run(
        String... strings)
    throws Exception
    {
        Manager roman = this.managers.save(
            new Manager("roman", "1", "ROLE_MANAGER"));
        Manager asya = this.managers.save(
            new Manager("asya", "2", "ROLE_MANAGER"));

        SecurityContextHolder.getContext().setAuthentication(
            new UsernamePasswordAuthenticationToken("roman", "dosn't metter",
                AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

        this.employees.save(BuildEmployee(
                "Roman", "Perminov", "Good Programmer", roman));
        this.employees.save(BuildEmployee(
                "Frodo", "Baggins", "ring bearer", roman));
        this.employees.save(BuildEmployee(
                "Bilbo", "Baggins", "burglar", roman));
        this.employees.save(BuildEmployee(
                "Gandalf", "the Grey", "wizard", roman));

        SecurityContextHolder.getContext().setAuthentication(
            new UsernamePasswordAuthenticationToken("asya", "dosn't metter",
                AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

        this.employees.save(BuildEmployee(
                "Samwise", "Gamgee", "gardener", asya));
        this.employees.save(BuildEmployee(
                "Mary", "Brandybuck", "pony rider", asya));
        this.employees.save(BuildEmployee(
                "Peregrin", "Took", "pipe smoker", asya));

        SecurityContextHolder.clearContext();
    }

    /**
     * Билдер сотрудников. Ненужная вещь.
     * @param name Имя сотрудникаю
     * @param lastName Фамилия сотрудника.
     * @param description Описание сотрудника.
     * @param manager Менеджер.
     * @return Возвращает сотрудника.
     */
    private Employee BuildEmployee(
        String name,
        String lastName,
        String description,
        Manager manager
    )
    {
        Employee employee = new Employee();
        employee.setFirstName(name);
        employee.setLastName(lastName);
        employee.setDescription(description);
        employee.setManager(manager);
        return employee;
    }

}