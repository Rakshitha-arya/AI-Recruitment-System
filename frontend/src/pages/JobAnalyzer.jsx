import { useState } from "react";
import api from "../services/api";

function JobAnalyzer() {

    const [jobDescription, setJobDescription] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const analyze = async () => {

        const filePath = localStorage.getItem("resume_path");

        if (!filePath) {
            alert("Please upload your resume first.");
            return;
        }

        if (jobDescription.trim() === "") {
            alert("Please paste a Job Description.");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/analysis/analyze",
                {
                    file_path: filePath,
                    job_description: jobDescription
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            localStorage.setItem(
                "analysis",
                JSON.stringify(response.data)
            );

            setResult(response.data.job_match);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.error ||
                "Analysis Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center text-primary">

                    Resume vs Job Description Analyzer

                </h2>

                <textarea

                    className="form-control mt-4"

                    rows="10"

                    placeholder="Paste Job Description Here..."

                    value={jobDescription}

                    onChange={(e) =>
                        setJobDescription(e.target.value)
                    }

                />

                <button

                    className="btn btn-primary mt-4"

                    onClick={analyze}

                    disabled={loading}

                >

                    {loading ? "Analyzing..." : "Analyze"}

                </button>

            </div>

            {

                result && (

                    <div className="card shadow mt-5 p-4">

                        <h3 className="text-success">

                            Match Score

                        </h3>

                        <div className="progress mb-4">

                            <div

                                className="progress-bar bg-success"

                                style={{
                                    width: `${result.match_score}%`
                                }}

                            >

                                {result.match_score}%

                            </div>

                        </div>

                        <h4 className="text-primary">

                            Matched Skills

                        </h4>

                        <ul>

                            {

                                result.matched_skills.map((skill, index) => (

                                    <li key={index}>
                                        {skill}
                                    </li>

                                ))

                            }

                        </ul>

                        <h4 className="text-danger mt-4">

                            Missing Skills

                        </h4>

                        <ul>

                            {

                                result.missing_skills.map((skill, index) => (

                                    <li key={index}>
                                        {skill}
                                    </li>

                                ))

                            }

                        </ul>

                        <hr />

                        <h4>

                            Recommendation

                        </h4>

                        <h2 className="text-success">

                            {result.recommendation}

                        </h2>

                    </div>

                )

            }

        </div>

    );

}

export default JobAnalyzer;