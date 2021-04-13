import "./App.css";
import { Search } from "./components/Search";
import { HashRouter, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Route exact path="/">
          <Search />
        </Route>
      </div>
    </HashRouter>
  );
}

export default App;
