import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { redux } from "./redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={redux}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
