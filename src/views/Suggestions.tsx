import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";
import { getSuggestions, addSuggestion, updateSuggestionStatus } from "@/lib/database/repositories/suggestions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface SuggestionItem {
  id: string;
  title: string;
  description: string;
  status: "تم" | "لم يتم";
  suggested_by: string | null;
  priority: string;
  created_at: string;
}

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [suggestedBy, setSuggestedBy] = useState("");
  const [priority, setPriority] = useState<"عالي" | "متوسط" | "منخفض">("متوسط");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const loadSuggestions = async () => {
    try {
      const data = await getSuggestions();
      setSuggestions(data as SuggestionItem[]);
    } catch {
      toast({ title: t.suggestions.toast.loadError, variant: "destructive" });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSuggestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsLoading(true);
    try {
      await addSuggestion({
        title,
        description,
        suggested_by: suggestedBy || undefined,
        priority,
        status: "لم يتم",
      });
      toast({ title: t.suggestions.toast.addSuccess });
      setTitle("");
      setDescription("");
      setSuggestedBy("");
      setPriority("متوسط");
      loadSuggestions();
    } catch {
      toast({ title: t.suggestions.toast.addError, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleUpdateStatus = async (id: string, newStatus: "تم" | "لم يتم") => {
    try {
      await updateSuggestionStatus(id, newStatus);
      toast({ title: t.suggestions.toast.updateStatusSuccess });
      loadSuggestions();
    } catch {
      toast({ title: t.suggestions.toast.updateStatusError, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.suggestions.pageTitle} />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{t.suggestions.form.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.suggestions.form.suggestionTitle}</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t.suggestions.form.titlePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.suggestions.form.details}</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.suggestions.form.detailsPlaceholder}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.suggestions.form.submitter}</label>
                  <Input
                    value={suggestedBy}
                    onChange={(e) => setSuggestedBy(e.target.value)}
                    placeholder={t.suggestions.form.submitterPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.suggestions.form.priority}</label>
                  <Select value={priority} onValueChange={(v) => setPriority(v as "عالي" | "متوسط" | "منخفض")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="عالي">{t.suggestions.priorityLabels['عالي']}</SelectItem>
                      <SelectItem value="متوسط">{t.suggestions.priorityLabels['متوسط']}</SelectItem>
                      <SelectItem value="منخفض">{t.suggestions.priorityLabels['منخفض']}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? t.suggestions.form.submitting : t.suggestions.form.submit}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-4">{t.suggestions.list.title}</h3>
            {suggestions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  {t.suggestions.list.empty}
                </CardContent>
              </Card>
            ) : (
              suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border-r-4 border-r-primary">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg">{suggestion.title}</h4>
                      <Badge variant={suggestion.priority === "عالي" ? "destructive" : "secondary"}>
                        {suggestion.priority ? t.suggestions.priorityLabels[suggestion.priority as keyof typeof t.suggestions.priorityLabels] : ''}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{suggestion.description}</p>
                    {suggestion.suggested_by && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {t.suggestions.list.submittedBy} {suggestion.suggested_by}
                      </p>
                    )}
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant={suggestion.status === "تم" ? "default" : "outline"}
                        onClick={() => handleUpdateStatus(suggestion.id, "تم")}
                      >
                        {t.suggestions.statusLabels['تم']}
                      </Button>
                      <Button
                        size="sm"
                        variant={suggestion.status === "لم يتم" ? "default" : "outline"}
                        onClick={() => handleUpdateStatus(suggestion.id, "لم يتم")}
                      >
                        {t.suggestions.statusLabels['لم يتم']}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Suggestions;
