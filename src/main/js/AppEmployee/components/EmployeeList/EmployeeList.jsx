import React from "react";
import ReactDOM from "react-dom";
import Employee from "./Employee";

/**
 * Список сотрудников.
 */
export default class EmployeeList extends React.Component {
    /**
     * Создание списка сотрудников. Регистрация событий.
     *
     * @param props пропсы.
     */
    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /**
     * Обработчик события ввода размера страницы выводимого списка сотрудников.
     *
     * @param e Объект события.
     */
    handleInput(e) {
        e.preventDefault();
        const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
        }
    }

    /**
     * Обработчик события перехода на первую страницу списка сотрудников.
     *
     * @param e Объект события.
     */
    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    /**
     * Обработчик события перехода на предыдущую страницу списка сотрудников.
     *
     * @param e Объект события.
     */
    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    /**
     * Обработчик события перехода на следующую страницу списка сотрудников.
     *
     * @param e Объект события.
     */
    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    /**
     * Обработчик события перехода на последнюю страницу списка сотрудников.
     *
     * @param e Объект события.
     */
    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }

    /**
     * Отрисовка компонента списка сотрудников.
     *
     * @returns {JSX.Element}
     */
    render() {
        const pageInfo = this.props.page.hasOwnProperty("number") ?
            <h3>Employees - Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;

        const employees = this.props.employees.map(employee =>
            <Employee key={employee.entity._links.self.href}
                      employee={employee}
                      attributes={this.props.attributes}
                      onUpdate={this.props.onUpdate}
                      onDelete={this.props.onDelete}
                      loggedInManager={this.props.loggedInManager}/>
        );

        const navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        }
        if ("prev" in this.props.links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        }

        return (
            <div>
                {pageInfo}
                <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <table>
                    <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Description</th>
                        <th>Manager</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {employees}
                    </tbody>
                </table>
                <div>
                    {navLinks}
                </div>
            </div>
        )
    }
}

