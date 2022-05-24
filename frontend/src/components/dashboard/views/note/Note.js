import React from 'react'
import axios from 'axios';

class Note extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      note: '',
      message: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    axios({
        method: "get",
        url: `${process.env.REACT_APP_API_BACKEND}/note`,
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response)=>{
          this.setState({
            note: response.data
          })
        },
        (error)=>{
          this.setState({"message":JSON.stringify(error.response.data)})
        })
  }

  handleSubmit(event) {
    axios({
        method: "post",
        url: `${process.env.REACT_APP_API_BACKEND}/note`,
        data:  {
          note: this.state.note
        },
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response)=>{
            this.setState({'message': "Note updated successfully"});
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
        <h3>Note</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="note">Note</label>
              <textarea
                className="form-control"
                id="note"
                name="note"
                value={this.state.note}
                onChange={this.handleInputChange}
                rows="10"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <small id="emailHelp" className="form-text text-muted">{this.state.message}</small>
      </div>
    )
  }
}

export default Note;
