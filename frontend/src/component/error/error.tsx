import React from "react";

interface ErrorProps {
  error: any;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return <div>{error}</div>;
};

export default Error;
