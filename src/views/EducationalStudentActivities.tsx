import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const EducationalStudentActivities = () => {
  const { t } = useLanguage();
  const initialData = useMemo<EducationalItem[]>(
    () => t.educationalSeeds.studentActivities,
    [t.educationalSeeds.studentActivities],
  );

  return (
    <EducationalSubPage
      translations={t.educational.subPages.studentActivities}
      initialData={initialData}
    />
  );
};

export default EducationalStudentActivities;
