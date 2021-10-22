import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PersonPage from "./pages/PersonPage";
import GiftPage from "./pages/GiftPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/persons/:personId" exact component={PersonPage} />
            <Route
              path="/persons/:personId/gifts/:giftId"
              exact
              component={GiftPage}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
