import { render } from "react-dom";
import App from "./App.jsx";
import { LangProvider } from "./i18n.jsx";
import "./styles.css";

render(
  <LangProvider>
    <App />
  </LangProvider>,
  document.getElementById("app")
);
