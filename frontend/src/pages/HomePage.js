import { Component } from "react";
import Persons from "../components/Persons";
import giftsAPI from "../api/giftsAPI";

class HomePage extends Component {
  state = {
    persons: [],
  };

  getPersons = async () => {
    try {
      let personsData = await giftsAPI.getPersons();
      this.setState({ persons: personsData });
    } catch (error) {
      console.log(error);
    }
  };

  createPerson = async () => {
    let input = document.getElementById("new-person-name");
    if (input) {
      let newPersonParam = {
        name: input.value,
      };
      let data = await giftsAPI.createPerson(newPersonParam);
      if (data) {
        let newPersons = [...this.state.persons, data];
        this.setState({ persons: newPersons });
      }
    }
  };

  deletePerson = async (personId) => {
    try {
      if (personId > 0) {
        let result = await giftsAPI.deletePerson(personId);
        if (result.success) {
          let newPersons = this.state.persons.filter((person, index) => {
            return person.id !== personId;
          });
          this.setState({ persons: newPersons });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getPersons();
  }

  renderWelcome() {
    let personElements = this.state.persons.map((person, index) => {
      return (
        <li key={`person-${index}`}>
          <Persons person={person} handleDelete={this.deletePerson} />
        </li>
      );
    });
    return (
      <div>
        <h2>Welcome to Your Gift Purchase Managing App</h2>
        <h2>People on Gift List</h2>
        <ul className="simple-list" style={{ listStyle: "none" }}>
          {personElements}
        </ul>
        <hr />
        <input id="new-person-name" placeholder="new person" />
        <button onClick={this.createPerson}>Add New Person</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {this.renderWelcome()}
      </div>
    );
  }
}

export default HomePage;
