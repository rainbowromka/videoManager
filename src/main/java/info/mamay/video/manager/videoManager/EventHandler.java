package info.mamay.video.manager.videoManager;

import info.mamay.video.manager.videoManager.model.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import static info.mamay.video.manager.videoManager.WebSocketConfiguration.MESSAGE_PREFIX;

/**
 * Обработчик событий обращения к резпозиторию сотрудника. Для передачи
 * данных клиенту по ВебСокету.
 */
@Component
@RepositoryEventHandler
public class EventHandler {
    /**
     * Вебсокет, по которому будем передавать клиенту информацию об изменениях.
     */
    private final SimpMessagingTemplate websocket;

    /**
     * Ссылка на сущность сотрудника.
     */
    private final EntityLinks entityLinks;

    /**
     * Инициализация класса обработчика событий обращения к
     * репозиторию сотрудника.
     *
     * @param websocket вебсокет с клиентом.
     * @param entityLinks ссылка на сущность сотрудника.
     */
    @Autowired
    public EventHandler(
        SimpMessagingTemplate websocket,
        EntityLinks entityLinks)
    {
        this.websocket = websocket;
        this.entityLinks = entityLinks;
    }

    /**
     * Вызывается в случае, если был создан новый сотрудник.
     *
     * @param employee новый сотрудник.
     */
    @HandleAfterCreate
    public void newEmployee(
        Employee employee)
    {
        this.websocket.convertAndSend(
            MESSAGE_PREFIX + "/newEmployee", getPath(employee));
    }

    /**
     * Вызывается в случае, если был удален сотрудник.
     *
     * @param employee Удаленный сотрудник.
     */
    @HandleAfterDelete
    public void deleteEmployee(
        Employee employee)
    {
        this.websocket.convertAndSend(
            MESSAGE_PREFIX + "/deleteEmployee", getPath(employee));
    }

    /**
     * Вызывается если сотрудник был обновлен в базе данных.
     *
     * @param employee обновленный сотрудник в базе данных.
     */
    @HandleAfterSave
    public void updateEmployee(
        Employee employee)
    {
        this.websocket.convertAndSend(
            MESSAGE_PREFIX + "/updateEmployee", getPath(employee));
    }

    /**
     * Получаем ссылку на сотрудника для REST ресурса.
     *
     * @param employee сотрудник.
     * @return ссылка на сотрудника для REST ресурса.
     */
    private String getPath(
        Employee employee)
    {
        return this.entityLinks.linkForItemResource(employee.getClass(),
            employee.getId()).toUri().getPath();
    }
}
