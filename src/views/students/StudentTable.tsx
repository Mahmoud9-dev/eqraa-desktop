import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Student } from "./types";
import { Department } from "@/types";

interface StudentTableProps {
  filteredStudents: Student[];
  getDepartmentName: (dept: Department | string) => string;
  getAttendanceColor: (attendance: number) => string;
  openEditDialog: (student: Student) => void;
  openDeleteDialog: (student: Student) => void;
  setActiveTab: (tab: string) => void;
}

export function StudentTable({
  filteredStudents,
  getDepartmentName,
  getAttendanceColor,
  openEditDialog,
  openDeleteDialog,
  setActiveTab,
}: StudentTableProps) {
  const { t } = useLanguage();
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.students.card.studentListTitle}</CardTitle>
        <CardDescription>{t.students.card.studentListDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">
                  {t.students.table.student}
                </TableHead>
                <TableHead className="text-xs sm:text-sm hidden sm:table-cell">
                  {t.students.table.age}
                </TableHead>
                <TableHead className="text-xs sm:text-sm">
                  {t.students.table.department}
                </TableHead>
                <TableHead className="text-xs sm:text-sm hidden md:table-cell">
                  {t.students.table.teacher}
                </TableHead>
                <TableHead className="text-xs sm:text-sm hidden lg:table-cell">
                  {t.students.table.parts}
                </TableHead>
                <TableHead className="text-xs sm:text-sm hidden xl:table-cell">
                  {t.students.table.attendance}
                </TableHead>
                <TableHead className="text-xs sm:text-sm">
                  {t.students.table.status}
                </TableHead>
                <TableHead className="text-xs sm:text-sm">
                  {t.students.table.actions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="text-xs sm:text-sm">
                    <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
                      <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                        <AvatarImage src={undefined} />
                        <AvatarFallback className="text-xs sm:text-sm">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-xs sm:text-sm">
                          {student.name}
                        </div>
                        <div className="text-xs text-muted-foreground hidden sm:block">
                          {student.grade}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                    {student.age}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <Badge variant="outline" className="text-xs">
                      {getDepartmentName(student.department)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                    {student.teacher_name || ""}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                    {student.parts_memorized ?? 0}
                  </TableCell>
                  <TableCell
                    className={`text-xs sm:text-sm hidden xl:table-cell ${getAttendanceColor(
                      student.attendance ?? 0
                    )}`}
                  >
                    {student.attendance ?? 0}%
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <Badge
                      className={
                        student.is_active === 1
                          ? "bg-green-100 text-green-800 text-xs"
                          : "bg-red-100 text-red-800 text-xs"
                      }
                    >
                      {student.is_active === 1
                        ? t.students.status.active
                        : t.students.status.inactive}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <div className="flex space-x-1 space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: t.students.toast.viewDetails,
                            description: t.students.toast.viewDetailsDesc.replace(
                              "{{name}}",
                              student.name
                            ),
                          });
                          setActiveTab("images");
                        }}
                        className="text-xs px-2 py-1 h-7 sm:h-8 sm:px-3"
                      >
                        {t.students.actions.view}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(student)}
                        className="text-xs px-2 py-1 h-7 sm:h-8 sm:px-3"
                      >
                        {t.students.actions.edit}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(student)}
                        className="text-xs px-2 py-1 h-7 sm:h-8 sm:px-3"
                      >
                        {t.students.actions.delete}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
