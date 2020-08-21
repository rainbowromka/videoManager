package info.mamay.video.manager.videoManager.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import javax.persistence.*;

/**
 * Сущность Сотрудник.
 */
@Entity
@Table(name = "employee", schema = "video_manager")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(
    name = "jpaEmployeeSequence",
    allocationSize = 1,
    schema = "video_manager",
    sequenceName = "employee_sequence")
public class Employee
{

    /**
     * Id сотрудника.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
        generator = "jpaEmployeeSequence")
    private Long id;

    /**
     * Имя сотрудника.
     */
    private String firstName;

    /**
     * Фамилия сотрудника.
     */
    private String lastName;

    /**
     * Описание сотрудника.
     */
    private String description;

    /**
     * Версия в базе данных, нужна hibernate для отслеживания параллельных
     * изменений в базе данных.
     */
    @Version
    @JsonIgnore
    private Long version;

    /**
     * Менеджер сотрудника.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    private Manager manager;
}
