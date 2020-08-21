import React from 'react';
import follow from "../follow";
import client from "../client";
import when from "when";
import stompClient from "../websocket-listener";
import CreateDialog from "./components/dialogs/CreateDialog";
import EmployeeList from "./components/EmployeeList/EmployeeList";

const root = "./api";

/**
 * Основной компонент приложения.
 */
export default class App extends React.Component {

    /**
     * Конструктор компонента.
     *
     * @param props Пропсы.
     */
    constructor(props) {
        super(props);
        this.state = {employees: [], attributes: [], page: 1, pageSize: 2, links: {}
            , loggedInManager: this.props.loggedInManager};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
        this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
    }

    /**
     * Загружаем данные о работниках с сервера.
     *
     * @param pageSize размер устанавливаемой страницы.
     */
    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'employees', params: {size: pageSize}}]
        ).then(employeeCollection => {
            return client({
                method: 'GET',
                path: employeeCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                // tag::json-schema-filter[]
                /**
                 * Filter unneeded JSON Schema properties, like uri references and
                 * subtypes ($ref).
                 */
                Object.keys(schema.entity.properties).forEach(function (property) {
                    if (schema.entity.properties[property].hasOwnProperty('format') &&
                        schema.entity.properties[property].format === 'uri') {
                        delete schema.entity.properties[property];
                    }
                    else if (schema.entity.properties[property].hasOwnProperty('$ref')) {
                        delete schema.entity.properties[property];
                    }
                });

                this.schema = schema.entity;
                this.links = employeeCollection.entity._links;
                return employeeCollection;
                // end::json-schema-filter[]
            });
        }).then(employeeCollection => {
            this.page = employeeCollection.entity.page;
            return employeeCollection.entity._embedded.employees.map(employee =>
                client({
                    method: 'GET',
                    path: employee._links.self.href
                })
            );
        }).then(employeePromises => {
            return when.all(employeePromises);
        }).done(employees => {
            this.setState({
                page: this.page,
                employees: employees,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links
            });
        });
    }

    /**
     * Отправляем запрос на сервер на создание нового сотрудника.
     *
     * @param newEmployee Новый сотрудник.
     */
    onCreate(newEmployee) {
        follow(client, root, ['employees']).done(response => {
            client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newEmployee,
                headers: {'Content-Type': 'application/json'}
            })
        })
    }

    /**
     * Отправляем запрос на сервер на изменение сотрудника.
     *
     * @param employee Изменяемый сотрудник.
     * @param updatedEmployee Измененный сотрудник (возвращаемое значение).
     */
    onUpdate(employee, updatedEmployee) {
        if(employee.entity.manager.name === this.state.loggedInManager) {
            updatedEmployee["manager"] = employee.entity.manager;
            client({
                method: 'PUT',
                path: employee.entity._links.self.href,
                entity: updatedEmployee,
                headers: {
                    'Content-Type': 'application/json',
                    'If-Match': employee.headers.Etag
                }
            }).done(response => {
                /* Let the websocket handler update the state */
            }, response => {
                if (response.status.code === 403) {
                    alert('ACCESS DENIED: You are not authorized to update ' +
                        employee.entity._links.self.href);
                }
                if (response.status.code === 412) {
                    alert('DENIED: Unable to update ' + employee.entity._links.self.href +
                        '. Your copy is stale.');
                }
            });
        } else {
            alert("You are not authorized to update");
        }
    }

    /**
     * Отправляем запрос на сервер на удаление сотрудника.
     *
     * @param employee Удаляемый сотрудник.
     */
    onDelete(employee) {
        client({method: 'DELETE', path: employee.entity._links.self.href}
        ).done(response => {/* let the websocket handle updating the UI */},
            response => {
                if (response.status.code === 403) {
                    alert('ACCESS DENIED: You are not authorized to delete ' +
                        employee.entity._links.self.href);
                }
            });
    }

    /**
     * Событие, генерируемое в случае, если необходимо выполнить навигацию в
     * списке сотрудников.
     *
     * @param navUri Ссылка на сотрудника.
     */
    onNavigate(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(employeeCollection => {
            this.links = employeeCollection.entity._links;
            this.page = employeeCollection.entity.page;

            return employeeCollection.entity._embedded.employees.map(employee =>
                client({
                    method: 'GET',
                    path: employee._links.self.href
                })
            );
        }).then(employeePromises => {
            return when.all(employeePromises);
        }).done(employees => {
            this.setState({
                page: this.page,
                employees: employees,
                attributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    /**
     * Загружаем данные с сервера, в случае если изменили размер страницы.
     *
     * @param pageSize Новый размер страницы.
     */
    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }

    /**
     * Событие. Обновить данные на сервере и перейти на последнюю страницу.
     *
     * @param message сообщение События.
     */
    refreshAndGoToLastPage(message) {
        follow(client, root, [{
            rel: 'employees',
            params: {size: this.state.pageSize}
        }]).done(response => {
            if (response.entity._links.last !== undefined) {
                this.onNavigate(response.entity._links.last.href);
            } else {
                this.onNavigate(response.entity._links.self.href);
            }
        })
    }

    /**
     * Событие. Обновить текущую страницу.
     *
     * @param message Сообщение события.
     */
    refreshCurrentPage(message) {
        follow(client, root, [{
            rel: 'employees',
            params: {
                size: this.state.pageSize,
                page: this.state.page.number
            }
        }]).then(employeeCollection => {
            this.links = employeeCollection.entity._links;
            this.page = employeeCollection.entity.page;

            return employeeCollection.entity._embedded.employees.map(employee =>{
                return client({
                    method: 'GET',
                    path: employee._links.self.href
                })
            });
        }).then(employeePromises =>{
            return when.all(employeePromises);
        }).then(employees => {
            this.setState({
                page: this.page,
                employees: employees,
                attributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    /**
     * Событие, генерируемое во время создания компонента. Загружаем данные из
     * сервера. Регистрируем точки входа для websoket'а.
     */
    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
        stompClient.register([
            {route: '/topic/newEmployee', callback: this.refreshAndGoToLastPage},
            {route: '/topic/updateEmployee', callback: this.refreshCurrentPage},
            {route: '/topic/deleteEmployee', callback: this.refreshCurrentPage}
        ]);
    }

    /**
     * Отрисовка основной страницы.
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                <EmployeeList page={this.state.page}
                              employees={this.state.employees}
                              links={this.state.links}
                              pageSize={this.state.pageSize}
                              attributes={this.state.attributes}
                              onNavigate={this.onNavigate}
                              onUpdate={this.onUpdate}
                              onDelete={this.onDelete}
                              updatePageSize={this.updatePageSize}
                              loggedInManager={this.state.loggedInManager}/>
            </div>
        )
    }
}

