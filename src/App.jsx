import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

import { Toaster } from "react-hot-toast";

import LoaderPage from "./components/LoaderPage";
import useRoutes from "./routes/useRoutes";

// React Query settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans",
  },
});

function App() {
  const routes = useRoutes();

  return (
    <ThemeProvider theme={theme}>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Suspense fallback={<LoaderPage />}>
              <Routes>{routes}</Routes>
            </Suspense>
          </BrowserRouter>

          {/* Toaster Configrations  */}
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "white",
                color: "black",
              },
            }}
          />
        </QueryClientProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}

export default App;
