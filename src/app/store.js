import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../app/redux/Slices/authSlice";

import logger from "redux-logger";
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
   
     auth: authReducer,
   //  InstitutionSignupList:InstitutionSignUpPage,
     
     

    
  })
);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      
      serializableCheck: false, // Ignore check for non-serializable values
    }).concat(logger), // Add logger middleware
});

const persistor = persistStore(store);

export { store, persistor };
// ✅ export persistor
