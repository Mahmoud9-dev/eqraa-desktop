import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const EducationalGuidanceCounseling = () => {
  const { t, language } = useLanguage();
  const initialData = useMemo<EducationalItem[]>(
    () => t.educationalSeeds.guidanceCounseling,
    [t.educationalSeeds.guidanceCounseling],
  );

  return (
    <EducationalSubPage
      key={language}
      translations={t.educational.subPages.guidanceCounseling}
      initialData={initialData}
    />
  );
};

export default EducationalGuidanceCounseling;
