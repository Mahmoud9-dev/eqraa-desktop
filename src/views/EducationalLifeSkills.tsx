import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const EducationalLifeSkills = () => {
  const { t } = useLanguage();
  const initialData = useMemo<EducationalItem[]>(
    () => t.educationalSeeds.lifeSkills,
    [t.educationalSeeds.lifeSkills],
  );

  return (
    <EducationalSubPage
      translations={t.educational.subPages.lifeSkills}
      initialData={initialData}
    />
  );
};

export default EducationalLifeSkills;
