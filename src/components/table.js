import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'

const EmpTable = (props) => {
    return(



    <tr>
      <td>{props.name}</td>
      <td>{props.city}</td>
      <td>{props.state}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
    </tr>
  


    )

}

export default EmpTable;