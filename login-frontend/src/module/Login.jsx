import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
// import { withRouter} from 'react-router-dom';



 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.routeChange = this.routeChange.bind(this);
  }
  
  handleClick(event) {
    console.log(this.state.username,this.state.password);
    var obj = {
      email: this.state.username,
      password: this.state.password
    }
    var validate = this.validate(obj);
    console.log("validation",validate);
    if(validate = true) {
      var apiBaseUrl = "http://localhost:8000";
      var self = this;
      var payload={
      "email":this.state.email,
      "password":this.state.password
      }
      axios.post(apiBaseUrl+'/checkUser', payload)
      .then(function (response) {
      console.log(response);
      if(response.data.status.value == "success"){
      console.log("Login successfull");
      localStorage.setItem({"userDetails":response.data.status.data});
      var path = `/profile`
      this.props.history.push(path);
      }
      else {
      console.log("Incorrect username or password");
      alert("username password do not match")
      }
    });
  }
  }
  routeChange() {
    let path = `/register`;
    this.props.history.push(path);
  }
  validate(object) {
		var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		var pattern = /^[a-zA-Z0-9]+$/;
		if (regEmail.test(object.email) == false) {
			alert('Invalid Email Address');
			return (false);
		}
		else if (object.password.length < 8) {
			alert('password should be atleast 8 characters');
			return false;
		}else if (pattern.test(object.password) == false) {
			alert('password should be alphanumeric');
			return false;
		} else if (!object.email || !object.password ) {
			alert('please fill the fields')
			return false;
		} else {
			return true;
		}
	}
  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
							title="Login"
						/>
          <div>
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
             New user ? <RaisedButton label="Register" primary={true} style={style} onClick={this.routeChange}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
}
export default Login;