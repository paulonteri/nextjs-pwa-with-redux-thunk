import { useMemo } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
// import * as Sentry from "@sentry/react";
// const sentryReduxEnhancer = Sentry.createReduxEnhancer({
//     // Optionally pass options
// });

let store;

const middleware = [thunk];

function returnMiddleware() {
  if (process.env.NODE_ENV === "development") {
    const { createLogger } = require("redux-logger");
    const { composeWithDevTools } = require("redux-devtools-extension");

    const logger = createLogger({
      // ...options
    });

    middleware.push(logger);
    return composeWithDevTools(applyMiddleware(...middleware));
  } else {
    return applyMiddleware(...middleware);
  }
}

function initStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(returnMiddleware()) // , sentryReduxEnhancer)
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
