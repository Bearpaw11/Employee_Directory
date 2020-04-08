import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EmpTable from './components/table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import axios from 'axios'
const dataEmp=[
{
  firstname:"Chris",
  city:"Phoenix"
},
{
  firstname: "Isabel",
  city:"Oakland"
}
]
class App extends Component {
  state={
    title:"test",
    firstName:"",
    emp:[],
    filterEmp:[]
  }
  componentDidMount(){
    this.loadEmp()
  }

  loadEmp = ()=>{
    console.log(dataEmp)

    // call the api and get info
    
    this.setState({emp:dataEmp, filterEmp:dataEmp})

  }

  handleInputChange = event => {
    console.log(event.target, event.target.name, event.target.value)
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    console.log("value: ", value)
    const newEmp = this.state.emp.filter(e => e.firstname.includes(value))
    console.log("new:", newEmp)
    // Updating the input's state
    this.setState({
      [name]: value,
      filterEmp: newEmp
    });

  
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
// filter the results
    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
   // alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
    this.setState({
      firstName: "",
      lastName: ""
    });
  };

  // call form insede the render 
  // get the info from the input ( handleonchange  / handelonsubmit)
  // filter

  // sort  this means you need to create an oncick in one of the header columns and
  // handle sort 
    render() {
        return ( 
            <div>
      <form className="form">
          <input
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Enter Name to search"
          />

       
        </form>

          <Table striped bordered hover variant="dark">
  <thead>
    <tr>
  
      <th>First Name</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
{this.state.filterEmp.map(e=>(
  <EmpTable
  name={e.firstname}
  city={e.city}
  />

))}

  </tbody>
</Table>
            </div>
        )
    }
}

export default App;



/// you want to map the array of emp and build the table dinamicly 

// map