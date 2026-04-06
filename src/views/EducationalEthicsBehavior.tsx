import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const initialData: EducationalItem[] = [
  {
    id: "1",
    title: "آداب الطعام والشراب في الإسلام",
    description: "تعليم الآداب النبوية في الأكل والشرب وأهميتها في حياة المسلم",
    teacher: "الشيخ أحمد محمد",
    date: "2025-11-14",
    duration: "40 دقيقة",
    recording: "available",
    verses: "الأعراف 31-36",
  },
  {
    id: "2",
    title: "بر الوالدين وحقوقهما",
    description: "توضيح أهمية بر الوالدين والحقوق الواجبة تجاههما في الإسلام",
    teacher: "الشيخ خالد حسن",
    date: "2025-11-07",
    duration: "45 دقيقة",
    recording: "available",
    verses: "الإسراء 23-24",
  },
  {
    id: "3",
    title: "الصدق والأمانة",
    description: "أهمية الصدق والأمانة كقيم إسلامية أساسية وتطبيقها في الحياة",
    teacher: "الشيخ محمد سعيد",
    date: "2025-10-31",
    duration: "35 دقيقة",
    recording: "processing",
    verses: "المائدة 8-13",
  },
];

const EducationalEthicsBehavior = () => {
  const { t } = useLanguage();

  return (
    <EducationalSubPage
      translations={t.educational.subPages.ethicsBehavior}
      initialData={initialData}
    />
  );
};

export default EducationalEthicsBehavior;
