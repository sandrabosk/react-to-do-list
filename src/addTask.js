import React, { Component } from 'react';
import axios from 'axios';

class AddTask extends Component {

    constructor(props){
        super(props);
        this.state = {
            titleInput: '',
            descInput: ''
        };
    }

    addTask(){

        // console.log('hello there: ', this.state.titleInput);
        // console.log('wow there: ', this.state.descInput);

        axios.post('http://localhost:5000/api/tasks/create', 
        { 
            title: this.state.titleInput,
            description: this.state.descInput             
        })
        .then( res => console.log(res) )
        .catch( err => console.log(err) )
    
        // clears the state
        this.setState( {
            titleInput: '',
            descInput: ''
        });
    }

    updateTitle(e){
        this.setState({
            titleInput:e.target.value,
            descInput:this.state.descInput,
        });
        console.log(this.state)
    }
 
    updateDesc(e){
        this.setState({
            titleInput:this.state.titleInput,
            descInput:e.target.value,
        });
    }

    render(){
      return (
        <div className="add-task">
          <h3> Add new task </h3>
          <label>Title</label>
          <input value={this.state.titleInput}  onChange={ e => {this.updateTitle(e)} } text="text"/>
  
          <label>Description</label>
          <input value={this.state.descInput} onChange={ e => {this.updateDesc(e)} } text="text"/>
          
          <button onClick={ () => {this.addTask()}} >Add new task</button>
        </div>
      )
  
    }
  }

export default AddTask
