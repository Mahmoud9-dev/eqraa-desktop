import { BrowserRouter } from "react-router-dom";
import { Providers } from "@/components/providers";
import { ErrorBoundaryWrapper } from "@/components/ErrorBoundary";
import { AppRouter } from "@/router";

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <ErrorBoundaryWrapper>
          <AppRouter />
        </ErrorBoundaryWrapper>
      </Providers>
    </BrowserRouter>
  );
}
