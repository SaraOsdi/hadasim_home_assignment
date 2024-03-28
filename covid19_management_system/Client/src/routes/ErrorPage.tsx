import { ErrorResponse, useRouteError } from "react-router-dom";
import "../styles/error.css";

interface Error extends ErrorResponse {
  error?: string;
}

export function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.data}</i>
      </p>
    </div>
  );
}
