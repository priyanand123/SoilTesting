import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppRoute from "./app/components/router"; // your router
import { store, persistor } from "./app/store"; // Redux store + persistor
import "./index.css"; // Tailwind CSS globally

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <AppRoute />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
