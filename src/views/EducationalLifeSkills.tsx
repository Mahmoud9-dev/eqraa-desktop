import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const initialData: EducationalItem[] = [
  {
    id: "1",
    title: "مهارات التواصل الفعال",
    description: "تطوير مهارات التواصل مع الآخرين وفن الحوار البناء",
    teacher: "الشيخ أحمد محمد",
    date: "2025-11-13",
    duration: "50 دقيقة",
    recording: "available",
    verses: "الحجرات 11-13",
  },
  {
    id: "2",
    title: "القيادة وإدارة الفريق",
    description: "تعليم مبادئ القيادة الإسلامية وكيفية إدارة الفرق بفعالية",
    teacher: "الشيخ خالد حسن",
    date: "2025-11-06",
    duration: "45 دقيقة",
    recording: "available",
    verses: "آل عمران 159-160",
  },
  {
    id: "3",
    title: "حل المشكلات واتخاذ القرارات",
    description: "منهجية إسلامية في حل المشكلات واتخاذ القرارات الحكيمة",
    teacher: "الشيخ محمد سعيد",
    date: "2025-10-30",
    duration: "40 دقيقة",
    recording: "processing",
    verses: "الشورى 38-43",
  },
];

const EducationalLifeSkills = () => {
  const { t } = useLanguage();

  return (
    <EducationalSubPage
      translations={t.educational.subPages.lifeSkills}
      initialData={initialData}
    />
  );
};

export default EducationalLifeSkills;
