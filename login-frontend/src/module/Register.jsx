import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// import { withRouter} from 'react-router-dom';

import axios from 'axios';
class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			confirm_password: ''
		}
	}
	handleClick(event) {
		console.log(this.state);
		var obj = {
			email: this.state.email,
			password: this.state.password,
			name: this.state.name,
			confirm: this.state.confirm_password
		}
		var validate = this.validate(obj);
		console.log("Validate",this.validate);
		if(validate == true) {
			var apiBaseUrl = "http://localhost:8000";
      var self = this;
      var payload={
      "email":this.state.email,
	  "password":this.state.password,
	  "name":this.state.name
      }
      axios.post(apiBaseUrl+'/addUser', payload)
      .then(function (response) {
      console.log(response);
      if(response.data.status.value == "success"){
      console.log("Registration completed successfull");
      var path = `/login`
      this.props.history.push(path);
      }
      else {
      console.log("Some error occurred");
      alert("Oops !!!some error occurred");
      }
    });
		}
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
		} else if (object.password != object.confirm) {
			alert('two passwords must be same');
			return false;
		} else if (pattern.test(object.password) == false) {
			alert('password should be alphanumeric');
			return false;
		} else if (!object.email || !object.password || !object.confirm || !object.name) {
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
					<div>
						<AppBar
							title="Register"
						/>
						<TextField
							hintText="Enter your Name"
							floatingLabelText="Name"
							onChange={(event, newValue) => this.setState({ name: newValue })}
						/>
						<br />
						<TextField
							hintText="Enter your Email"
							type="email"
							floatingLabelText="Email"
							onChange={(event, newValue) => this.setState({ email: newValue })}
						/>
						<br />
						<TextField
							type="password"
							hintText="Enter your Password"
							floatingLabelText="Password"
							onChange={(event, newValue) => this.setState({ password: newValue })}
						/>
						<br />
						<TextField
							type="password"
							hintText="Re-enter your Password"
							floatingLabelText="Password"
							onChange={(event, newValue) => this.setState({ confirm_password: newValue })}
						/>
						<br />
						<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}
const style = {
	margin: 15,
};
export default Register;