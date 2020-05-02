import React, { useState } from "react";

import ChooseRole from "../choose-role/choose-role";
import CustomerApp from "../customer-app/customer-app";
import RegisterShop from "../register-shop/register-shop";
import styles from "./app.module.css";

interface AppProps {}

type Roles = "customer" | "shop";

const App: React.FC<AppProps> = () => {
  const [role, setRole] = useState<Roles | null>(null);
  return (
    <div className={styles.root}>
      {role === null ? (
        <ChooseRole
          selectShopRole={() => setRole("shop")}
          selectCustomerRole={() => setRole("customer")}
        />
      ) : role === "shop" ? (
        <RegisterShop backToIndex={() => setRole(null)} />
      ) : (
        <CustomerApp backToIndex={() => setRole(null)} />
      )}
    </div>
  );
};

export default App;
