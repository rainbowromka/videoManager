import React from "react";
import ReactDOM from "react-dom";
import client from "./client";

class Employee extends React.Component{
  render() {
    return (
        <tr>
          <td>{this.props.employee.firstName}</td>
          <td>{this.props.employee.lastName}</td>
          <td>{this.props.employee.description}</td>
        </tr>
    )
  }
}

class EmployeeList extends React.Component {
  render()
  {
    const employees = this.props.employees
        ? this.props.employees.map(employee =>
            <Employee key={employee._links.self.href} employee={employee}/>
        )
    : null;
    return (
        <table>
          <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Description</th>
          </tr>
          {employees}
          </tbody>
        </table>
    )
  }
}

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {employees: []};
  }

  componentDidMount()
  {
    client({method: "GET", path: 'api/employees'}).done(response => {
      this.setState({employees: response.entity._embedded.employees})
    });
  }

  render()
  {
    return (
        <EmployeeList employees={this.employees}/>
    )
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)