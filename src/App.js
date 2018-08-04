import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import AddTask from './addTask';
import EditTask from './editTask';

class App extends Component {

  constructor(props){
    super(props);
    // we introduce state to keep track 
    this.state = {
      theTasks: [],
      showing:false
    };
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

  showTasks(){
    // this is a hack to get all the tasks on the page right away, not on click
    if(this.state.theTasks.length === 0){
      this.getAllTheTasks();
    }
    return (
      this.state.theTasks.map( (task, index) => {
          return(
            <div key={ index } >
              <button   onClick={ () => { this.toggleEditForm(index) }} style={{float:'right', backgroundColor: 'greenyellow'}}>Edit this task</button>
              <h3>{ task.title }</h3>
              <p style={{ maxWidth:'400px' }}  >{ task.description }</p>
              { this.renderForm(index, task._id, task.title, task.description) }
            </div>
          )
      })
    )
  }

  render() {
    return (
      <div className="App">
      <h1>React.js - To Do App </h1>

        <div className="add">
        {/* <AddTask blah={ () => {this.addOneTask()} } ></AddTask> */}

          <AddTask blah={ () => {this.getAllTheTasks()} } ></AddTask>
        </div>
        <div className="list">
          <h2>List of all the tasks</h2>
            {/* <button onClick={() => {this.getAllTheTasks()}}>Get the tasks</button> */}
            { this.showTasks() }
        </div>
      </div>
    );
  }
}

export default App;
