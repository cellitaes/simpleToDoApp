import React, { Component } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';

class App extends Component {

  componentDidMount() {
    fetch('/tasks', {
      method: 'GET',
    }).then(res => res.json())
      .then(res => {
        this.setState({
          tasks: res,
        });
      })
  }

  state = {
    tasks: [],
  }

  deleteTask = (id) => {
    fetch(`/delete/${id}`, {
      method: 'DELETE',
    }).then(r => r.json())
      .then(r => {
        if (r.deleted) {
          const filteredTaskList = this.state.tasks.filter(task => task._id !== id);

          this.setState({
            tasks: filteredTaskList,
          })
        }
      });
  }

  changeTaskStatus = (id) => {
    console.log("change w stanie elementu o id " + id);
    const tasks = Array.from(this.state.tasks);
    tasks.forEach(task => {
      if (task._id === id) {
        task.active = false;
        task.finishDate = new Date().getTime()
      }
    })
    this.setState({
      tasks
    })
  }

  addTask = (text, date, important) => {
    date = new Date(`${date}`).getTime();
    fetch(`/add/${text}/${date}/${important}`, {
      method: 'POST',
    }).then(r => r.json())
      .then(r => this.setState({
        tasks: [...this.state.tasks, r],
      }))

    return true;
  }

  render() {
    return (
      <div className="App">
        <h1>TOD APP</h1>
        <AddTask add={this.addTask} />
        <TaskList tasks={this.state.tasks} delete={this.deleteTask} change={this.changeTaskStatus} />
      </div>
    );
  }
}

export default App;
