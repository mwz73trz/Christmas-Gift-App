import { Component } from "react";
import giftsAPI from "../api/giftsAPI";

class GiftPage extends Component {
  static MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  };

  state = {
    gift: null,
    mode: GiftPage.MODE_TYPE.VIEW,
  };

  async getGift() {
    try {
      let giftId = this.props.match.params.giftId;
      let giftData = await giftsAPI.getGiftById(giftId);
      if (giftData) {
        this.setState({ gift: giftData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeMode = (newMode) => {
    this.setState({ mode: newMode });
  };

  updateGift = async () => {
    try {
      let inputItem = document.getElementById("gift-item");
      let inputLocation = document.getElementById("gift-location");
      let inputPrice = document.getElementById("gift-price");
      let inputPurchased = document.getElementById("gift-purchased");
      let giftId = this.state.gift.id;
      if (
        inputItem &&
        inputLocation &&
        inputPrice &&
        inputPurchased &&
        giftId > 0
      ) {
        let updatedGift = {
          name: this.state.gift.name,
          item: inputItem.value,
          location: inputLocation.value,
          price: inputPrice.value,
          purchased: inputPurchased.checked,
        };
        let data = await giftsAPI.updateGift(giftId, updatedGift);
        if (data) {
          this.setState({ gift: data });
          this.changeMode(GiftPage.MODE_TYPE.VIEW);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteGift = async () => {
    try {
      let personId = this.state.gift.person;
      let giftId = this.state.gift.id;
      if (giftId > 0) {
        let result = await giftsAPI.deleteGift(giftId);
        if (result.success) {
          this.props.history.push(`/persons/${personId}/`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getGift();
  }

  renderGift() {
    if (!this.state.gift) {
      return <p>No Gift Found!</p>;
    }
    if (this.state.mode === GiftPage.MODE_TYPE.UPDATE) {
      return (
        <div>
          <div>
            <h1 className="nonbreak">Item: </h1>
            <input
              id="gift-item"
              placeholder="item"
              defaultValue={this.state.gift.item}
            />
          </div>
          <div>
            <h1 className="nonbreak">Location: </h1>
            <input
              id="gift-location"
              placeholder="location"
              defaultValue={this.state.gift.location}
            />
          </div>
          <div>
            <h1 className="nonbreak">Price: </h1>
            <input
              id="gift-price"
              placeholder="price"
              defaultValue={this.state.gift.price}
            />
          </div>
          <div>
            <h1 className="nonbreak">Purchased: </h1>
            <input
              id="gift-purchased"
              type="checkbox"
              defaultChecked={this.state.gift.purchased}
            />
          </div>
          <br />
          <button onClick={this.updateGift}>Save</button>
          <button onClick={() => this.changeMode(GiftPage.MODE_TYPE.VIEW)}>
            Cancel
          </button>
        </div>
      );
    }
    return (
      <div>
        <h1>Item: {this.state.gift.item}</h1>
        <h3>Location: {this.state.gift.location}</h3>
        <h3>Price: {this.state.gift.price}</h3>
        <h3>Purchased: {this.state.gift.purchased ? "YES" : "NO"}</h3>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Gift Page</h1>
        {this.renderGift()}
        <hr />
        <button onClick={() => this.changeMode(GiftPage.MODE_TYPE.UPDATE)}>
          Update
        </button>
        <button onClick={this.deleteGift}>Delete</button>
      </div>
    );
  }
}

export default GiftPage;
