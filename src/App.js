import React, { Component } from "react";
import "./App.css";
import Radium from "radium";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { id: "KuyaLee01", name: "Lynard", age: 28 },
      { id: "SashaChu", name: "Sasha", age: 8 },
      { id: "LunaLang", name: "Luna", age: 7 }
    ],
    showPersons: false
  };

  hellYo = newName => {
    this.setState({
      persons: [
        { name: newName, age: 39 },
        { name: "Sasha", age: 8 },
        { name: "Luna", age: 7 }
      ]
    });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  toggleUsers = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    const style = {
      backgroundColor: "red",
      textAlign: "center",
      color: "white",
      ":hover": {
        backgroundColor: "orange",
        cursor: "pointer"
      }
    };

    let persons = null;
    let cssClass = [];
    if (this.state.persons.length === 1) {
      cssClass.push("red");
    }
    if (this.state.persons.length === 0) {
      cssClass.push("bold");
    }

    if (this.state.persons.length <= 2) {
      cssClass.push("under");
    }

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                change={event => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      style.backgroundColor = "green";
    }

    return (
      <div className="App">
        <h1>Hello Yo! Wuddup, this is something new</h1>
        <p className={cssClass.join(" ")}>
          <strong>Awesome!!</strong> right?
        </p>
        <h1>Hello Again! Wuddup, this is something new</h1>

        {persons}

        <button onClick={this.toggleUsers} style={style}>
          Click Me
        </button>
      </div>
    );

    // render() {
    //  return React.createElement(
    //    "div",
    //    { className: "App" },
    //    React.createElement("h1", null, "Hello World")
    //  );
    // }
  }
}

export default Radium(App);
