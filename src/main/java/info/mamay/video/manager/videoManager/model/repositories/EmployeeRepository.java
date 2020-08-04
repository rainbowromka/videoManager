package info.mamay.video.manager.videoManager.model.repositories;

import info.mamay.video.manager.videoManager.model.entities.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long>
{
}
