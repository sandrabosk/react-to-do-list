import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import AddTask from './addTask';
import EditTask from './editTask';
import User from './user';

class TodoList extends Component {

  constructor(props){
    super(props);
    // we introduce state to keep track 
    this.state = {
      theTasks: null,
      showing:false,
      loggedInUser: null
    };
  }

// this is like checkIfLoggedIn
  fetchUser(){
    if( this.state.loggedInUser === null ){  
        axios.get(`http://localhost:5000/api/loggedin`, {withCredentials: true})
        .then((response)=>{
            this.setState({
                theTasks: this.state.theTasks,
                showing: this.state.showing,
                loggedInUser:  response.data,
           }) 
        })
        .catch((err)=>{
            this.setState({
                theTasks: this.state.theTasks,
                showing: this.state.showing,
                loggedInUser:  false,
           }); 
        });
    }
}


seeIfTaskBelongsToUser(task, index){
//  console.log('heyyy:', task.owner, '  = == = == ',this.state.loggedInUser)
  if(this.state.loggedInUser && task.owner == this.state.loggedInUser._id ){
    return (
      <div>
        <button onClick={ () => { this.deleteTask(task._id) }} style={{ backgroundColor:'red', float:'right', padding:'10px', margin: '0 5px'}}>Delete</button>
        <button onClick={ () => { this.toggleEditForm(index) }} style={{ float:'right', backgroundColor: 'greenyellow', padding:'10px', margin: '0 5px'}}>Edit this task</button>
      </div>
    )
  }
}


  addOneTask(taskToAdd){
    // console.log(' = = =  = = = = = = = = =')
    // // slice makes duplicate of the array if no args are passed
    // // duplicate the array
    // const currentArray = this.state.theTasks.slice();
    // // add new task to the duplicated array
    // currentArray.push(taskToAdd);
    // // update current array by reassigning it to the duplicate one
    // this.setState({ theTasks: currentArray });
    // console.log('new state: ', this.state)
  }

  getAllTheTasks(){
    
    axios.get('http://localhost:5000/api/tasks')
    .then( allTheTasks => {
      // console.log(allTheTasks);
      this.setState({ theTasks:allTheTasks.data, showing: false });
    } )
    .catch( err => console.log(err) );
  }

  toggleEditForm(whichTask){
    // console.log("whichTask:", whichTask);
    if(this.state.showing === whichTask){
      this.setState({
        theTasks:this.state.theTasks,
        showing: false
      })
    } else {
      this.setState({
        theTasks:this.state.theTasks,
        showing: whichTask
      });
    }
    // console.log(this.showing)
  }

  renderForm(theIndex, theTaskID, theTitle, theDesc){
    if(this.state.showing === theIndex){
        return (
          <EditTask blah={ () => {this.getAllTheTasks()} } taskProp={ theTaskID }
          title={theTitle} desc={theDesc} ></EditTask>
        )
    }
  }

  deleteTask(theIdOfTheTask){
    axios.post(`http://localhost:5000/api/tasks/delete/${theIdOfTheTask}`, {}, {withCredentials: true})
    .then( response => {
      console.log(response);
      this.getAllTheTasks();
    } )
    .catch( err => console.log(err) );

  }

  showTasks(){
    // console.log('do i have tasks: ', typeof(this.state.theTasks))
    // this is a hack to get all the tasks on the page right away, not on click
    if(this.state.theTasks === null){
      this.getAllTheTasks();
    }

    if(this.state.theTasks){
      return (
        this.state.theTasks.map( (task, index) => {
            return(
              <div key={ index } >
                { this.seeIfTaskBelongsToUser(task,index) }
                <h3>{ task.title }</h3>
                <p style={{ maxWidth:'400px' }}  >{ task.description }</p>
                { this.renderForm(index, task._id, task.title, task.description) }
              </div>
            )
        })
      )
    } 
  }


  getUserFromUserComponent = (userObj) => {
    this.setState({loggedInUser: userObj})
  }


  render() {
    return (
      <div className="App">
      {this.fetchUser()}
      <h1>React.js - To Do App </h1>

        <div className="add">
        {/* <AddTask blah={ () => {this.addOneTask()} } ></AddTask> */}

          <AddTask blah={ () => {this.getAllTheTasks()} } ></AddTask>
          <User sendIt={this.getUserFromUserComponent}>  </User>
        </div>
        <div className="list">
          <h2>List of all the tasks</h2>
            {/* <button onClick={() => {this.getAllTheTasks()}}>Get the tasks</button> */}
            { this.showTasks() }
        </div>
        <div className="footer">
          <ul> 
            <h4>Copyright AF</h4>
            <li> This Page is Beautiful </li>
            <li> This Page is a strong, self-loving individual </li>
          </ul>
          <ul>
            <h4> All Rights Reserved </h4>
            <li> Property Of React Bindings Corp </li>
          </ul>
          <ul>
            <h4> External Resources </h4>
            <li> Check out the Docs </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoList;
