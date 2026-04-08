import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const EducationalGuidanceCounseling = () => {
  const { t } = useLanguage();
  const initialData = useMemo<EducationalItem[]>(
    () => t.educationalSeeds.guidanceCounseling,
    [t.educationalSeeds.guidanceCounseling],
  );

  return (
    <EducationalSubPage
      translations={t.educational.subPages.guidanceCounseling}
      initialData={initialData}
    />
  );
};

export default EducationalGuidanceCounseling;
