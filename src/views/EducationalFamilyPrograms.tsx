import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const initialData: EducationalItem[] = [
  {
    id: "1",
    title: "برنامج الأسرة المسلمة",
    description: "برنامج متكامل لتعزيز قيم الأسرة المسلمة وتطوير العلاقات الأسرية",
    teacher: "الشيخ أحمد محمد",
    date: "2025-11-11",
    duration: "ساعتان",
    recording: "available",
    verses: "الروم 21",
  },
  {
    id: "2",
    title: "ورشة تربية الأبناء",
    description: "ورشة عمل عملية لآليات تربية الأبناء في ضوء الإسلام",
    teacher: "الشيخ خالد حسن",
    date: "2025-11-04",
    duration: "3 ساعات",
    recording: "available",
    verses: "الإسراء 23-25",
  },
  {
    id: "3",
    title: "لقاءات أولياء الأمور",
    description: "لقاءات دورية لمناقشة قضايا تربية الأبناء ومتابعتهم",
    teacher: "الشيخ محمد سعيد",
    date: "2025-10-28",
    duration: "ساعة ونصف",
    recording: "processing",
    verses: "التحريم 6",
  },
];

const EducationalFamilyPrograms = () => {
  const { t } = useLanguage();

  return (
    <EducationalSubPage
      translations={t.educational.subPages.familyPrograms}
      initialData={initialData}
    />
  );
};

export default EducationalFamilyPrograms;
