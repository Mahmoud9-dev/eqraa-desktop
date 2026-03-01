
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative touch-target"
      onClick={toggleLanguage}
      aria-label={language === 'ar' ? t.common.switchToEnglish : t.common.switchToArabic}
      title={language === 'ar' ? t.common.switchToEnglish : t.common.switchToArabic}
    >
      <span className="text-xs font-bold text-primary">
        {language === 'ar' ? 'EN' : 'AR'}
      </span>
    </Button>
  );
}
