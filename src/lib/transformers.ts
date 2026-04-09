/**
 * Data transformation utilities for database operations
 * Handles conversion between snake_case (database) and camelCase (application)
 */

/**
 * Database row types (snake_case from Supabase)
 */
export interface DbStudentNote {
  id: string;
  student_id: string;
  type: 'إيجابي' | 'سلبي';
  content: string;
  note_date: string;
  teacher_name: string;
  created_at: string;
}

export interface DbAttendanceRecord {
  id: string;
  student_id: string | null;
  teacher_id: string | null;
  record_date: string;
  status: 'حاضر' | 'غائب' | 'مأذون';
  notes: string | null;
  created_at: string;
}

export interface DbStudent {
  id: string;
  name: string;
  age: number;
  grade: string;
  teacher_id: string;
  department: string;
  parts_memorized: number;
  current_progress: string;
  previous_progress: string;
  is_active: boolean;
  parent_name?: string;
  parent_phone?: string;
  attendance?: number;
  images?: object;
  created_at: string;
}

export interface DbTeacher {
  id: string;
  name: string;
  specialization: string;
  department: string;
  is_active: boolean;
  email?: string;
  phone?: string;
  experience?: number;
  created_at: string;
}

/**
 * Application types (camelCase)
 */
export interface StudentNote {
  id: string;
  studentId: string;
  type: 'إيجابي' | 'سلبي';
  content: string;
  noteDate: string;
  teacherName: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string | null;
  teacherId: string | null;
  recordDate: string;
  status: 'حاضر' | 'غائب' | 'مأذون';
  notes: string | null;
  createdAt: string;
}

/**
 * Transform student note from database format to application format
 */
export function transformStudentNote(dbNote: DbStudentNote): StudentNote {
  return {
    id: dbNote.id,
    studentId: dbNote.student_id,
    type: dbNote.type,
    content: dbNote.content,
    noteDate: dbNote.note_date,
    teacherName: dbNote.teacher_name,
    createdAt: dbNote.created_at,
  };
}

/**
 * Transform attendance record from database format to application format
 */
export function transformAttendanceRecord(dbRecord: DbAttendanceRecord): AttendanceRecord {
  return {
    id: dbRecord.id,
    studentId: dbRecord.student_id,
    teacherId: dbRecord.teacher_id,
    recordDate: dbRecord.record_date,
    status: dbRecord.status,
    notes: dbRecord.notes,
    createdAt: dbRecord.created_at,
  };
}

/**
 * Transform student note from application format to database format
 */
export function toDbStudentNote(note: Partial<StudentNote>): Partial<DbStudentNote> {
  return {
    ...(note.id && { id: note.id }),
    ...(note.studentId && { student_id: note.studentId }),
    ...(note.type && { type: note.type }),
    ...(note.content && { content: note.content }),
    ...(note.noteDate && { note_date: note.noteDate }),
    ...(note.teacherName && { teacher_name: note.teacherName }),
    ...(note.createdAt && { created_at: note.createdAt }),
  };
}

/**
 * Transform attendance record from application format to database format
 */
export function toDbAttendanceRecord(record: Partial<AttendanceRecord>): Partial<DbAttendanceRecord> {
  return {
    ...(record.id && { id: record.id }),
    ...(record.studentId !== undefined && { student_id: record.studentId }),
    ...(record.teacherId !== undefined && { teacher_id: record.teacherId }),
    ...(record.recordDate && { record_date: record.recordDate }),
    ...(record.status && { status: record.status }),
    ...(record.notes !== undefined && { notes: record.notes }),
    ...(record.createdAt && { created_at: record.createdAt }),
  };
}

/**
 * Transform array of student notes
 */
export function transformStudentNotes(dbNotes: DbStudentNote[]): StudentNote[] {
  return dbNotes.map(transformStudentNote);
}

/**
 * Transform array of attendance records
 */
export function transformAttendanceRecords(dbRecords: DbAttendanceRecord[]): AttendanceRecord[] {
  return dbRecords.map(transformAttendanceRecord);
}
