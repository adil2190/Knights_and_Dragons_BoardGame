import React from "react";
import { AppProvider } from "./context/AppContext";
import "./index.css";
import Router from "./routes/Router";

function App(props) {
  return (
    <div>
      <AppProvider>
        <Router />
      </AppProvider>
    </div>
  );
}

export default App;
