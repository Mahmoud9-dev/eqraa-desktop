import type { Language } from './types';

export interface ChartsTranslations {
  sectionTitle: string;
  attendance: {
    title: string;
    present: string;
    absent: string;
    excused: string;
    last30Days: string;
  };
  departments: {
    title: string;
    quran: string;
    tajweed: string;
    tarbawi: string;
  };
  performance: {
    title: string;
    rating: string;
    sessions: string;
  };
  workload: {
    title: string;
    students: string;
  };
  periods: {
    day: string;
    week: string;
    month: string;
    threeMonths: string;
    year: string;
  };
  noData: string;
}

export const charts: Record<Language, ChartsTranslations> = {
  ar: {
    sectionTitle: 'نظرة عامة',
    attendance: {
      title: 'اتجاه الحضور',
      present: 'حاضر',
      absent: 'غائب',
      excused: 'مأذون',
      last30Days: 'آخر 30 يوم',
    },
    departments: {
      title: 'الطلاب حسب القسم',
      quran: 'القرآن',
      tajweed: 'التجويد',
      tarbawi: 'التربوي',
    },
    performance: {
      title: 'توزيع الأداء',
      rating: 'التقييم',
      sessions: 'الجلسات',
    },
    workload: {
      title: 'عبء عمل المعلمين',
      students: 'الطلاب',
    },
    periods: {
      day: 'يوم',
      week: 'أسبوع',
      month: 'شهر',
      threeMonths: '3 أشهر',
      year: 'سنة',
    },
    noData: 'لا توجد بيانات لعرضها',
  },
  en: {
    sectionTitle: 'Overview',
    attendance: {
      title: 'Attendance Trend',
      present: 'Present',
      absent: 'Absent',
      excused: 'Excused',
      last30Days: 'Last 30 days',
    },
    departments: {
      title: 'Students by Department',
      quran: 'Quran',
      tajweed: 'Tajweed',
      tarbawi: 'Tarbawi',
    },
    performance: {
      title: 'Performance Distribution',
      rating: 'Rating',
      sessions: 'Sessions',
    },
    workload: {
      title: 'Teacher Workload',
      students: 'Students',
    },
    periods: {
      day: 'Day',
      week: 'Week',
      month: 'Month',
      threeMonths: '3 Months',
      year: 'Year',
    },
    noData: 'No data to display',
  },
};
