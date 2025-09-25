import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import ParticlesBackground from "./ParticlesBackground";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="relative min-h-screen">
        <ParticlesBackground />
        <div className="relative z-10">
          <App />
        </div>
      </div>
    </Provider>
  </React.StrictMode>
);
