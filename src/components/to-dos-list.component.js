import React, { Component } from "react";
import ToDoDataService from "../services/to-do.service";
import { Link } from "react-router-dom";

export default class ToDosList extends Component {
  constructor(props) {
    super(props);
    this.retrieveToDos = this.retrieveToDos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveToDo = this.setActiveToDo.bind(this);

    this.state = {
      toDos: [],
      currentToDo: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveToDos();
  }

  retrieveToDos() {
    ToDoDataService.getAll()
      .then(response => {
        this.setState({
          toDos: response.data.slice(0, 10)
        });
        console.log(response.data.slice(0, 10));
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveToDos();
    this.setState({
      currentToDo: null,
      currentIndex: -1
    });
  }

  setActiveToDo(toDo, index) {
    this.setState({
      currentToDo: toDo,
      currentIndex: index
    });
  }

  render() {
    const { toDos, currentToDo, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>To Do List</h4>

          <ul className="list-group">
            {toDos &&
              toDos.map((toDo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveToDo(toDo, index)}
                  key={index}
                >
                  {`${toDo.id}. ${toDo.title}`}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentToDo ? (
            <div>
              <h4>ToDo</h4>
              <div>
                <label>
                  <strong>Number:</strong>
                </label>{" "}
                {currentToDo.id}
              </div>
              <div>
              <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentToDo.title}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentToDo.completed ? "Completed" : "Pending"}
              </div>

              <Link
                to={"/todos/" + currentToDo.id}
                className="m-3 btn btn-sm btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a ToDo...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}