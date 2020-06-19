import React, { Suspense } from "react";
import { connection as mockedConnection } from "./fetcher/connection";
import { FetcherProvider } from "../../src/service/server/connection";

interface ConnectedProps {
  children: React.ReactNode;
  connection?: typeof mockedConnection;
  shopId?: string;
}

const Connected: React.FC<ConnectedProps> = ({
  children,
  connection = mockedConnection,
  shopId = "cozy-costumes",
}) => {
  return (
    <FetcherProvider currentShopId={shopId} connection={connection}>
      <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
    </FetcherProvider>
  );
};

export default Connected;
