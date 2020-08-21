import React from "react";
import UpdateDialog from "../dialogs/UpdateDialog";

/**
 * Компонент элемент сотрудник - списка сотрудников.
 */
export default class Employee extends React.Component {
    /**
     * Создание элемента сотрудник - списка сотрудников.
     *
     * @param props пропсы.
     */
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /**
     * Удаление элемента сотрудник из списка сотрудников, передается компоненту
     * выше, для отправки изменений на сервер.
     */
    handleDelete() {
        this.props.onDelete(this.props.employee);
    }

    /**
     * Отрисовка компонента элемет сотрудник - списка сотрудников.
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <tr>
                <td>{this.props.employee.entity.firstName}</td>
                <td>{this.props.employee.entity.lastName}</td>
                <td>{this.props.employee.entity.description}</td>
                <td>{this.props.employee.entity.manager.name}</td>
                <td>
                    <UpdateDialog employee={this.props.employee}
                                  attributes={this.props.attributes}
                                  onUpdate={this.props.onUpdate}
                                  loggedInManager={this.props.loggedInManager}/>
                </td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}
