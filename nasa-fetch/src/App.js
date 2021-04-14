import "./App.css";
import { Search } from "./components/Search";
import { HashRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Route exact path="/">
          <Navbar />
          <Search />
        </Route>
        <Route path="/gallery">
          <Navbar />
        </Route>
      </div>
    </HashRouter>
  );
}

export default App;
