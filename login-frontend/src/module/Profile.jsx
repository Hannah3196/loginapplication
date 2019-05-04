import React, { Component } from 'react';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: ''
		}
	}
	componentWillMount() {
		var userData = localStorage.getItem("userDetails");
		this.state.name = userData.name;
		this.state.email = userData.email;
	}
	render() {
		return(
			<div>
				<h1>My profile</h1>
				<h2>My username is {this.state.name}</h2>
				<h2>My email is {this.state.email}</h2>
			</div>
		);
	}
}
export default Profile;