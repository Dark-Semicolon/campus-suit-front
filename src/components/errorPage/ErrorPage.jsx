import { useParams } from "react-router-dom";
import style from "./ErrorPage.module.css";
import Button from "../Button";

function ErrorPage({ error, status, resetErrorBoundary }) {

  const { statusCode } = useParams();

  const errors = {
    404: "Not Found",
    401: "Unauthorized",
    403: "Forbidden",
    402: "Server Error",
  };


  return (
    <section className="h-screen bg-white">
      <div className="flex flex-col items-center justify-center h-screen px-10">
        <h1 className="font-medium text-center text-7xl">
          {statusCode || status}
        </h1>
        <div className={style.bgImg}></div>
        <div className="flex flex-col items-center justify-center gap-7">
          {resetErrorBoundary ? (
            <>
              <h2 className="text-2xl font-normal text-blue-color-primary">
                {error.message}
              </h2>
              <p className="text-lg font-medium text-center text-blue-color-primary">
                Sorry, an error occurred in the application.<br />
                Please reload the page, and if the error persists, please contact customer service.
              </p>
              <Button
                onClick={resetErrorBoundary}
                type="primary"
                className="leading-7 w-fit"
              >
                Refresh
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-4xl font-normal text-blue-color-primary">
                {error || errors[statusCode]}
              </h3>
              <p className="text-lg font-medium text-blue-color-primary">
                Are you sure you want to be here?
              </p>
              <Button to="/" type="primary" className="leading-7 w-fit">
                Home Page
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
