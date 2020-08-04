package info.mamay.video.manager.videoManager.model.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import javax.persistence.*;

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

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
        generator = "jpaEmployeeSequence")
    private Long id;

    private String firstName;
    private String lastName;
    private String description;
}
