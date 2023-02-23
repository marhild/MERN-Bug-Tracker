import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};
const middleware = [thunk];

let store;

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

if (window.navigator.userAgent.includes("Chrome")) {
  store = createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      /* 
      uncomment for development
      can cause error in production
      for browsers without redux devtools
      */
    /*
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()*/
      
    )
  );
} else {
  store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}
const persistor = persistStore(store);
export default store;