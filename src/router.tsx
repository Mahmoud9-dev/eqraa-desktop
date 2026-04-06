import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "@/views/Index";
import NotFound from "@/views/NotFound";
import LoadingFallback from "@/components/LoadingFallback";

const Admin = lazy(() => import("@/views/Admin"));
const Students = lazy(() => import("@/views/Students"));
const Teachers = lazy(() => import("@/views/Teachers"));
const Quran = lazy(() => import("@/views/Quran"));
const QuranCircles = lazy(() => import("@/views/QuranCircles"));
const Tajweed = lazy(() => import("@/views/Tajweed"));
const Educational = lazy(() => import("@/views/Educational"));
const EducationalEthicsBehavior = lazy(() => import("@/views/EducationalEthicsBehavior"));
const EducationalFamilyPrograms = lazy(() => import("@/views/EducationalFamilyPrograms"));
const EducationalGuidanceCounseling = lazy(() => import("@/views/EducationalGuidanceCounseling"));
const EducationalIslamicLessons = lazy(() => import("@/views/EducationalIslamicLessons"));
const EducationalLifeSkills = lazy(() => import("@/views/EducationalLifeSkills"));
const EducationalStudentActivities = lazy(() => import("@/views/EducationalStudentActivities"));
const Exams = lazy(() => import("@/views/Exams"));
const Subjects = lazy(() => import("@/views/Subjects"));
const Schedule = lazy(() => import("@/views/Schedule"));
const Attendance = lazy(() => import("@/views/Attendance"));
const Meetings = lazy(() => import("@/views/Meetings"));
const Suggestions = lazy(() => import("@/views/Suggestions"));
const Announcements = lazy(() => import("@/views/Announcements"));
const Library = lazy(() => import("@/views/Library"));
const Settings = lazy(() => import("@/views/Settings"));
const Tarbiwi = lazy(() => import("@/views/Tarbiwi"));

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
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
    </Suspense>
  );
}
