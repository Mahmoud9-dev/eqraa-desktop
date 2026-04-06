import { Loader2 } from "lucide-react";

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export default LoadingFallback;
