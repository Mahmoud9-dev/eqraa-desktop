import { Routes, Route } from "react-router-dom";
import Index from "@/views/Index";
import Admin from "@/views/Admin";
import Students from "@/views/Students";
import Teachers from "@/views/Teachers";
import Quran from "@/views/Quran";
import QuranCircles from "@/views/QuranCircles";
import Tajweed from "@/views/Tajweed";
import Educational from "@/views/Educational";
import EducationalEthicsBehavior from "@/views/EducationalEthicsBehavior";
import EducationalFamilyPrograms from "@/views/EducationalFamilyPrograms";
import EducationalGuidanceCounseling from "@/views/EducationalGuidanceCounseling";
import EducationalIslamicLessons from "@/views/EducationalIslamicLessons";
import EducationalLifeSkills from "@/views/EducationalLifeSkills";
import EducationalStudentActivities from "@/views/EducationalStudentActivities";
import Exams from "@/views/Exams";
import Subjects from "@/views/Subjects";
import Schedule from "@/views/Schedule";
import Attendance from "@/views/Attendance";
import Meetings from "@/views/Meetings";
import Suggestions from "@/views/Suggestions";
import Announcements from "@/views/Announcements";
import Library from "@/views/Library";
import Settings from "@/views/Settings";
import Tarbiwi from "@/views/Tarbiwi";
import NotFound from "@/views/NotFound";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/students" element={<Students />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/quran" element={<Quran />} />
      <Route path="/quran-circles" element={<QuranCircles />} />
      <Route path="/tajweed" element={<Tajweed />} />
      <Route path="/educational" element={<Educational />} />
      <Route path="/educational/ethics-behavior" element={<EducationalEthicsBehavior />} />
      <Route path="/educational/family-programs" element={<EducationalFamilyPrograms />} />
      <Route path="/educational/guidance-counseling" element={<EducationalGuidanceCounseling />} />
      <Route path="/educational/islamic-lessons" element={<EducationalIslamicLessons />} />
      <Route path="/educational/life-skills" element={<EducationalLifeSkills />} />
      <Route path="/educational/student-activities" element={<EducationalStudentActivities />} />
      <Route path="/exams" element={<Exams />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/meetings" element={<Meetings />} />
      <Route path="/suggestions" element={<Suggestions />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/library" element={<Library />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/tarbiwi" element={<Tarbiwi />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
