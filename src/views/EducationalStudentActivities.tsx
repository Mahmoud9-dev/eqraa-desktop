import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const initialData: EducationalItem[] = [
  {
    id: "1",
    title: "مسابقة حفظ القرآن الكريم",
    description: "مسابقة سنوية لحفظ وتجويد القرآن الكريم بمختلف مستوياته",
    teacher: "الشيخ أحمد محمد",
    date: "2025-11-12",
    duration: "يوم كامل",
    recording: "available",
    verses: "المزمل 1-20",
  },
  {
    id: "2",
    title: "معسكر القيم الإسلامية",
    description: "معسكر تربوي لتعزيز القيم الإسلامية وبناء الشخصية",
    teacher: "الشيخ خالد حسن",
    date: "2025-11-05",
    duration: "3 أيام",
    recording: "available",
    verses: "الأنعام 151-153",
  },
  {
    id: "3",
    title: "مشروع الخدمة المجتمعية",
    description: "مشروع طلابي لخدمة المجتمع وتطبيق مبادئ الإسلام العملي",
    teacher: "الشيخ محمد سعيد",
    date: "2025-10-29",
    duration: "أسبوع",
    recording: "processing",
    verses: "البقرة 177",
  },
];

const EducationalStudentActivities = () => {
  const { t } = useLanguage();

  return (
    <EducationalSubPage
      translations={t.educational.subPages.studentActivities}
      initialData={initialData}
    />
  );
};

export default EducationalStudentActivities;
