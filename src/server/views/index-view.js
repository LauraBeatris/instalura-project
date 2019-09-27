//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
import { routes } from "../../client/routes";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../client/reducers";
import thunkMiddleware from "redux-thunk";
import TimelineApi from "../../client/logicas/TimelineApi";

const Promise = require("bluebird");

function createReduxStore(req, match) {
  console.log("hey");
  // eslint-disable-line
  const estadoInicial = {
    timeline: [],
    notificacao: ""
  };
  const store = createStore(
    rootReducer,
    estadoInicial,
    applyMiddleware(thunkMiddleware)
  );
  const promisse = store.dispatch(
    TimelineApi.lista(
      `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${req.state["auth-token"]}`
    )
  );
  return promisse.then(() => store);
}

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = req => {
  const app = (req.server && req.server.app) || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({ routes, createReduxStore });
  }

  return app.routesEngine.render(req);
};
