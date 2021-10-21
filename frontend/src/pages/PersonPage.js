import { Component } from "react";
import giftsAPI from "../api/giftsAPI";

class PersonPage extends Component {
  state = {
    person: null,
  };

  async getPerson() {
    try {
      let personId = this.props.match.params.personId;
      let personData = await giftsAPI.getPersonById(personId);
      if (personData) {
        this.setState({ person: personData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getPerson();
  }

  renderGifts() {
    let giftElements = this.state.person.gifts.map((gift, index) => {
      return <li key={`gift-${index}`}>{gift.item}</li>;
    });
    return (
      <ul className="simple-list" style={{ listStyle: "none" }}>
        {giftElements}
      </ul>
    );
  }

  renderPerson() {
    if (!this.state.person) {
      return <p>No Person Found!</p>;
    }
    return (
      <div>
        <h1>{this.state.person.name}</h1>
        {this.renderGifts()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Gift List Page: {this.props.match.params.personId}</h1>
        {this.renderPerson()}
      </div>
    );
  }
}

export default PersonPage;
