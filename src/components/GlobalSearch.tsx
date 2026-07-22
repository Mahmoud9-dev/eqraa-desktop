import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useLanguage } from "@/contexts/LanguageContext";
import { getStudents, type Student } from "@/lib/database/repositories/students";
import { getTeachers, type Teacher } from "@/lib/database/repositories/teachers";
import { getDepartmentLabel } from "@/lib/labels";
import { logger } from "@/lib/logger";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!open || isLoaded) return;
    Promise.all([getStudents(), getTeachers()])
      .then(([studentsData, teachersData]) => {
        setStudents(studentsData);
        setTeachers(teachersData);
        setIsLoaded(true);
      })
      .catch((err: unknown) => logger.error("Failed to load global search data:", err));
  }, [open, isLoaded]);

  const goTo = useCallback(
    (path: string, name: string) => {
      onOpenChange(false);
      navigate(path, { state: { searchTerm: name } });
    },
    [navigate, onOpenChange]
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t.header.searchPlaceholder} />
      <CommandList>
        <CommandEmpty>{t.header.searchEmpty}</CommandEmpty>
        {students.length > 0 && (
          <CommandGroup heading={t.header.searchStudents}>
            {students.map((student) => (
              <CommandItem
                key={student.id}
                value={student.name}
                onSelect={() => goTo("/students", student.name)}
              >
                <span>{student.name}</span>
                <span className="ms-2 text-xs text-muted-foreground">
                  {student.grade} · {getDepartmentLabel(student.department, t)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {teachers.length > 0 && (
          <CommandGroup heading={t.header.searchTeachers}>
            {teachers.map((teacher) => (
              <CommandItem
                key={teacher.id}
                value={teacher.name}
                onSelect={() => goTo("/teachers", teacher.name)}
              >
                <span>{teacher.name}</span>
                <span className="ms-2 text-xs text-muted-foreground">
                  {teacher.specialization}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
