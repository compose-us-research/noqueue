import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import ChooseRole from "../choose-role/choose-role";
import CustomerApp from "../customer-app/customer-app";
import UpdateShopApp from "../update-shop-app/update-shop-app";
import styles from "./app.module.css";
import Loader from "../loader/loader";
import {
  FetcherProvider,
  connection as defaultConnection,
} from "../../service/server/connection";
import useLocalTickets, {
  LocalTicketsProvider,
} from "../../service/tickets/use-local-tickets";
import Stub from "../stub/stub";
import ShowTicketsRoute from "../show-tickets-route/show-tickets-route";
import ChooseShop from "../choose-shop/choose-shop";

interface AppProps {
  connection?: typeof defaultConnection;
}

interface CurrentShopAppProps {
  connection: typeof defaultConnection;
}

const CurrentShopApp: React.FC<CurrentShopAppProps> = ({ connection }) => {
  const { shopId } = useParams();
  const { push } = useHistory();
  const { path } = useRouteMatch();

  return (
    <FetcherProvider currentShopId={shopId} connection={connection}>
      <Switch>
        {/* more or less hidden route to change the shop */}
        <Route path={`${path}/owner`}>
          <UpdateShopApp backToIndex={() => push("/")} />
        </Route>
        <Route path={path}>
          <CustomerApp backToIndex={() => push("/")} />
        </Route>
      </Switch>
    </FetcherProvider>
  );
};

const ChooseRoleRoute = () => {
  const { push } = useHistory();
  const { hasTickets } = useLocalTickets();
  return (
    <ChooseRole
      selectShopRole={() => push(`/create-shop`)}
      selectCustomerRole={() => push(`/choose-shop`)}
      hasTickets={hasTickets}
      selectShowTickets={() => push(`/show-tickets`)}
    />
  );
};

const RoutedApp: React.FC<CurrentShopAppProps> = ({ connection }) => {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path="/create-shop">
        <Stub next={() => push("/")} buttonText="Weiter">
          Momentan ist unsere Registrierung nur über Rücksprache mit uns
          möglich.
        </Stub>
      </Route>
      <Route path="/choose-shop">
        <Suspense fallback={<Loader />}>
          <ChooseShop backToIndex={() => push(url)} navigateTo={push} />
        </Suspense>
      </Route>
      <Route path="/shop/:shopId">
        <Suspense fallback={<Loader />}>
          <CurrentShopApp connection={connection} />
        </Suspense>
      </Route>
      <Route path="/show-tickets">
        <Suspense fallback={<Loader />}>
          <ShowTicketsRoute backToIndex={() => push(url)} />
        </Suspense>
      </Route>
      <Route path="/">
        <Suspense fallback={<Loader />}>
          <ChooseRoleRoute />
        </Suspense>
      </Route>
    </Switch>
  );
};

const App: React.FC<AppProps> = ({ connection = defaultConnection }) => {
  return (
    <div className={styles.root}>
      <Router>
        <LocalTicketsProvider>
          <Suspense fallback={<Loader />}>
            <RoutedApp connection={connection} />
          </Suspense>
        </LocalTicketsProvider>
      </Router>
    </div>
  );
};

export default App;
