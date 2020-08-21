package info.mamay.video.manager.videoManager.model.repositories;

import info.mamay.video.manager.videoManager.model.entities.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * Репозиторий сотрудников.
 */
@PreAuthorize("hasRole('ROLE_MANAGER')")
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long>
{
    /**
     * Сохраняет сотрудника в случае, если назначен менеджер и менеджер
     * авторизирован.
     *
     * @param s сотрудник.
     * @return сохраненнй сотрудник.
     */
    @Override
    @PreAuthorize("#employee?.manager == null " +
            "or #employee?.manager?.name == authentication?.name")
    Employee save(
        @Param("employee")
        Employee s);

    /**
     * Удаляет сотрудника по ID в случае, если найденый сотрудник имеет
     * менеджера и менеджер авторизирован.
     *
     * @param id id сотрудника.
     */
    @Override
    @PreAuthorize("@employeeRepository.findById(#id)?.manager?.name" +
            "== authentication?.name")
    void deleteById(
        @Param("id")
        Long id);

    /**
     * Удаляет сотрудника в случае, если сотрудник имеет менеджера и менеджер
     * авторизирован.
     *
     * @param employee сущность сотрудника, которую нужно удалить.
     */
    @Override
    @PreAuthorize("#employee?.manager?.name == authentication?.name")
    void delete(
        @Param("employee")
        Employee employee);
}
