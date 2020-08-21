package info.mamay.video.manager.videoManager.model.repositories;

import info.mamay.video.manager.videoManager.model.entities.Manager;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Репозиторий Менеджера с поддержкой REST.
 */
@RepositoryRestResource
public interface ManagerRepository extends Repository<Manager, Long> {
    /**
     * Сохраняет менеджера.
     * @param manager Сохраняемая сущность менеджера.
     * @return Сохраненный менеджер.
     */
    Manager save(Manager manager);

    /**
     * Находит менеджера по имени.
     * @param name Имя менеджера.
     * @return Найденый менеджер.
     */
    Manager findByName(String name);
}
