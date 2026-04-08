import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LoadingFallback = () => {
  const { t } = useLanguage();
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <span className="sr-only">{t.common.loading}</span>
    </div>
  );
};

export default LoadingFallback;
