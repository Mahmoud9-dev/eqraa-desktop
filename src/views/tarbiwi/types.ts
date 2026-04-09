export interface ProgramFormData {
  title: string;
  description: string;
  dayOfWeek: number;
  time: string;
  duration: number;
  targetAge: string;
  isActive: boolean;
}

export interface AssignmentFormData {
  title: string;
  description: string;
  type: string;
  dueDate: Date;
  targetAge: string;
  points: number;
  isActive: boolean;
}

export interface AssessmentFormData {
  studentId: string;
  date: Date;
  criteria: string;
  rating: number;
  notes: string;
  evaluatedBy: string;
}

export interface Assessment {
  id: string;
  studentId: string;
  date: Date;
  criteria: string;
  rating: number;
  notes: string;
  evaluatedBy: string;
}
