import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ATS from "./pages/ATS";
import Jobs from "./pages/Jobs";
import Learning from "./pages/Learning";
import Interview from "./pages/Interview";
import Suggestions from "./pages/Suggestions";
import Report from "./pages/Report";
import JobAnalyzer from "./pages/JobAnalyzer";
import JobDescription from "./pages/JobDescription";
import ResumeDashboard from "./pages/ResumeDashboard";
import Chatbot from "./pages/Chatbot";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/ats" element={<ATS />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/report" element={<Report />} />
        <Route path="/job-analyzer" element={<JobAnalyzer />} />
        <Route path="/job-description" element={<JobDescription />} />
        <Route path="/resume-dashboard" element={<ResumeDashboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;