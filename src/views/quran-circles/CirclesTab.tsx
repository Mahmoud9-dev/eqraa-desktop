import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import type { UseQuranCirclesReturn } from "./useQuranCircles";

interface CirclesTabProps {
  hook: UseQuranCirclesReturn;
}

export function CirclesTab({ hook }: CirclesTabProps) {
  const {
    qc,
    filteredCircles: circles,
    teachers,
    getCircleMembers,
    openEditCircleDialog,
    openDeleteCircleDialog,
  } = hook;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{qc.circleList.title}</CardTitle>
        <CardDescription>{qc.circleList.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {circles.map((circle) => (
            <div key={circle.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-sm leading-tight">
                  {circle.name}
                </h4>
                <Badge
                  className={`text-xs shrink-0 ${
                    circle.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {circle.isActive ? qc.status.active : qc.status.inactive}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {qc.circleCard.supervisor}{" "}
                {teachers[circle.supervisorId] ?? "—"}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-muted rounded">
                  <span className="text-muted-foreground">
                    {qc.circleCard.dailyMemorization}
                  </span>
                  <div className="font-medium">
                    {circle.dailyMemorization}
                  </div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="text-muted-foreground">
                    {qc.circleCard.dailyRevision}
                  </span>
                  <div className="font-medium">{circle.dailyRevision}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {qc.circleCard.memberCount}{" "}
                {getCircleMembers(circle.id).length}
              </div>
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => openEditCircleDialog(circle)}
                >
                  {qc.actions.view}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => openEditCircleDialog(circle)}
                >
                  {qc.actions.edit}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => openDeleteCircleDialog(circle)}
                >
                  {qc.actions.delete}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{qc.tableHeaders.circleName}</TableHead>
                <TableHead>{qc.tableHeaders.supervisor}</TableHead>
                <TableHead className="hidden lg:table-cell">
                  {qc.tableHeaders.dailyMemorization}
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  {qc.tableHeaders.dailyRevision}
                </TableHead>
                <TableHead>{qc.tableHeaders.memberCount}</TableHead>
                <TableHead>{qc.tableHeaders.status}</TableHead>
                <TableHead>{qc.tableHeaders.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {circles.map((circle) => (
                <TableRow key={circle.id}>
                  <TableCell className="font-medium max-w-[150px] truncate">
                    {circle.name}
                  </TableCell>
                  <TableCell>
                    {teachers[circle.supervisorId] ?? "—"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {circle.dailyMemorization}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {circle.dailyRevision}
                  </TableCell>
                  <TableCell>
                    {getCircleMembers(circle.id).length}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        circle.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {circle.isActive
                        ? qc.status.active
                        : qc.status.inactive}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-2"
                        onClick={() => openEditCircleDialog(circle)}
                      >
                        {qc.actions.view}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-2"
                        onClick={() => openEditCircleDialog(circle)}
                      >
                        {qc.actions.edit}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="text-xs px-2"
                        onClick={() => openDeleteCircleDialog(circle)}
                      >
                        {qc.actions.delete}
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
