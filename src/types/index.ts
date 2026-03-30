/**
 * Core data models for Eqraa Center Islamic Educational Management System
 * Following TypeScript best practices with comprehensive type safety
 */

// Department types
export type Department = "quran" | "tajweed" | "tarbawi";

// Status types
export type SuggestionStatus = "تم" | "لم يتم";
export type Priority = "عالي" | "متوسط" | "منخفض";

// User role types
export type UserRole = "admin" | "teacher" | "student" | "parent" | "viewer";

// Exam types
export type ExamType = "قرآن" | "تجويد" | "تربوي";

// Subject types
export type Subject =
  | "عقيدة"
  | "فقه"
  | "سيرة"
  | "تفسير"
  | "حديث"
  | "تربية"
  | "لغة عربية";

// Resource types
export type ResourceType = "فيديو" | "صوت" | "PDF" | "رابط";

// Notification types
export type NotificationType =
  | "إعلان عام"
  | "تنبيه"
  | "موعد حلقة"
  | "موعد اختبار";

/**
 * Teacher interface
 * Represents instructors in various Islamic educational departments
 */
export interface Teacher {
  id: string;
  name: string;
  specialization: string;
  department: Department;
  isActive: boolean;
  createdAt: Date;
  email?: string;
  phone?: string;
  experience?: number;
}

/**
 * Student images interface
 * Represents multiple Quran memorization images for tracking student progress
 * All properties are optional since images may be added incrementally
 */
export interface StudentImages {
  new?: string;
  recent1?: string;
  recent2?: string;
  recent3?: string;
  distant1?: string;
  distant2?: string;
  distant3?: string;
}

/**
 * Student interface
 * Represents students enrolled in Quran memorization and Islamic education programs
 */
export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  teacherId: string;
  department: Department;
  partsMemorized: number;
  currentProgress: string;
  previousProgress: string;
  isActive: boolean;
  createdAt: Date;
  parentName?: string;
  parentPhone?: string;
  attendance?: number;
  images?: StudentImages;
}

/**
 * Suggestion interface
 * Represents suggestions and proposals from teachers or administrators
 */
export interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: SuggestionStatus;
  createdAt: Date;
  suggestedBy?: string;
  priority?: Priority;
}

/**
 * Quran session interface
 * Tracks Quran memorization sessions and student progress
 */
export interface QuranSession {
  id: string;
  studentId: string;
  teacherId: string;
  date: Date;
  surahName: string;
  versesFrom: number;
  versesTo: number;
  performanceRating: number;
  notes?: string;
  attendance: boolean;
}

/**
 * Tajweed lesson interface
 * Tracks Tajweed theory lessons and rules taught
 */
export interface TajweedLesson {
  id: string;
  teacher_id?: string | null;
  lesson_date?: string | null;
  topic: string;
  description: string;
  attendees?: string[] | null;
  resources?: string[] | null;
  created_at?: string | null;
}

/**
 * Educational content interface
 * Represents Tarbawi (educational) content including Aqeedah, Seerah, Fiqh, etc.
 */
export interface EducationalContent {
  id: string;
  teacherId: string;
  category: "عقيدة" | "سيرة" | "فقه" | "أخلاقيات" | "آداب" | "مواعظ عامة";
  title: string;
  description: string;
  date: Date;
  attendees?: string[];
  resources?: string[];
}

/**
 * Meeting interface
 * Tracks administrative and organizational meetings
 */
export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: Date;
  attendees: string[];
  agenda?: string[];
  notes?: string;
  status: "مجدولة" | "مكتملة" | "ملغاة";
}

/**
 * Behavioral note interface
 * Tracks student behavior (positive and negative)
 */
export interface BehavioralNote {
  id: string;
  studentId: string;
  teacherId: string;
  type: "إيجابي" | "سلبي";
  description: string;
  date: Date;
  resolved: boolean;
  resolution?: string;
}

/**
 * Exam interface
 * Represents exams for Quran, Tajweed, and Tarbawi evaluation
 */
export interface Exam {
  id: string;
  type: ExamType;
  title: string;
  description?: string;
  date: Date;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  createdBy: string;
  isActive: boolean;
  createdAt: Date;
}

/**
 * Exam result interface
 * Tracks student performance in exams
 */
export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  marks: number;
  percentage: number;
  status: "ناجح" | "راسب" | "غائب";
  notes?: string;
  evaluatedBy: string;
  evaluatedAt: Date;
}

/**
 * Subject interface
 * Represents Islamic educational subjects
 */
export interface SubjectData {
  id: string;
  name: Subject;
  description?: string;
  teacherId: string;
  isActive: boolean;
  createdAt: Date;
}

/**
 * Lesson interface
 * Represents lessons within subjects
 */
export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  type: ResourceType;
  contentUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
}

/**
 * Assignment interface
 * Represents homework and assignments
 */
export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: Date;
  totalMarks: number;
  isActive: boolean;
  createdAt: Date;
}

/**
 * Schedule interface
 * Represents class schedules and timetables
 */
export interface Schedule {
  id: string;
  title: string;
  description?: string;
  dayOfWeek: number; // 0-6 (Sunday to Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  location?: string;
  teacherId: string;
  subjectId?: string;
  isActive: boolean;
  createdAt: Date;
}

/**
 * Quran circle interface
 * Represents Quran memorization circles
 */
export interface QuranCircle {
  id: string;
  name: string;
  supervisorId: string;
  description?: string;
  dailyMemorization: string;
  dailyRevision: string;
  weeklyEvaluation: string;
  isActive: boolean;
  createdAt: Date;
}

/**
 * Circle member interface
 * Represents students in Quran circles
 */
export interface CircleMember {
  id: string;
  circleId: string;
  studentId: string;
  joinDate: Date;
  isActive: boolean;
}

/**
 * Memorization record interface
 * Tracks student memorization progress
 */
export interface MemorizationRecord {
  id: string;
  studentId: string;
  circleId: string;
  date: Date;
  surahName: string;
  versesFrom: number;
  versesTo: number;
  memorizationType: "حفظ جديد" | "مراجعة";
  evaluation: number; // 1-10
  notes?: string;
  evaluatedBy: string;
}

/**
 * Announcement interface
 * Represents announcements and notifications
 */
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  targetAudience: UserRole[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  scheduledFor?: Date;
}

/**
 * Library resource interface
 * Represents resources in the digital library
 */
export interface LibraryResource {
  id: string;
  title: string;
  author?: string;
  description?: string;
  type: ResourceType;
  category: string;
  url?: string;
  isActive: boolean;
  createdAt: Date;
}

/**
 * User settings interface
 * Represents user preferences and settings
 */
export interface UserSettings {
  id: string;
  userId: string;
  theme: "فاتح" | "داكن";
  language: "ar" | "en";
  updatedAt: Date;
}

/**
 * Student note interface
 * Represents notes/observations about student behavior or performance
 */
export interface StudentNote {
  id: string;
  type: "إيجابي" | "سلبي";
  content: string;
  date: string;
  teacher: string;
}

/**
 * Student grade interface
 * Represents a student's grade in a subject
 */
export interface StudentGrade {
  subject: string;
  grade: number;
  status: string;
}

// Utility types for API responses
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form data types
export type CreateTeacherInput = Omit<Teacher, "id" | "createdAt">;
export type UpdateTeacherInput = Partial<CreateTeacherInput>;

export type CreateStudentInput = Omit<Student, "id" | "createdAt">;
export type UpdateStudentInput = Partial<CreateStudentInput>;

export type CreateSuggestionInput = Omit<Suggestion, "id" | "createdAt">;
export type UpdateSuggestionInput = Partial<CreateSuggestionInput>;
