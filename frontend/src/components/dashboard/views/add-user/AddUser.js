import React from 'react'
import axios from 'axios';

import {UserContext} from '../../../../UserProvider';

class AddUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      message: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = UserContext;

  componentDidUpdate() {
    const currentURL = window.location.href
    if(currentURL.includes("/dashboard")) {
      const isSuperAdmin = this.context[0].is_super_admin;
      if(!isSuperAdmin){
        window.location.replace("/dashboard");
      }
    }

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    axios({
        method: "post",
        url: `${process.env.REACT_APP_API_BACKEND}/user`,
        data:  {
          email: this.state.email,
          password: this.state.password,
          fullname: this.state.fullname,
        },
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response)=>{
            this.setState({'message': "User added successfully"})
            setTimeout(()=>{
              this.setState({'message': ""});
            }, 2000);
          },
          (error)=>{
            this.setState({"message":JSON.stringify(error.response.data? error.response.data.detail : error.message)});
          })
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <h3>Add User</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Full name</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                value={this.state.fullname}
                onChange={this.handleInputChange}
                placeholder="Enter Full Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <small id="emailHelp" className="form-text text-muted">{this.state.message}</small>
      </div>
    )
  }
}

export default AddUser;
