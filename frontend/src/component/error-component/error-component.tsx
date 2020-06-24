import React from "react";
import HttpRequestError from "../../service/error/http-request-error";

interface ErrorComponentProps {
  error: any;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  if (error instanceof HttpRequestError) {
    return (
      <div>
        <h2>Netzwerkanfrage schlug fehl!</h2>
        <p>Bei der Ausführung von</p>
        <code>
          {error.method} {error.url}
        </code>
        <p>
          wurde Status "{error.status}" zurückgegeben ({error.message}).
        </p>
      </div>
    );
  }
  return (
    <div>
      <h2>Es ist ein Fehler aufgetreten!</h2>
      <p>
        {error.name}: {error.message}
      </p>
    </div>
  );
};

export default ErrorComponent;
