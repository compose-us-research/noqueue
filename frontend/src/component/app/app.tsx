import React, { useState, Suspense } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import ChooseRole from "../choose-role/choose-role";
import CustomerApp from "../customer-app/customer-app";
import ShopApp from "../shop-app/shop-app";
import styles from "./app.module.css";
import Loader from "../loader/loader";

interface AppProps {}

type Roles = "customer" | "shop";

const RoutedApp = () => {
  const history = useHistory();
  return (
    <Switch>
      <Route path="/owner">
        <ShopApp backToIndex={() => history.push("/")} />
      </Route>
      <Route path="/customer">
        <CustomerApp backToIndex={() => history.push("/")} />
      </Route>
      <Route path="/">
        <ChooseRole
          selectShopRole={() => history.push("owner")}
          selectCustomerRole={() => history.push("customer")}
        />
      </Route>
    </Switch>
  );
};

const App: React.FC<AppProps> = () => {
  return (
    <div className={styles.root}>
      <Suspense fallback={<Loader />}>
        <Router>
          <RoutedApp />
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
