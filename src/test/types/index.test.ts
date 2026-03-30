import { describe, it, expect } from "vitest";
import type {
  Teacher,
  Student,
  QuranSession,
  TajweedLesson,
  EducationalContent,
  Meeting,
  Exam,
  SubjectData,
  Announcement,
  Suggestion,
  UserRole,
  Department,
  ExamType,
  Subject,
  ResourceType,
  NotificationType,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

describe("Type Definitions", () => {
  describe("Teacher Interface", () => {
    it("should validate teacher type structure", () => {
      const teacher: Teacher = {
        id: "test-teacher-id",
        name: "Test Teacher",
        specialization: "Test Specialization",
        department: "quran",
        isActive: true,
        createdAt: new Date(),
        email: "test@example.com",
        phone: "0512345678",
        experience: 5,
      };

      expect(teacher.id).toBe("test-teacher-id");
      expect(teacher.name).toBe("Test Teacher");
      expect(teacher.department).toBe("quran");
      expect(typeof teacher.isActive).toBe("boolean");
      expect(teacher.createdAt).toBeInstanceOf(Date);
    });

    it("should allow optional fields to be undefined", () => {
      const teacher: Teacher = {
        id: "test-teacher-id",
        name: "Test Teacher",
        specialization: "Test Specialization",
        department: "tajweed",
        isActive: false,
        createdAt: new Date(),
      };

      expect(teacher.email).toBeUndefined();
      expect(teacher.phone).toBeUndefined();
      expect(teacher.experience).toBeUndefined();
    });
  });

  describe("Student Interface", () => {
    it("should validate student type structure", () => {
      const student: Student = {
        id: "test-student-id",
        name: "Test Student",
        age: 12,
        grade: "6th Grade",
        teacherId: "teacher-1",
        department: "quran",
        partsMemorized: 3,
        currentProgress: "Current progress",
        previousProgress: "Previous progress",
        isActive: true,
        createdAt: new Date(),
        parentName: "Parent Name",
        parentPhone: "0512345678",
        attendance: 95,
      };

      expect(student.id).toBe("test-student-id");
      expect(student.age).toBe(12);
      expect(student.department).toBe("quran");
      expect(typeof student.partsMemorized).toBe("number");
      expect(student.attendance).toBe(95);
    });

    it("should validate age constraints", () => {
      const validStudent: Student = {
        id: "test-student-id",
        name: "Test Student",
        age: 10,
        grade: "5th Grade",
        teacherId: "teacher-1",
        department: "tarbawi",
        partsMemorized: 2,
        currentProgress: "Progress",
        previousProgress: "Previous",
        isActive: true,
        createdAt: new Date(),
      };

      expect(validStudent.age).toBeGreaterThanOrEqual(5);
      expect(validStudent.age).toBeLessThanOrEqual(25);
    });
  });

  describe("QuranSession Interface", () => {
    it("should validate quran session type structure", () => {
      const session: QuranSession = {
        id: "test-session-id",
        studentId: "student-1",
        teacherId: "teacher-1",
        date: new Date(),
        surahName: "البقرة",
        versesFrom: 1,
        versesTo: 50,
        performanceRating: 8,
        notes: "Good performance",
        attendance: true,
      };

      expect(session.id).toBe("test-session-id");
      expect(session.surahName).toBe("البقرة");
      expect(session.versesFrom).toBeLessThanOrEqual(session.versesTo);
      expect(session.performanceRating).toBeGreaterThanOrEqual(1);
      expect(session.performanceRating).toBeLessThanOrEqual(10);
    });
  });

  describe("EducationalContent Interface", () => {
    it("should validate educational content type structure", () => {
      const content: EducationalContent = {
        id: "test-content-id",
        teacherId: "teacher-1",
        category: "عقيدة",
        title: "Test Content",
        description: "Test Description",
        date: new Date(),
        attendees: ["student-1", "student-2"],
        resources: ["resource-1"],
      };

      expect(content.category).toBe("عقيدة");
      expect(Array.isArray(content.attendees)).toBe(true);
      expect(Array.isArray(content.resources)).toBe(true);
    });
  });

  describe("Exam Interface", () => {
    it("should validate exam type structure", () => {
      const exam: Exam = {
        id: "test-exam-id",
        type: "قرآن",
        title: "Test Exam",
        date: new Date(),
        duration: 60,
        totalMarks: 100,
        passingMarks: 70,
        createdBy: "teacher-1",
        isActive: true,
        createdAt: new Date(),
      };

      expect(exam.type).toBe("قرآن");
      expect(exam.duration).toBe(60);
      expect(exam.passingMarks).toBeLessThan(exam.totalMarks);
    });
  });
});

describe("Union Types", () => {
  describe("UserRole Type", () => {
    it("should accept valid user roles", () => {
      const validRoles: UserRole[] = [
        "admin",
        "teacher",
        "student",
        "parent",
        "viewer",
      ];

      validRoles.forEach((role) => {
        expect(["admin", "teacher", "student", "parent", "viewer"]).toContain(
          role
        );
      });
    });
  });

  describe("Department Type", () => {
    it("should accept valid departments", () => {
      const validDepartments: Department[] = ["quran", "tajweed", "tarbawi"];

      validDepartments.forEach((dept) => {
        expect(["quran", "tajweed", "tarbawi"]).toContain(dept);
      });
    });
  });

  describe("ExamType Type", () => {
    it("should accept valid exam types", () => {
      const validExamTypes: ExamType[] = ["قرآن", "تجويد", "تربوي"];

      validExamTypes.forEach((type) => {
        expect(["قرآن", "تجويد", "تربوي"]).toContain(type);
      });
    });
  });

  describe("Subject Type", () => {
    it("should accept valid subjects", () => {
      const validSubjects: Subject[] = [
        "عقيدة",
        "فقه",
        "سيرة",
        "تفسير",
        "حديث",
        "تربية",
        "لغة عربية",
      ];

      validSubjects.forEach((subject) => {
        expect([
          "عقيدة",
          "فقه",
          "سيرة",
          "تفسير",
          "حديث",
          "تربية",
          "لغة عربية",
        ]).toContain(subject);
      });
    });
  });

  describe("ResourceType Type", () => {
    it("should accept valid resource types", () => {
      const validResourceTypes: ResourceType[] = [
        "فيديو",
        "صوت",
        "PDF",
        "رابط",
      ];

      validResourceTypes.forEach((type) => {
        expect(["فيديو", "صوت", "PDF", "رابط"]).toContain(type);
      });
    });
  });

  describe("NotificationType Type", () => {
    it("should accept valid notification types", () => {
      const validNotificationTypes: NotificationType[] = [
        "إعلان عام",
        "تنبيه",
        "موعد حلقة",
        "موعد اختبار",
      ];

      validNotificationTypes.forEach((type) => {
        expect(["إعلان عام", "تنبيه", "موعد حلقة", "موعد اختبار"]).toContain(
          type
        );
      });
    });
  });
});

describe("Utility Types", () => {
  describe("ApiResponse Type", () => {
    it("should validate API response structure", () => {
      const successResponse: ApiResponse<string> = {
        data: "Success data",
        success: true,
        message: "Operation successful",
      };

      const errorResponse: ApiResponse<null> = {
        data: null,
        success: false,
        error: "Error message",
      };

      expect(successResponse.success).toBe(true);
      expect(successResponse.data).toBe("Success data");
      expect(errorResponse.success).toBe(false);
      expect(errorResponse.error).toBe("Error message");
    });
  });

  describe("PaginatedResponse Type", () => {
    it("should validate paginated response structure", () => {
      const paginatedResponse: PaginatedResponse<Teacher> = {
        data: [
          {
            id: "teacher-1",
            name: "Teacher 1",
            specialization: "Spec 1",
            department: "quran",
            isActive: true,
            createdAt: new Date(),
          },
        ],
        total: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      };

      expect(Array.isArray(paginatedResponse.data)).toBe(true);
      expect(paginatedResponse.total).toBe(1);
      expect(paginatedResponse.page).toBe(1);
      expect(paginatedResponse.pageSize).toBe(10);
      expect(paginatedResponse.totalPages).toBe(1);
    });
  });
});

describe("Type Guards and Validators", () => {
  describe("isTeacher function", () => {
    it("should validate teacher objects", () => {
      const validTeacher = {
        id: "teacher-1",
        name: "Test Teacher",
        specialization: "Test",
        department: "quran" as Department,
        isActive: true,
        createdAt: new Date(),
      };

      const invalidTeacher = {
        id: "teacher-1",
        name: "Test Teacher",
        // Missing required fields
      };

      // Type guard function
      const isTeacher = (obj: any): obj is Teacher => {
        return (
          obj &&
          typeof obj.id === "string" &&
          typeof obj.name === "string" &&
          typeof obj.specialization === "string" &&
          ["quran", "tajweed", "tarbawi"].includes(obj.department) &&
          typeof obj.isActive === "boolean" &&
          obj.createdAt instanceof Date
        );
      };

      expect(isTeacher(validTeacher)).toBe(true);
      expect(isTeacher(invalidTeacher)).toBe(false);
    });
  });

  describe("isStudent function", () => {
    it("should validate student objects", () => {
      const validStudent = {
        id: "student-1",
        name: "Test Student",
        age: 12,
        grade: "6th",
        teacherId: "teacher-1",
        department: "quran" as Department,
        partsMemorized: 3,
        currentProgress: "Progress",
        previousProgress: "Previous",
        isActive: true,
        createdAt: new Date(),
      };

      const isStudent = (obj: any): obj is Student => {
        return (
          obj &&
          typeof obj.id === "string" &&
          typeof obj.name === "string" &&
          typeof obj.age === "number" &&
          obj.age >= 5 &&
          obj.age <= 25 &&
          typeof obj.grade === "string" &&
          typeof obj.teacherId === "string" &&
          ["quran", "tajweed", "tarbawi"].includes(obj.department) &&
          typeof obj.partsMemorized === "number" &&
          typeof obj.currentProgress === "string" &&
          typeof obj.previousProgress === "string" &&
          typeof obj.isActive === "boolean" &&
          obj.createdAt instanceof Date
        );
      };

      expect(isStudent(validStudent)).toBe(true);
    });
  });
});
