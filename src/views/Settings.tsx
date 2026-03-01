import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { exportDatabase, importDatabase } from "@/lib/database/backup";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const success = await exportDatabase();
      if (success) {
        toast({
          title: t.settings.toasts.backupSuccess,
          description: t.settings.toasts.backupSuccessDescription,
        });
      }
    } catch {
      toast({
        title: t.settings.toasts.backupError,
        description: t.settings.toasts.backupErrorDescription,
        variant: "destructive",
      });
    }
    setIsExporting(false);
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      const success = await importDatabase();
      if (success) {
        toast({
          title: t.settings.toasts.restoreSuccess,
          description: t.settings.toasts.restoreSuccessDescription,
        });
      }
    } catch {
      toast({
        title: t.settings.toasts.restoreError,
        description: t.settings.toasts.restoreErrorDescription,
        variant: "destructive",
      });
    }
    setIsImporting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.settings.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t.settings.heading}</h2>
          <p className="text-muted-foreground mb-6">
            {t.settings.headingDescription}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings">{t.settings.tabs.settings}</TabsTrigger>
            <TabsTrigger value="system">{t.settings.tabs.system}</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings.generalSettings.title}</CardTitle>
                <CardDescription>{t.settings.generalSettings.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="theme">{t.settings.theme.label}</Label>
                    <Select
                      value={theme || "light"}
                      onValueChange={(value) => setTheme(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">{t.settings.theme.light}</SelectItem>
                        <SelectItem value="dark">{t.settings.theme.dark}</SelectItem>
                        <SelectItem value="system">{t.settings.theme.system}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">{t.settings.language.label}</Label>
                    <Select
                      value={language}
                      onValueChange={(value) => {
                        if (value !== language) toggleLanguage();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">{t.settings.language.arabic}</SelectItem>
                        <SelectItem value="en">{t.settings.language.english}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.settings.system.info.title}</CardTitle>
                  <CardDescription>{t.settings.system.info.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.settings.system.info.version}</span>
                    <span>0.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.settings.system.info.environment}</span>
                    <span>{t.settings.system.info.environmentValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.settings.system.info.database}</span>
                    <span>SQLite</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.settings.system.backup.title}</CardTitle>
                  <CardDescription>
                    {t.settings.system.backup.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleExport}
                      disabled={isExporting}
                    >
                      {isExporting ? "..." : t.settings.system.backup.createNow}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleImport}
                      disabled={isImporting}
                    >
                      {isImporting ? "..." : t.settings.system.backup.restore}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
