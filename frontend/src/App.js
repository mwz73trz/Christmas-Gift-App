import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PersonPage from "./pages/PersonPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/persons/:personId" exact component={PersonPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
