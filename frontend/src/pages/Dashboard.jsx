import {
  FaFileUpload,
  FaChartLine,
  FaClipboardCheck,
  FaBook,
  FaUserTie,
  FaSignOutAlt,
  FaUserCircle,
  FaLightbulb,
  FaFileAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("analysis");
    localStorage.removeItem("resume_path");

    navigate("/");

  };

  return (

    <div className="container-fluid p-0">

      <div className="row g-0">

        {/* Sidebar */}

        <div
          className="col-md-3 col-lg-2 bg-dark text-white"
          style={{ minHeight: "100vh" }}
        >

          <div className="p-4">

            <h3 className="text-center mb-4">
              AI Recruit
            </h3>

            <hr />

            <div
              className="py-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              🏠 Dashboard
            </div>

            <div
              className="py-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/upload")}
            >
              📄 Resume Upload
            </div>

            <div
              className="py-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/ats")}
            >
              📊 ATS Score
            </div>

            <div
              className="py-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/job-analyzer")}
            >
              📝 Resume vs Job Description
            </div>

            <div
              className="py-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/learning")}
            >
              📚 Learning Recommendation
            </div>

            <div
              className="py-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/interview")}
            >
              🎤 Mock Interview
            </div>

            <div
              className="py-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/suggestions")}
            >
              💡 Resume Suggestions
            </div>

            <div
              className="py-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/report")}
            >
              📄 AI Candidate Report
            </div>

            <hr />

            <button
              className="btn btn-danger w-100"
              onClick={logout}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </button>

          </div>

        </div>

        {/* Main Content */}

        <div className="col-md-9 col-lg-10">

          {/* Header */}

          <div className="bg-primary text-white shadow p-4">

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h2>
                  AI Recruitment & Candidate Preparation System
                </h2>

                <small>
                  Welcome Back!
                </small>

              </div>

              <div className="text-center">

                <FaUserCircle size={45} />

                <div>
                  <strong>{user?.full_name}</strong>
                </div>

                <small>{user?.role}</small>

              </div>

            </div>

          </div>

          <div className="container mt-4">
                        {/* Row 1 */}

            <div className="row">

              {/* Resume Upload */}

              <div className="col-md-4 mb-4">

                <div
                  className="card shadow h-100 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/upload")}
                >

                  <div className="card-body">

                    <FaFileUpload
                      size={55}
                      className="text-primary"
                    />

                    <h4 className="mt-3">
                      Resume Upload
                    </h4>

                    <p>
                      Upload your resume for AI analysis.
                    </p>

                  </div>

                </div>

              </div>

              {/* ATS Score */}

              <div className="col-md-4 mb-4">

                <div
                  className="card shadow h-100 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/ats")}
                >

                  <div className="card-body">

                    <FaChartLine
                      size={55}
                      className="text-success"
                    />

                    <h4 className="mt-3">
                      ATS Score
                    </h4>

                    <p>
                      Check your resume compatibility.
                    </p>

                  </div>

                </div>

              </div>

              {/* Resume vs Job Description */}

              <div className="col-md-4 mb-4">

                <div
                  className="card shadow h-100 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/job-analyzer")}
                >

                  <div className="card-body">

                    <FaClipboardCheck
                      size={55}
                      className="text-warning"
                    />

                    <h4 className="mt-3">
                      Resume vs Job Description
                    </h4>

                    <p>
                      Compare your resume with a job description.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Row 2 */}

            <div className="row">

              {/* Learning Recommendation */}

              <div className="col-md-4 mb-4">

                <div
                  className="card shadow h-100 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/learning")}
                >

                  <div className="card-body">

                    <FaBook
                      size={55}
                      className="text-info"
                    />

                    <h4 className="mt-3">
                      Learning Recommendation
                    </h4>

                    <p>
                      Improve your missing skills.
                    </p>

                  </div>

                </div>

              </div>

              {/* Mock Interview */}

              <div className="col-md-4 mb-4">

                <div
                  className="card shadow h-100 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/interview")}
                >

                  <div className="card-body">

                    <FaUserTie
                      size={55}
                      className="text-danger"
                    />

                    <h4 className="mt-3">
                      Mock Interview
                    </h4>

                    <p>
                      Practice technical and HR interview questions.
                    </p>

                  </div>

                </div>

              </div>

              {/* Resume Suggestions */}

              <div className="col-md-4 mb-4">

                <div
                  className="card shadow h-100 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/suggestions")}
                >

                  <div className="card-body">

                    <FaLightbulb
                      size={55}
                      className="text-warning"
                    />

                    <h4 className="mt-3">
                      Resume Suggestions
                    </h4>

                    <p>
                      Get AI-powered suggestions to improve your resume.
                    </p>

                  </div>

                </div>

              </div>

            </div>
                        {/* Row 3 */}

            <div className="row">

              {/* AI Candidate Report */}

              <div className="col-md-6 mb-4">

                <div
                  className="card shadow h-100 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/report")}
                >

                  <div className="card-body">

                    <FaFileAlt
                      size={55}
                      className="text-primary"
                    />

                    <h4 className="mt-3">
                      AI Candidate Report
                    </h4>

                    <p>
                      View your complete AI-generated candidate report.
                    </p>

                  </div>

                </div>

              </div>

              {/* Welcome Card */}

              <div className="col-md-6 mb-4">

                <div className="card shadow h-100">

                  <div className="card-body">

                    <h3 className="text-primary">
                      Welcome, {user?.full_name} 👋
                    </h3>

                    <hr />

                    <p>
                      This AI Recruitment System helps you:
                    </p>

                    <ul>

                      <li>✅ Upload your Resume</li>

                      <li>✅ Check ATS Score</li>

                      <li>✅ Compare Resume with Job Description</li>

                      <li>✅ View Job Matching Results</li>

                      <li>✅ Get Resume Suggestions</li>

                      <li>✅ Receive Learning Recommendations</li>

                      <li>✅ Practice Mock Interviews</li>

                      <li>✅ View Complete AI Candidate Report</li>

                    </ul>

                    <div className="alert alert-success mt-3">

                      <strong>Pro Tip:</strong> Upload your latest resume,
                      analyze it, and compare it with a job description to
                      maximize your ATS score before applying.

                    </div>

                  </div>

                </div>

              </div>

              <div className="col-md-4 mb-4">

  <div
    className="card shadow h-100 text-center"
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/resume-dashboard")}
  >

    <div className="card-body">

      <h1>📈</h1>

      <h4>
        AI Resume Dashboard
      </h4>

      <p>
        View complete resume analytics.
      </p>

    </div>

  </div>

</div>
<div className="col-md-4 mb-4">

    <div
        className="card shadow h-100 text-center"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/chatbot")}
    >

        <div className="card-body">

            <h1>🤖</h1>

            <h4>AI Placement Coach</h4>

            <p>
                Ask AI about resume, coding, interviews and placement preparation.
            </p>

        </div>

    </div>

</div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;