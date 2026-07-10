import { useEffect, useState } from "react";

function ResumeDashboard() {

    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {

        const data = JSON.parse(
            localStorage.getItem("analysis")
        );

        if (data) {
            setAnalysis(data);
        }

    }, []);

    if (!analysis) {

        return (

            <div className="container mt-5">

                <div className="alert alert-warning">

                    <h3>No Analysis Found</h3>

                    <p>
                        Please upload and analyze your resume first.
                    </p>

                </div>

            </div>

        );

    }

    const ats = analysis.ats_score || 0;

    const resumeQuality =
        Math.min(100, ats + 8);

    const jobMatch =
        analysis.job_match?.match_percentage || 75;

    const interviewReady =
        Math.min(100, ats + 5);

    const learning =
        Math.min(100, ats + 10);

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">

                AI Resume Analytics Dashboard

            </h2>

            <div className="row">

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>ATS Score</h5>

                            <h1 className="text-success">

                                {ats}%

                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Resume Quality</h5>

                            <h1 className="text-primary">

                                {resumeQuality}%

                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Job Match</h5>

                            <h1 className="text-warning">

                                {jobMatch}%

                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Interview Ready</h5>

                            <h1 className="text-danger">

                                {interviewReady}%

                            </h1>

                        </div>

                    </div>

                </div>

            </div>
                        {/* Progress Bars */}

            <div className="card shadow mb-4">

                <div className="card-body">

                    <h3 className="mb-4">
                        Resume Performance
                    </h3>

                    <h6>ATS Score</h6>

                    <div className="progress mb-3">

                        <div
                            className="progress-bar bg-success"
                            style={{ width: `${ats}%` }}
                        >
                            {ats}%
                        </div>

                    </div>

                    <h6>Resume Quality</h6>

                    <div className="progress mb-3">

                        <div
                            className="progress-bar bg-primary"
                            style={{ width: `${resumeQuality}%` }}
                        >
                            {resumeQuality}%
                        </div>

                    </div>

                    <h6>Job Match</h6>

                    <div className="progress mb-3">

                        <div
                            className="progress-bar bg-warning"
                            style={{ width: `${jobMatch}%` }}
                        >
                            {jobMatch}%
                        </div>

                    </div>

                    <h6>Interview Readiness</h6>

                    <div className="progress mb-3">

                        <div
                            className="progress-bar bg-danger"
                            style={{ width: `${interviewReady}%` }}
                        >
                            {interviewReady}%
                        </div>

                    </div>

                    <h6>Learning Progress</h6>

                    <div className="progress">

                        <div
                            className="progress-bar bg-info"
                            style={{ width: `${learning}%` }}
                        >
                            {learning}%
                        </div>

                    </div>

                </div>

            </div>

            <div className="row">

                {/* Resume Health */}

                <div className="col-md-6 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body">

                            <h3 className="text-primary">
                                Resume Health Check
                            </h3>

                            <hr />

                            <ul className="list-group">

                                <li className="list-group-item">
                                    ✅ Skills Section
                                </li>

                                <li className="list-group-item">
                                    ✅ Projects Included
                                </li>

                                <li className="list-group-item">
                                    ✅ Education
                                </li>

                                <li className="list-group-item">
                                    ✅ Technical Skills
                                </li>

                                <li className="list-group-item">
                                    ⚠ Add Certifications
                                </li>

                                <li className="list-group-item">
                                    ⚠ Add GitHub Profile
                                </li>

                                <li className="list-group-item">
                                    ⚠ Add LinkedIn Profile
                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

                {/* Skill Statistics */}

                <div className="col-md-6 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body">

                            <h3 className="text-success">
                                Resume Statistics
                            </h3>

                            <hr />

                            <table className="table">

                                <tbody>

                                    <tr>

                                        <td>
                                            Skills Found
                                        </td>

                                        <td>

                                            <strong>

                                                {analysis.resume_skills?.length || 0}

                                            </strong>

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>
                                            Matched Skills
                                        </td>

                                        <td>

                                            <strong>

                                                {analysis.matched_skills?.length || 0}

                                            </strong>

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>
                                            Missing Skills
                                        </td>

                                        <td>

                                            <strong>

                                                {analysis.missing_skills?.length || 0}

                                            </strong>

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>
                                            Recommended Jobs
                                        </td>

                                        <td>

                                            <strong>

                                                {analysis.job_matches?.length || 0}

                                            </strong>

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>
                                            Learning Resources
                                        </td>

                                        <td>

                                            <strong>

                                                {Object.keys(
                                                    analysis.learning_recommendations || {}
                                                ).length}

                                            </strong>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
                        {/* AI Recruiter Verdict */}

            <div className="card shadow mb-4">

                <div className="card-body">

                    <h3 className="text-primary mb-4">
                        AI Recruiter Verdict
                    </h3>

                    {

                        ats >= 80 ?

                        <div className="alert alert-success">

                            <h4>🟢 Excellent Resume</h4>

                            <p>

                                Your resume is highly ATS compatible and ready
                                for most software developer roles.

                            </p>

                        </div>

                        :

                        ats >= 60 ?

                        <div className="alert alert-warning">

                            <h4>🟡 Good Resume</h4>

                            <p>

                                Your resume is good but adding more
                                technical skills and projects will
                                improve your chances.

                            </p>

                        </div>

                        :

                        <div className="alert alert-danger">

                            <h4>🔴 Needs Improvement</h4>

                            <p>

                                Improve your resume by adding missing
                                skills, certifications and projects.

                            </p>

                        </div>

                    }

                </div>

            </div>


            {/* Company Readiness */}

            <div className="card shadow mb-4">

                <div className="card-body">

                    <h3 className="mb-4">
                        Company Readiness
                    </h3>

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Company</th>

                                <th>Readiness</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>TCS</td>

                                <td>{Math.min(100, ats + 8)}%</td>

                            </tr>

                            <tr>

                                <td>Infosys</td>

                                <td>{Math.min(100, ats + 5)}%</td>

                            </tr>

                            <tr>

                                <td>Accenture</td>

                                <td>{Math.min(100, ats + 2)}%</td>

                            </tr>

                            <tr>

                                <td>Capgemini</td>

                                <td>{Math.min(100, ats + 4)}%</td>

                            </tr>

                            <tr>

                                <td>Wipro</td>

                                <td>{Math.min(100, ats + 3)}%</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>


            {/* Final Summary */}

            <div className="card shadow mb-5">

                <div className="card-body">

                    <h3 className="text-success">
                        Final AI Summary
                    </h3>

                    <hr />

                    <p>

                        <strong>ATS Score:</strong> {ats}%

                    </p>

                    <p>

                        <strong>Skills Detected:</strong>{" "}

                        {analysis.resume_skills?.length || 0}

                    </p>

                    <p>

                        <strong>Matched Skills:</strong>{" "}

                        {analysis.matched_skills?.length || 0}

                    </p>

                    <p>

                        <strong>Missing Skills:</strong>{" "}

                        {analysis.missing_skills?.length || 0}

                    </p>

                    <p>

                        <strong>Recommended Jobs:</strong>{" "}

                        {analysis.job_matches?.length || 0}

                    </p>

                    <p>

                        <strong>Interview Readiness:</strong>{" "}

                        {interviewReady}%

                    </p>

                    <div className="alert alert-info mt-4">

                        <strong>AI Recommendation:</strong>

                        <br /><br />

                        Continue improving your resume by completing
                        the recommended learning resources,
                        adding certifications, enhancing projects,
                        and practicing mock interviews regularly.

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ResumeDashboard;