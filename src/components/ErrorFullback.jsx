import Button from "./Button";

function ErrorFullback({ error, resetErrorBoundary }) {
  return (
    <>
      <div>
        <div>
          <h1>Something went wrong 🫡 </h1>
          <p>{error.message}</p>
          <Button type="primary" size="large" onClick={resetErrorBoundary}>
            Try Again
          </Button>
        </div>
      </div>
    </>
  );
}

export default ErrorFullback;
