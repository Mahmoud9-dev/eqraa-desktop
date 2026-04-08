import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const EducationalIslamicLessons = () => {
  const { t, language } = useLanguage();
  const initialData = useMemo<EducationalItem[]>(
    () => t.educationalSeeds.islamicLessons,
    [t.educationalSeeds.islamicLessons],
  );

  // Key by language so the sub-page remounts with fresh seed data on
  // language switch — its internal `items` state is only seeded once.
  return (
    <EducationalSubPage
      key={language}
      translations={t.educational.subPages.islamicLessons}
      initialData={initialData}
    />
  );
};

export default EducationalIslamicLessons;
