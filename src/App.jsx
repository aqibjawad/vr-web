import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import WebsiteLayout from "./layout/websiteLayout";
import routes from "./routes/routes";

import Home from "./pages/home/Home";
import AR from "./pages/ar/index";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* First, render all public routes */}
          <Route
            element={
              <WebsiteLayout>
                <Outlet />
              </WebsiteLayout>
            }
          >
            {routes.map(
              (route) =>
                route.type === "public" && (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                )
            )}
          </Route>

          {/* Then, render private routes with protection */}
          {/* <Route
            element={
              <AuthorizedLayout>
                <Outlet />
              </AuthorizedLayout>
            }
          >
            {routes.map(
              (route) =>
                route.type === "private" && (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      isAuthenticated ? (
                        route.element
                      ) : (
                        <Navigate
                          to="/login"
                          state={{ from: route.path }}
                          replace
                        />
                      )
                    }
                  />
                )
            )}
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;