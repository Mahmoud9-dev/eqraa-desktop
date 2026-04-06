import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/i18n";
import type { UseQuranCirclesReturn } from "./useQuranCircles";

interface MembersTabProps {
  hook: UseQuranCirclesReturn;
}

export function MembersTab({ hook }: MembersTabProps) {
  const {
    qc,
    language,
    circles,
    teachers,
    students,
    getCircleMembers,
  } = hook;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {circles.map((circle) => (
        <Card key={circle.id}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 space-x-reverse">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback>
                  {circle.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div>{circle.name}</div>
                <div className="text-sm text-muted-foreground">
                  {teachers[circle.supervisorId]}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">
                  {qc.members.sectionTitle}
                </h4>
                <div className="space-y-2">
                  {getCircleMembers(circle.id).map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 shrink-0">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-xs">
                            {students[member.studentId]
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">
                            {students[member.studentId]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {qc.members.joinedPrefix}{" "}
                            {formatDate(member.joinDate, language)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 sm:flex-none text-xs"
                        >
                          {qc.actions.edit}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1 sm:flex-none text-xs"
                        >
                          {qc.actions.delete}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
