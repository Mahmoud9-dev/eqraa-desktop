import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const EducationalFamilyPrograms = () => {
  const { t } = useLanguage();
  const initialData = useMemo<EducationalItem[]>(
    () => t.educationalSeeds.familyPrograms,
    [t.educationalSeeds.familyPrograms],
  );

  return (
    <EducationalSubPage
      translations={t.educational.subPages.familyPrograms}
      initialData={initialData}
    />
  );
};

export default EducationalFamilyPrograms;
