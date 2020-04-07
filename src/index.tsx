import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ItemList from "./components/item-list";

function App() {
  return <ItemList />;
}
export default App;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
