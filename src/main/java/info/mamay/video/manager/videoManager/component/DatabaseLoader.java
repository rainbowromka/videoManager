package info.mamay.video.manager.videoManager.component;

import info.mamay.video.manager.videoManager.model.entities.Employee;
import info.mamay.video.manager.videoManager.model.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository repository;

    @Autowired
    public DatabaseLoader(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Employee employee = new Employee();
        employee.setFirstName("Roman");
        employee.setLastName("Perminov");
        employee.setDescription("Good Programmer");
        this.repository.save(employee);
    }
}