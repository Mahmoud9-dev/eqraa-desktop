import { type StudentWithTeacher } from "@/lib/database/repositories/students";
import { Department, StudentGrade } from "@/types";

/** Local Student interface that extends SQLite data with parsed images and camelCase aliases */
export interface Student extends StudentWithTeacher {
  parsedImages?: StudentImages;
  teacherId?: string;
  partsMemorized?: number;
  currentProgress?: string;
  previousProgress?: string;
  parentName?: string;
  parentPhone?: string;
  isActive?: boolean;
  createdAt?: Date;
}

export interface StudentImages {
  new?: string;
  recent1?: string;
  recent2?: string;
  recent3?: string;
  distant1?: string;
  distant2?: string;
  distant3?: string;
}

export interface StudentNote {
  id: string;
  student_id: string;
  type: "\u0625\u064A\u062C\u0627\u0628\u064A" | "\u0633\u0644\u0628\u064A";
  content: string;
  note_date: string;
  teacher_name: string;
}

/** Form state interface (uses camelCase for form inputs) */
export interface StudentFormData {
  name: string;
  age: number;
  grade: string;
  department: Department | string;
  teacherId: string;
  partsMemorized: number;
  currentProgress: string;
  previousProgress: string;
  attendance: number;
  parentName: string;
  parentPhone: string;
  isActive: boolean;
  images?: StudentImages;
}

export type { StudentGrade };

export const EMPTY_IMAGES: StudentImages = {
  new: "",
  recent1: "",
  recent2: "",
  recent3: "",
  distant1: "",
  distant2: "",
  distant3: "",
};

export const INITIAL_FORM_DATA: StudentFormData = {
  name: "",
  age: 0,
  grade: "",
  department: "quran",
  teacherId: "",
  partsMemorized: 0,
  currentProgress: "",
  previousProgress: "",
  attendance: 0,
  parentName: "",
  parentPhone: "",
  isActive: true,
  images: { ...EMPTY_IMAGES },
};

/** Mock grades data (temporary until real grades system is built) */
export const MOCK_STUDENT_GRADES: Record<string, StudentGrade[]> = {
  "1": [
    { subject: "\u0642\u0631\u0622\u0646", grade: 85, status: "\u0645\u0645\u062A\u0627\u0632" },
    { subject: "\u062A\u062C\u0648\u064A\u062F", grade: 78, status: "\u062C\u064A\u062F \u062C\u062F\u0627\u064B" },
    { subject: "\u062A\u0631\u0628\u0648\u064A", grade: 92, status: "\u0645\u0645\u062A\u0627\u0632" },
  ],
  "2": [
    { subject: "\u0642\u0631\u0622\u0646", grade: 78, status: "\u062C\u064A\u062F \u062C\u062F\u0627\u064B" },
    { subject: "\u062A\u062C\u0648\u064A\u062F", grade: 88, status: "\u0645\u0645\u062A\u0627\u0632" },
    { subject: "\u062A\u0631\u0628\u0648\u064A", grade: 85, status: "\u0645\u0645\u062A\u0627\u0632" },
  ],
  "3": [
    { subject: "\u0642\u0631\u0622\u0646", grade: 72, status: "\u062C\u064A\u062F" },
    { subject: "\u062A\u062C\u0648\u064A\u062F", grade: 75, status: "\u062C\u064A\u062F" },
    { subject: "\u062A\u0631\u0628\u0648\u064A", grade: 88, status: "\u0645\u0645\u062A\u0627\u0632" },
  ],
};
