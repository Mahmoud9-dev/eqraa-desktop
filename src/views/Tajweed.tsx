import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";
import { getTajweedLessons, addTajweedLesson, type TajweedLesson } from "@/lib/database/repositories/tajweed";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/i18n";

const Tajweed = () => {
  const [lessons, setLessons] = useState<TajweedLesson[]>([]);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, languageMeta } = useLanguage();

  const loadLessons = async () => {
    try {
      const data = await getTajweedLessons();
      setLessons(data);
    } catch {
      // silently handle
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadLessons();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !description) return;

    setIsLoading(true);
    try {
      await addTajweedLesson({ topic, description });
      toast({ title: t.tajweed.toast.addLessonSuccess });
      setTopic("");
      setDescription("");
      loadLessons();
    } catch {
      toast({ title: t.tajweed.toast.addLessonError, variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.tajweed.pageTitle} />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{t.tajweed.lessonForm.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.tajweed.lessonForm.topic}</label>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={t.tajweed.lessonForm.topicPlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.tajweed.lessonForm.description}</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.tajweed.lessonForm.descriptionPlaceholder}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? t.tajweed.lessonForm.submitting : t.tajweed.lessonForm.submit}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="bg-card p-8 rounded-xl shadow-[var(--shadow-soft)] border border-border">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-semibold mb-4 text-primary">{t.tajweed.rulesPanel.title}</h3>
            <p className="text-muted-foreground mb-6">{t.tajweed.rulesPanel.subtitle}</p>
            <div className="space-y-3">
              <div className="p-4 bg-accent/30 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">{t.tajweed.rulesPanel.noonSakinah.name}</h4>
                <p className="text-sm text-muted-foreground">{t.tajweed.rulesPanel.noonSakinah.description}</p>
              </div>
              <div className="p-4 bg-accent/30 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">{t.tajweed.rulesPanel.madd.name}</h4>
                <p className="text-sm text-muted-foreground">{t.tajweed.rulesPanel.madd.description}</p>
              </div>
              <div className="p-4 bg-accent/30 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">{t.tajweed.rulesPanel.letterAttributes.name}</h4>
                <p className="text-sm text-muted-foreground">{t.tajweed.rulesPanel.letterAttributes.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-primary mb-6">{t.tajweed.lessonList.title}</h3>
          {lessons.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                {t.tajweed.lessonList.empty}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessons.map((lesson) => (
                <Card key={lesson.id} className="border-r-4 border-r-primary">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-2">{lesson.topic}</h4>
                    <p className="text-muted-foreground mb-2">{lesson.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {lesson.lesson_date ? formatDate(lesson.lesson_date, languageMeta.code) : t.tajweed.lessonList.noDate}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Tajweed;
