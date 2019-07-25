import React, { Component } from 'react';
import axios from'axios';
import { CLIENT_RENEG_LIMIT } from 'tls';

class Employee extends Component{
    constructor(){
        super();
        this.state={
            employees:[]
        }
    }

   
// this is where the lifecycle methods goes
async componentDidMount(){
    try {
        const res = await axios.get('/employees');
        this.setState({
            employees: res.data,
        });
    }catch(error) {
        console.log(error);
    }
    handleChange (event)=>{
        this.setState(
            [event.target.name]
        )
        
}
 deleteEmployee = async(id) => {
     try{
         await axios.delete(`/employees/${id}`);
         console.log(`Id:${id} was deleted`);
         const res = await axios.get(`/employees`);
         this.setState({
             employees :res.data,
         });
    }catch(error){
      console.log(error);
     }
    };

render() {
    if(this.state.employees.length) {
    return (
        <div>
            <ul>
                {this.state.employees.map(el => {
                    return (<li key ={el.EmpID}> Name:{el.name} 
                    <button type="button" onClick={()=> this.deleteEmployee(el.EmpID)}>DELETE</button>{el.EmpID}</li> 
                })}
            </ul>
            <form>
                <input name="Name" placeholder="Please Enter NAME Here" onChange={this.handleChange} />
                <input name="EmpCode" placeholder="Place the employee code here" onChange={this.handleChange} />
                <input name="Salary" placeholder="please enter the Employee salary" onChange={this.handleChange}/>
            </form>
        </div>
        
    )
}else {
    return (
        <div>There aren't any employees to list </div>
    )
}
}
}



export default Employee;