import React, { Suspense } from "react";

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
import {
  FetcherProvider,
  connection as defaultConnection,
} from "../../service/server/connection";
import useLocalTickets from "../../service/tickets/use-local-tickets";

interface AppProps {
  connection?: typeof defaultConnection;
}

const RoutedApp = () => {
  const history = useHistory();
  const { hasTickets } = useLocalTickets();
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
          hasTickets={hasTickets}
          selectShowTickets={() => history.push("show-tickets")}
        />
      </Route>
    </Switch>
  );
};

const App: React.FC<AppProps> = ({ connection = defaultConnection }) => {
  return (
    <div className={styles.root}>
      <Suspense fallback={<Loader />}>
        <Router>
          <FetcherProvider connection={connection}>
            <RoutedApp />
          </FetcherProvider>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
