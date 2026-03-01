import { BrowserRouter } from "react-router-dom";
import { Providers } from "@/components/providers";
import { AppRouter } from "@/router";

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRouter />
      </Providers>
    </BrowserRouter>
  );
}
