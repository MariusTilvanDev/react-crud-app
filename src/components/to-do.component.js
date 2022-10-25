import React, { Component } from "react";
import ToDoDataService from "../services/to-do.service";
import { withRouter } from '../common/with-router';

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.getToDo = this.getToDo.bind(this);
    this.updateCompleted = this.updateCompleted.bind(this);
    this.navidgateToList = this.navidgateToList.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);

    this.state = {
      currentToDo: {
        id: null,
        title: "",
        completed: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getToDo(this.props.router.params.id);
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentToDo: {
          ...prevState.currentToDo,
          id: id
        }
      };
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentToDo: {
          ...prevState.currentToDo,
          title: title
        }
      };
    });
  }

  getToDo(id) {
    ToDoDataService.get(id)
      .then(response => {
        this.setState({
          currentToDo: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCompleted(completed) {
    var data = {
      id: this.state.currentToDo.id,
      title: this.state.currentToDo.title,
      completed: completed
    };

    ToDoDataService.update(this.state.currentToDo.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentToDo: {
            ...prevState.currentToDo,
            completed: completed
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateToDo() {
    ToDoDataService.update(
      this.state.currentToDo.id,
      this.state.currentToDo
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The toDo was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteToDo() {    
    ToDoDataService.delete(this.state.currentToDo.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/todos');
      })
      .catch(e => {
        console.log(e);
      });
  }

  navidgateToList(){
    this.props.router.navigate('/todos');
  }

  render() {
    const { currentToDo } = this.state;

    return (
      <div>
        {currentToDo ? (
          <div className="edit-form">
            <h4>ToDo</h4>
            <form>
              <div className="form-group">
                <label htmlFor="id">Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  disabled
                  value={currentToDo.id}
                  onChange={this.onChangeId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentToDo.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="mt-3 form-group">
                <label>
                  <strong>Status: </strong>
                </label>
                {currentToDo.completed ? " Completed" : " Pending"}
              </div>
            </form>

            {currentToDo.completed ? (
              <button
                className="m-3 btn btn-sm btn-primary"
                onClick={() => this.updateCompleted(false)}
              >
                Pending
              </button>
            ) : (
              <button
                className="m-3 btn btn-sm btn-primary"
                onClick={() => this.updateCompleted(true)}
              >
                Complet
              </button>
            )}

            <button
              className="m-3 btn btn-sm btn-primary"
              onClick={this.deleteToDo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="m-3 btn btn-sm btn-success"
              onClick={this.updateToDo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
            {
                this.state.message?(
                <button className="btn btn-info" onClick={this.navidgateToList}>
                    Navidgate To List
                </button>
                ): null
            }
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a ToDo...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ToDo);