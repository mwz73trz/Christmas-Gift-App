import { Component } from "react";
import { Link } from "react-router-dom";
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

  addGift = async () => {
    try {
      let inputItem = document.getElementById("new-gift-item");
      let inputLocation = document.getElementById("new-gift-location");
      let inputPrice = document.getElementById("new-gift-price");
      if (inputItem && inputLocation && inputPrice) {
        let newGiftParams = {
          name: this.state.person.id,
          item: inputItem.value,
          location: inputLocation.value,
          price: inputPrice.value,
          purchased: false,
        };
        let data = await giftsAPI.addGift(newGiftParams);
        if (data) {
          this.getPerson();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getPerson();
  }

  renderGifts() {
    let giftElements = this.state.person.gifts.map((gift, index) => {
      return (
        <li key={`gift-${index}`}>
          <Link to={`/persons/${this.state.person.id}/gifts/${gift.id}`}>
            {gift.item}
          </Link>
        </li>
      );
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
        <hr />
        <input id="new-gift-item" placeholder="new item" />
        <input id="new-gift-location" placeholder="new location" />
        <input id="new-gift-price" placeholder="new price" />
        <button onClick={this.addGift}>Add Gift</button>
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
