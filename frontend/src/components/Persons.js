import { Component } from "react";
import { Link } from "react-router-dom";

class Persons extends Component {
  render() {
    return (
      <span>
        <Link to={`/persons/${this.props.person.id}`}>
          {this.props.person.name}
        </Link>
        <button onClick={() => this.props.handleDelete(this.props.person.id)}>
          Delete
        </button>
      </span>
    );
  }
}

export default Persons;
