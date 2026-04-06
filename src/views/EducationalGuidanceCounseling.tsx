import { useLanguage } from "@/contexts/LanguageContext";
import { EducationalSubPage } from "@/views/educational/EducationalSubPage";
import type { EducationalItem } from "@/views/educational/EducationalSubPage";

const initialData: EducationalItem[] = [
  {
    id: "1",
    title: "جلسات إرشاد فردي",
    description: "جلسات استشارية فردية لمساعدة الطلاب على حل مشاكلهم وتطوير أنفسهم",
    teacher: "الشيخ أحمد محمد",
    date: "2025-11-10",
    duration: "45 دقيقة",
    recording: "available",
    verses: "فاطر 18",
  },
  {
    id: "2",
    title: "ورشة بناء الثقة بالنفس",
    description: "ورشة عمل لتعزيز ثقة الطلاب بأنفسهم وتطوير قدراتهم الشخصية",
    teacher: "الشيخ خالد حسن",
    date: "2025-11-03",
    duration: "ساعتان",
    recording: "available",
    verses: "الرعد 11",
  },
  {
    id: "3",
    title: "استشارات تربوية",
    description: "جلسات استشارية للآباء حول كيفية التعامل مع المراحل العمرية المختلفة",
    teacher: "الشيخ محمد سعيد",
    date: "2025-10-27",
    duration: "ساعة",
    recording: "processing",
    verses: "لقمان 17-19",
  },
];

const EducationalGuidanceCounseling = () => {
  const { t } = useLanguage();

  return (
    <EducationalSubPage
      translations={t.educational.subPages.guidanceCounseling}
      initialData={initialData}
    />
  );
};

export default EducationalGuidanceCounseling;
