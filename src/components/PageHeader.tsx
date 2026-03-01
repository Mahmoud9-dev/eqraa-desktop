import { ArrowRight, ArrowLeft, Home, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
}

const PageHeader = ({ title, showBack = true }: PageHeaderProps) => {
  const { t, isRTL } = useLanguage();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 xs:py-4 sm:py-6 md:py-8 shadow-lg relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h1>
          <div className="flex items-center gap-1 xs:gap-2 md:gap-3">
            <LanguageToggle />
            <ThemeToggle />
            {/* Mobile menu */}
            <div className="md:hidden">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 xs:p-2.5 touch-target"
                aria-label={t.header.openMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
            {/* Desktop buttons */}
            <div className="hidden md:flex items-center gap-2">
              {showBack && (
                <Link to="/">
                  <Button variant="secondary" size="lg" className="gap-2">
                    <BackArrow className="w-5 h-5" />
                    {t.header.home}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile sidebar menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 xs:mt-4 pt-3 xs:pt-4 border-t border-primary-foreground/20 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1 xs:space-y-2">
              {showBack && (
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-start gap-2 py-2.5 xs:py-3 touch-target"
                  >
                    <BackArrow className="w-4 h-4" />
                    {t.header.home}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
