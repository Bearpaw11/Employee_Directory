import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EmpTable from './components/table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table'
import API from './utils/api'


class App extends Component {
  state={
    firstName:"",
    emp:[],
    filterEmp:[],
    name:"D",
    city:"A"

  }
  componentDidMount(){
    this.loadEmp()
  }

  loadEmp = ()=>{
   
  // call the api and get info
  API.getemp().then(apidb => {
    console.log(apidb.data.results)
    let e = apidb.data.results
    let empSorted = e.sort((a, b) => (a.name.first.toLowerCase() + " " + a.name.last.toLowerCase() > b.name.first.toLowerCase() + " " + b.name.last.toLowerCase()) ? 1 : -1)
   
   this.setState({emp:empSorted, filterEmp:empSorted}) 


  })

  }

  handleInputChange = event => {
    console.log(event.target, event.target.name, event.target.value)
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    console.log("value: ", value)
    const newEmp = this.state.emp.filter(e => {
      let name = e.name.first.toLowerCase() + " " + e.name.last.toLowerCase()
      if(name.includes(value.toLowerCase())){
        return e
      }
    }
    )
    console.log("new:", newEmp)
    // Updating the input's state
    this.setState({
      [name]: value,
      filterEmp: newEmp
    });

  
  };

  handleSort = event => {
    console.log("first: ", this.state)
    
    console.log("click:", event.target.getAttribute("name"))
    let sortHead = event.target.getAttribute("name")
    let e = this.state.filterEmp
    let order = this.state[sortHead]
    let empSorted=[]
console.log(order,sortHead)

//swith sorthead{}

    if(sortHead === "name"){
    if(order==="A"){
      console.log("click-A:",this.state)
    empSorted = e.sort((a, b) => (a.name.first.toLowerCase() + " " + a.name.last.toLowerCase() > b.name.first.toLowerCase() + " " + b.name.last.toLowerCase()) ? 1 : -1)
    this.setState({filterEmp:empSorted, [sortHead]:"D"}) 
  }
  else{
    console.log("click-B:", this.state)
    empSorted = e.sort((a, b) => (a.name.first.toLowerCase() + " " + a.name.last.toLowerCase() < b.name.first.toLowerCase() + " " + b.name.last.toLowerCase()) ? 1 : -1)
   this.setState({filterEmp:empSorted, [sortHead]:"A"}) 
  }  

}else if(sortHead === "city"){
  console.log("inside city:", order,sortHead)
    if(order==="A"){
      console.log("click-C:",this.state)
    empSorted = e.sort((a, b) => (a.location.city.toLowerCase()  > b.location.city.toLowerCase() ) ? 1 : -1)
  this.setState({filterEmp:empSorted, [sortHead]:"D"}) 
  }
  else{
    console.log("click-D:", this.state)
    empSorted = e.sort((a, b) => (a.location.city.toLowerCase()  < b.location.city.toLowerCase()) ? 1 : -1)
  this.setState({filterEmp:empSorted, [sortHead]:"A"}) 
  }  


}



  }



    render() {
        return ( 
            <div>

  <div className= "header">
    <h1>👉Employee Directory👈</h1>
  </div>
  
      <form>
          <input className="form"
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Enter Name to search"
          />
       
        </form>
        <br></br>
          <Table striped bordered hover variant="dark">
  <thead>
    <tr>
  
      <th name="name" onClick={this.handleSort}>Name <span>{this.state["name"] === "A" ? "↑" : "↓"}</span></th>
      <th name="city" onClick={this.handleSort}>City <span>{this.state["city"] === "A" ? "↑" : "↓"}</span></th>
      <th>Location</th>
      <th>Email 📨</th>
      <th>Phone ☎️</th>
    </tr>
  </thead>
  <tbody>
{this.state.filterEmp.map(e=>(
  <EmpTable
  key={e.id.value}
  name={e.name.first + " " + e.name.last}
  city={e.location.city}
  state={e.location.state}
  email={e.email}
  phone={e.phone}
  />

))}

  </tbody>
</Table>
            </div>
        )
    }
}

export default App;



