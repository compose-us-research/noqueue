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
import ShowTicketRoute from "../show-ticket-route/show-ticket-route";
import ShowTicketsRoute from "../show-tickets-route/show-tickets-route";
import ChooseShop from "../choose-shop/choose-shop";
import ErrorBoundary from "../error-boundary/error-boundary";
import Banner from "../banner/banner";

const subject = "Registrierung eines Geschäfts";
const body = `Herzlich Willkommen!
schön, dass Sie sich bei platzhalter.io registrieren.

Mit platzhalter.io können Sie Ihren Kunden feste Slots und Termine zuweisen und so Schlangen, Wartezeiten und Abstandsprobleme einfach umgehen.

Es ist kein Technik-KnowHow, kein Installieren nötig und der Datenschutz wird gewahrt - das gilt sowohl für Sie als auch für Ihre Kunden.

Nötige Schritte:

1. Sie geben Ihre Daten hier an, verschicken diese E-Mail an betatester@platzhalter.io und wir registrieren Sie:

Name des Geschäfts: Beispielshop
Adresse: Beispielstraße 1
Postleitzahl: 94032
Stadt: Beispielstadt

2. Wir mailen Ihnen Ihre platzhalter.io Webadresse.

3. Sie füllen Ihre Details bei platzhalter.io/ihr-shop aus.

4. Ihre Kunden checken bei platzhalter.io/ihr-shop ein.

5. Ihre Kunden kommen entspannt bei Ihnen vorbei.

Sollte es einen Covid19 Fall geben, übertragen Sie die Personendaten per Knopfdruck ans Gesundheitsamt.

Wenn platzhalter.io hilfreich für Sie ist, dann können Sie gerne beitragen: Mit Feedback, Werbung für platzhalter.io oder einer Spende.

Vielen Dank und los geht's!
Es grüßen die Platzhalter
`;
const mailLink = `mailto:betatester@platzhalter.io?subject=${encodeURIComponent(
  subject
)}&body=${encodeURIComponent(body)}`;

interface AppProps {
  connection?: typeof defaultConnection;
}

interface CurrentShopAppProps {
  connection: typeof defaultConnection;
}

const CurrentShopApp: React.FC<CurrentShopAppProps> = ({ connection }) => {
  const { shopId } = useParams<{ shopId: string }>();
  const { push } = useHistory();
  const { path } = useRouteMatch();
  const backToIndex = () => push("/");

  return (
    <FetcherProvider currentShopId={shopId} connection={connection}>
      <Switch>
        {/* more or less hidden route to change the shop */}
        <Route path={`${path}/owner`}>
          <UpdateShopApp backToIndex={backToIndex} />
        </Route>
        <Route path={`${path}/ticket/:ticketId`}>
          <ShowTicketRoute backToIndex={backToIndex} />
        </Route>
        <Route path={path}>
          <CustomerApp backToIndex={backToIndex} />
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
          <p>
            Momentan ist die{" "}
            <a href={mailLink}>
              Registrierung eines eigenen Shops nur über Rücksprache mit uns
            </a>{" "}
            möglich.
          </p>
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
      <Banner>
        Achtung: Demo - aktuell wird Deine Buchung in den Geschäften noch nicht
        genutzt!
      </Banner>
      <Router>
        <LocalTicketsProvider>
          <ErrorBoundary resetKeys={[]}>
            <Suspense fallback={<Loader />}>
              <RoutedApp connection={connection} />
            </Suspense>
          </ErrorBoundary>
        </LocalTicketsProvider>
      </Router>
    </div>
  );
};

export default App;
