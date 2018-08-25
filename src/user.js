import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            usernameInput: '',
            passwordInput: '' ,
            loggedInUser: null 
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps["theActualUser"])
      this.setState({...this.state, loggedInUser: nextProps["theActualUser"]})
    
      console.log(this.state)
    }



    updateUsername(e){
        this.setState({
            usernameInput: e.target.value,
            passwordInput: this.state.passwordInput
        });
        console.log('username: ', this.state);
    }

    updatePassword(e){
        this.setState({
            usernameInput: this.state.usernameInput,
            passwordInput: e.target.value
        });
        console.log('password: ', this.state);
    }


    login(){
        const username = this.state.usernameInput;
        const password = this.state.passwordInput;
        axios.post(`http://localhost:5000/api/login`, { username, password }, { withCredentials:true })
        .then( response => {
            this.setState({
                usernameInput: '',
                passwordInput: '',
                loggedInUser: response.data
            });
            this.props.sendIt(response.data);
        } )
        .catch( err => {
            console.log(err);
        } )
    }

    // showUser(){
    //     this.fetchUser();
    //     // return this.state.loggedInUser? `Welcome, ${this.state.loggedInUser.username}` : 'User component';
    //     if(this.state.loggedInUser){
    //         return (
    //             <div>
    //                 <h3>Welcome, {this.state.loggedInUser.username}.</h3>
    //                 <button onClick={() => {this.logout()}}>Logout</button>
    //             </div>
    //     );
    //     } else {
    //         return (
    //             <div>
    //             User component
    //             </div>);
    //     }
    // }

    signup(){
        const username = this.state.usernameInput;
        const password = this.state.passwordInput;
        axios.post(`http://localhost:5000/api/signup`, { username, password }, { withCredentials:true })
        .then( response => {
            this.setState({
                usernameInput: '',
                passwordInput: '',
                loggedInUser: response.data
            });
            this.props.sendIt(response.data);
        } )
        .catch( err => {
            console.log(err);
        } )
    }


    // logout(){
    //     const username = this.state.usernameInput;
    //     const password = this.state.passwordInput;
    //     axios.post(`http://localhost:5000/api/logout`, {}, { withCredentials:true })
    //     .then( response => {
    //         this.setState({
    //             usernameInput: '',
    //             passwordInput: '',
    //             loggedInUser: null // this is important because of the fetchUser, 
    //             //to set the user back to null because fetch if it fails set it to false
    //         });
    //         this.props.sendIt(null);
    //     } )
    //     .catch( err => {
    //         console.log(err);
    //     } )
    // }


    fetchUser(){
        if( this.state.loggedInUser === null ){  
            axios.get(`http://localhost:5000/api/loggedin`, {withCredentials: true})
            .then((response)=>{
                this.setState({
                    usernameInput: this.state.usernameInput,
                    passwordInput: this.state.passwordInput,
                    loggedInUser:  response.data,
               }) 
               this.props.sendIt(response.data);
            })
            .catch((err)=>{
                this.setState({
                    usernameInput: this.state.usernameInput,
                    passwordInput: this.state.passwordInput,
                    loggedInUser:  false,
               }) 
            })
        }
    }
    showForm(){
        if(!this.state.loggedInUser){
            return(
                <div>
                    <label>Username</label>
                    {/* value={this.state.usernameInput}  add this so you can keep track of it, and when only this added ypu can't type. you have to add onchange */}
                    <input value={this.state.usernameInput} onChange={ e => {this.updateUsername(e)} } type="text" />
                    <label>Password</label>
                    <input value={this.state.passwordInput} onChange={ e => {this.updatePassword(e)} } type="password" />
                    
                    <button onClick={() => {this.login()}} >Login</button>
                    <button onClick={() => {this.signup()}} >Signup</button>
                </div>
            )
        }
    }

    render(){
        return ( 
            <div>
                {/* { this.showUser() } */}
                { this.showForm() }
            </div>
        )
    }

}

export default User;
