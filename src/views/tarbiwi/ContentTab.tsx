import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, type Language } from "@/lib/i18n";
import { ARTICLES, VIDEOS } from "./useTarbiwi";

interface ContentTabProps {
  language: Language;
  tb: Record<string, unknown>;
}

export function ContentTab({ language, tb }: ContentTabProps) {
  const content = (tb.content ?? {}) as Record<string, unknown>;
  const articles = (content.articles ?? {}) as Record<string, string>;
  const videos = (content.videos ?? {}) as Record<string, string>;
  const programs = (tb.programs ?? {}) as Record<string, string>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{articles.cardTitle}</CardTitle>
          <CardDescription>{articles.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ARTICLES.map((article, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{article.title}</h4>
                <div className="text-sm text-muted-foreground mb-2">
                  {article.excerpt}
                </div>
                <div className="text-xs text-muted-foreground">
                  {articles.publishedPrefix} {formatDate(article.date, language)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{videos.cardTitle}</CardTitle>
          <CardDescription>{videos.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {VIDEOS.map((video, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{video.title}</h4>
                <div className="text-sm text-muted-foreground mb-2">
                  {video.description}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    {videos.durationPrefix} {video.duration} {programs.minuteUnit}
                  </div>
                  <Button variant="outline" size="sm">
                    {videos.watchButton}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
