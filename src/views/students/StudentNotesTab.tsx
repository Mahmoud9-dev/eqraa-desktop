import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Student, type StudentNote } from "./types";

interface StudentNotesTabProps {
  filteredStudents: Student[];
  studentsNotes: Record<string, StudentNote[]>;
  getNoteTypeColor: (type: string) => string;
  handleDeleteNote: (studentId: string, noteId: string) => void;
  openAddNoteDialog: (student: Student) => void;
  openEditNoteDialog: (student: Student, note: StudentNote) => void;
}

export function StudentNotesTab({
  filteredStudents,
  studentsNotes,
  getNoteTypeColor,
  handleDeleteNote,
  openAddNoteDialog,
  openEditNoteDialog,
}: StudentNotesTabProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.students.notes.supervisorNotes}</CardTitle>
        <CardDescription>{t.students.notes.supervisorNotesDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">{student.name}</h3>
              {(studentsNotes[student.id] || []).length > 0 ? (
                <div className="space-y-2">
                  {studentsNotes[student.id].map((note) => (
                    <div
                      key={note.id}
                      className="flex items-start justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getNoteTypeColor(note.type)}>
                            {note.type === "\u0625\u064A\u062C\u0627\u0628\u064A"
                              ? t.students.notes.positive
                              : t.students.notes.negative}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {note.note_date} {"\u2022"} {note.teacher_name}
                          </span>
                        </div>
                        <p>{note.content}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditNoteDialog(student, note)}
                        >
                          {t.students.actions.edit}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteNote(student.id, note.id)}
                        >
                          {t.students.actions.delete}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  {t.students.notes.noNotesForStudent}
                </p>
              )}
              <Button
                variant="outline"
                className="mt-3"
                onClick={() => openAddNoteDialog(student)}
              >
                {t.students.actions.addNewNote}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
