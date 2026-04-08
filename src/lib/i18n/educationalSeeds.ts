/**
 * Seed data for the five Educational sub-views. Previously the view files
 * hardcoded Arabic title/description/teacher/duration/verses strings, so
 * English users saw Arabic card content even after switching language.
 *
 * Dates, recording state, and IDs are locale-invariant and kept alongside
 * the localized text for convenience.
 */

import type { Language } from './types';

export interface EducationalSeedItem {
  id: string;
  title: string;
  description: string;
  teacher: string;
  date: string;
  duration: string;
  recording: 'available' | 'processing';
  verses: string;
}

export interface EducationalSeedsTranslations {
  islamicLessons: EducationalSeedItem[];
  lifeSkills: EducationalSeedItem[];
  studentActivities: EducationalSeedItem[];
  familyPrograms: EducationalSeedItem[];
  guidanceCounseling: EducationalSeedItem[];
}

export const educationalSeeds: Record<Language, EducationalSeedsTranslations> = {
  ar: {
    islamicLessons: [
      {
        id: '1',
        title: 'أصول العقيدة الإسلامية',
        description: 'درس شامل عن أصول العقيدة وأركان الإيمان',
        teacher: 'الشيخ أحمد محمد',
        date: '2025-11-15',
        duration: '45 دقيقة',
        recording: 'available',
        verses: 'البقرة 255-285',
      },
      {
        id: '2',
        title: 'فقه العبادات',
        description: 'أحكام الطهارة والصلاة والزكاة',
        teacher: 'الشيخ خالد حسن',
        date: '2025-11-08',
        duration: '60 دقيقة',
        recording: 'available',
        verses: 'المائدة 6-11',
      },
      {
        id: '3',
        title: 'سيرة النبي صلى الله عليه وسلم',
        description: 'مراحل حياة النبي والدروس المستفادة',
        teacher: 'الشيخ محمد سعيد',
        date: '2025-11-01',
        duration: '50 دقيقة',
        recording: 'processing',
        verses: 'آل عمران 144-148',
      },
    ],
    lifeSkills: [
      {
        id: '1',
        title: 'مهارات التواصل الفعال',
        description: 'تطوير مهارات التواصل مع الآخرين وفن الحوار البناء',
        teacher: 'الشيخ أحمد محمد',
        date: '2025-11-13',
        duration: '50 دقيقة',
        recording: 'available',
        verses: 'الحجرات 11-13',
      },
      {
        id: '2',
        title: 'القيادة وإدارة الفريق',
        description: 'تعليم مبادئ القيادة الإسلامية وكيفية إدارة الفرق بفعالية',
        teacher: 'الشيخ خالد حسن',
        date: '2025-11-06',
        duration: '45 دقيقة',
        recording: 'available',
        verses: 'آل عمران 159-160',
      },
      {
        id: '3',
        title: 'حل المشكلات واتخاذ القرارات',
        description: 'منهجية إسلامية في حل المشكلات واتخاذ القرارات الحكيمة',
        teacher: 'الشيخ محمد سعيد',
        date: '2025-10-30',
        duration: '40 دقيقة',
        recording: 'processing',
        verses: 'الشورى 38-43',
      },
    ],
    studentActivities: [
      {
        id: '1',
        title: 'مسابقة حفظ القرآن الكريم',
        description: 'مسابقة سنوية لحفظ وتجويد القرآن الكريم بمختلف مستوياته',
        teacher: 'الشيخ أحمد محمد',
        date: '2025-11-12',
        duration: 'يوم كامل',
        recording: 'available',
        verses: 'المزمل 1-20',
      },
      {
        id: '2',
        title: 'معسكر القيم الإسلامية',
        description: 'معسكر تربوي لتعزيز القيم الإسلامية وبناء الشخصية',
        teacher: 'الشيخ خالد حسن',
        date: '2025-11-05',
        duration: '3 أيام',
        recording: 'available',
        verses: 'الأنعام 151-153',
      },
      {
        id: '3',
        title: 'مشروع الخدمة المجتمعية',
        description: 'مشروع طلابي لخدمة المجتمع وتطبيق مبادئ الإسلام العملي',
        teacher: 'الشيخ محمد سعيد',
        date: '2025-10-29',
        duration: 'أسبوع',
        recording: 'processing',
        verses: 'البقرة 177',
      },
    ],
    familyPrograms: [
      {
        id: '1',
        title: 'برنامج الأسرة المسلمة',
        description: 'برنامج متكامل لتعزيز قيم الأسرة المسلمة وتطوير العلاقات الأسرية',
        teacher: 'الشيخ أحمد محمد',
        date: '2025-11-11',
        duration: 'ساعتان',
        recording: 'available',
        verses: 'الروم 21',
      },
      {
        id: '2',
        title: 'ورشة تربية الأبناء',
        description: 'ورشة عمل عملية لآليات تربية الأبناء في ضوء الإسلام',
        teacher: 'الشيخ خالد حسن',
        date: '2025-11-04',
        duration: '3 ساعات',
        recording: 'available',
        verses: 'الإسراء 23-25',
      },
      {
        id: '3',
        title: 'لقاءات أولياء الأمور',
        description: 'لقاءات دورية لمناقشة قضايا تربية الأبناء ومتابعتهم',
        teacher: 'الشيخ محمد سعيد',
        date: '2025-10-28',
        duration: 'ساعة ونصف',
        recording: 'processing',
        verses: 'التحريم 6',
      },
    ],
    guidanceCounseling: [
      {
        id: '1',
        title: 'جلسات إرشاد فردي',
        description: 'جلسات استشارية فردية لمساعدة الطلاب على حل مشاكلهم وتطوير أنفسهم',
        teacher: 'الشيخ أحمد محمد',
        date: '2025-11-10',
        duration: '45 دقيقة',
        recording: 'available',
        verses: 'فاطر 18',
      },
      {
        id: '2',
        title: 'ورشة بناء الثقة بالنفس',
        description: 'ورشة عمل لتعزيز ثقة الطلاب بأنفسهم وتطوير قدراتهم الشخصية',
        teacher: 'الشيخ خالد حسن',
        date: '2025-11-03',
        duration: 'ساعتان',
        recording: 'available',
        verses: 'الرعد 11',
      },
      {
        id: '3',
        title: 'استشارات تربوية',
        description: 'جلسات استشارية للآباء حول كيفية التعامل مع المراحل العمرية المختلفة',
        teacher: 'الشيخ محمد سعيد',
        date: '2025-10-27',
        duration: 'ساعة',
        recording: 'processing',
        verses: 'لقمان 17-19',
      },
    ],
  },
  en: {
    islamicLessons: [
      {
        id: '1',
        title: 'Foundations of Islamic Creed',
        description: 'A comprehensive lesson on the foundations of creed and the pillars of faith',
        teacher: 'Sheikh Ahmed Mohamed',
        date: '2025-11-15',
        duration: '45 min',
        recording: 'available',
        verses: 'Al-Baqarah 255-285',
      },
      {
        id: '2',
        title: 'Fiqh of Worship',
        description: 'Rulings of purification, prayer, and zakat',
        teacher: 'Sheikh Khaled Hassan',
        date: '2025-11-08',
        duration: '60 min',
        recording: 'available',
        verses: "Al-Ma'idah 6-11",
      },
      {
        id: '3',
        title: 'Life of the Prophet ﷺ',
        description: 'Stages of the Prophet’s life and lessons learned',
        teacher: 'Sheikh Mohamed Said',
        date: '2025-11-01',
        duration: '50 min',
        recording: 'processing',
        verses: 'Aal-Imran 144-148',
      },
    ],
    lifeSkills: [
      {
        id: '1',
        title: 'Effective Communication Skills',
        description: 'Developing communication skills and the art of constructive dialogue',
        teacher: 'Sheikh Ahmed Mohamed',
        date: '2025-11-13',
        duration: '50 min',
        recording: 'available',
        verses: 'Al-Hujurat 11-13',
      },
      {
        id: '2',
        title: 'Leadership and Team Management',
        description: 'Teaching Islamic principles of leadership and effective team management',
        teacher: 'Sheikh Khaled Hassan',
        date: '2025-11-06',
        duration: '45 min',
        recording: 'available',
        verses: 'Aal-Imran 159-160',
      },
      {
        id: '3',
        title: 'Problem Solving and Decision Making',
        description: 'An Islamic methodology for solving problems and making wise decisions',
        teacher: 'Sheikh Mohamed Said',
        date: '2025-10-30',
        duration: '40 min',
        recording: 'processing',
        verses: 'Ash-Shura 38-43',
      },
    ],
    studentActivities: [
      {
        id: '1',
        title: 'Quran Memorization Contest',
        description: 'An annual contest for memorizing and reciting the Quran at various levels',
        teacher: 'Sheikh Ahmed Mohamed',
        date: '2025-11-12',
        duration: 'Full day',
        recording: 'available',
        verses: 'Al-Muzzammil 1-20',
      },
      {
        id: '2',
        title: 'Islamic Values Camp',
        description: 'An educational camp for instilling Islamic values and character building',
        teacher: 'Sheikh Khaled Hassan',
        date: '2025-11-05',
        duration: '3 days',
        recording: 'available',
        verses: "Al-An'am 151-153",
      },
      {
        id: '3',
        title: 'Community Service Project',
        description: 'A student project for serving the community and applying Islamic principles in practice',
        teacher: 'Sheikh Mohamed Said',
        date: '2025-10-29',
        duration: '1 week',
        recording: 'processing',
        verses: 'Al-Baqarah 177',
      },
    ],
    familyPrograms: [
      {
        id: '1',
        title: 'Muslim Family Program',
        description: 'A comprehensive program to strengthen Muslim family values and relationships',
        teacher: 'Sheikh Ahmed Mohamed',
        date: '2025-11-11',
        duration: '2 hours',
        recording: 'available',
        verses: 'Ar-Rum 21',
      },
      {
        id: '2',
        title: 'Child Upbringing Workshop',
        description: 'A practical workshop on raising children in the light of Islam',
        teacher: 'Sheikh Khaled Hassan',
        date: '2025-11-04',
        duration: '3 hours',
        recording: 'available',
        verses: "Al-Isra' 23-25",
      },
      {
        id: '3',
        title: 'Parents Meetings',
        description: 'Periodic meetings to discuss child upbringing issues and follow-up',
        teacher: 'Sheikh Mohamed Said',
        date: '2025-10-28',
        duration: '1.5 hours',
        recording: 'processing',
        verses: 'At-Tahrim 6',
      },
    ],
    guidanceCounseling: [
      {
        id: '1',
        title: 'Individual Counseling Sessions',
        description: 'Private advisory sessions to help students solve problems and grow',
        teacher: 'Sheikh Ahmed Mohamed',
        date: '2025-11-10',
        duration: '45 min',
        recording: 'available',
        verses: 'Fatir 18',
      },
      {
        id: '2',
        title: 'Self-Confidence Workshop',
        description: 'A workshop to build student confidence and develop personal capacities',
        teacher: 'Sheikh Khaled Hassan',
        date: '2025-11-03',
        duration: '2 hours',
        recording: 'available',
        verses: "Ar-Ra'd 11",
      },
      {
        id: '3',
        title: 'Parental Counseling',
        description: 'Advisory sessions for parents on dealing with different age stages',
        teacher: 'Sheikh Mohamed Said',
        date: '2025-10-27',
        duration: '1 hour',
        recording: 'processing',
        verses: 'Luqman 17-19',
      },
    ],
  },
};
