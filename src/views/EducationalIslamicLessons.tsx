import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const EducationalIslamicLessons = () => {
  const { t } = useLanguage();
  const initialData = useMemo<EducationalItem[]>(
    () => t.educationalSeeds.islamicLessons,
    [t.educationalSeeds.islamicLessons],
  );

  return (
    <EducationalSubPage
      translations={t.educational.subPages.islamicLessons}
      initialData={initialData}
    />
  );
};

export default EducationalIslamicLessons;
