
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { logger } from "@/lib/logger";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    logger.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">{t.errors.notFound}</p>
        <p className="mb-4 text-sm text-gray-500">{t.errors.notFoundDescription}</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          {t.errors.backHome}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
