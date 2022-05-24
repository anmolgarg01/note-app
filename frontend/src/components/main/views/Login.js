import React from 'react'
import axios from 'axios';
import {UserContext} from '../../../UserProvider';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = UserContext;

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
        url: `${process.env.REACT_APP_API_BACKEND}/user/login`,
        data: {
          username: this.state.email,
          password: this.state.password,
        }
      })
      .then(function (response) {
            localStorage.setItem("token", response.data.access_token);
            window.location.replace("/dashboard");
          },
          (error)=>{
            this.setState({"error": error.response.data.detail})
          })

    event.preventDefault();
  }

  componentDidUpdate() {
    if(this.context[0].email!=null) {
      window.location.replace("/dashboard");
    }
  }

  render () {
    return (
      <div>
        <h3>Login</h3>
          <form onSubmit={this.handleSubmit}>
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
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <small id="emailHelp" className="form-text text-muted">{this.state.error}</small>
      </div>
    )
  }
}

export default Login;
