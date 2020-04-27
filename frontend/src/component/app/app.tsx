import React from "react";

import ChooseRole from "../choose-role/choose-role";

interface AppProps {}

const noop = () => {};

const App: React.FC<AppProps> = () => {
  const selectShopRole = noop;
  const selectCustomerRole = noop;
  return (
    <ChooseRole
      selectShopRole={selectShopRole}
      selectCustomerRole={selectCustomerRole}
    />
  );
};

export default App;
