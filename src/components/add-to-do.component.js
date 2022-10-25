import React, { Component } from "react";
import ToDoDataService from "../services/to-do.service";
import { withRouter } from '../common/with-router';

class AddToDo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.saveToDo = this.saveToDo.bind(this);
    this.navidgateToList = this.navidgateToList.bind(this);
    this.newToDo = this.newToDo.bind(this);

    this.state = {
      id: null,
      title: "",
      completed: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  saveToDo() {
    var data = {
      title: this.state.title,
      completed: false
    };

    ToDoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          completed: response.data.completed,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newToDo() {
    this.setState({
      id: null,
      title: "",
      completed: false,

      submitted: false
    });
  }

  navidgateToList(){
    this.props.router.navigate('/todos');
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newToDo}>
                Add New Item
              </button>              
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>

  
              <button onClick={this.saveToDo} className="mt-1 btn btn-success">
                Submit
              </button>
            </div>
          )}
          <div className="mt-1">
            <button className="btn btn-info" onClick={this.navidgateToList}>
                Navidgate To List
            </button>
          </div>
        </div>
      );
  }
}

export default withRouter(AddToDo);