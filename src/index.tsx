import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ItemList from "./components/item-list";
import HomePage from "./views/home";
function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
export default App;
