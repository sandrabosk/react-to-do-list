import React, { Component } from 'react';
import axios from 'axios';

class EditTask extends Component {
constructor(props){
    super(props);
    // we introduce state to keep track 
    this.state = {
        titleInput: this.props.title, 
        descInput: this.props.desc
    };
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

    submitChanges(){
    //   console.log(this.props.taskProp, this.state.titleInput, this.state.descInput)
    axios.post(`http://localhost:5000/api/tasks/edit/${this.props.taskProp}`,
        { title: this.state.titleInput, description: this.state.descInput }, {withCredentials: true})
    .then( res => {
        console.log(res);
        this.setState({
            title: '',
            description: ''
        });
        this.props.blah();
    } )
    .catch( err => {
        console.log(err);
    } )
    }

    render(){
        return(

        <div className="edit-task">
            <h3> Edit task </h3>
            <label>Title</label>
            <input  value={this.state.titleInput}  onChange={ e => {this.updateTitle(e)} } text="text"/>

            <label>Description</label>
            <input  value={this.state.descInput} onChange={ e => {this.updateDesc(e)} }  text="text"/>
        
            <button onClick={ () => {this.submitChanges()}} >Save changes</button>
        </div>
        )
    }
}

export default EditTask