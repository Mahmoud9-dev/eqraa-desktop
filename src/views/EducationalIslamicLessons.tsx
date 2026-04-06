import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const initialData: EducationalItem[] = [
  {
    id: "1",
    title: "أصول العقيدة الإسلامية",
    description: "درس شامل عن أصول العقيدة وأركان الإيمان",
    teacher: "الشيخ أحمد محمد",
    date: "2025-11-15",
    duration: "45 دقيقة",
    recording: "available",
    verses: "البقرة 255-285",
  },
  {
    id: "2",
    title: "فقه العبادات",
    description: "أحكام الطهارة والصلاة والزكاة",
    teacher: "الشيخ خالد حسن",
    date: "2025-11-08",
    duration: "60 دقيقة",
    recording: "available",
    verses: "المائدة 6-11",
  },
  {
    id: "3",
    title: "سيرة النبي صلى الله عليه وسلم",
    description: "مراحل حياة النبي والدروس المستفادة",
    teacher: "الشيخ محمد سعيد",
    date: "2025-11-01",
    duration: "50 دقيقة",
    recording: "processing",
    verses: "آل عمران 144-148",
  },
];

const EducationalIslamicLessons = () => {
  const { t } = useLanguage();

  return (
    <EducationalSubPage
      translations={t.educational.subPages.islamicLessons}
      initialData={initialData}
    />
  );
};

export default EducationalIslamicLessons;
