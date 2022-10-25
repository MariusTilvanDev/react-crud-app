import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddToDo from "./components/add-to-do.component";
import ToDo from "./components/to-do.component";
import ToDosList from "./components/to-dos-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/todos"} className="navbar-brand">
            Marius Tilvan
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todos"} className="nav-link">
                ToDos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ToDosList/>} />
            <Route path="/todos" element={<ToDosList/>} />
            <Route path="/add" element={<AddToDo/>} />
            <Route path="/todos/:id" element={<ToDo/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;