import { useEffect, useState } from "react";

function ATS() {

    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {

        const data = localStorage.getItem("analysis");

        if (data) {
            setAnalysis(JSON.parse(data));
        }

    }, []);

    if (!analysis) {

        return (
            <div className="container mt-5">
                <h2>No Resume Analysis Found</h2>
                <p>Please upload and analyze a resume first.</p>
            </div>
        );

    }

    return (

        <div className="container mt-5">

            <div className="card shadow p-5">

                <h2 className="text-center">
                    ATS Score
                </h2>

                <h1
                    className="text-success text-center"
                    style={{ fontSize: "70px" }}
                >
                    {analysis.ats_score}%
                </h1>

                <hr />

                <div className="row">

                    <div className="col-md-6">

                        <h4 className="text-success">
                            Matched Skills
                        </h4>

                        <ul>
                            {analysis.matched_skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>

                    </div>

                    <div className="col-md-6">

                        <h4 className="text-danger">
                            Missing Skills
                        </h4>

                        <ul>
                            {analysis.missing_skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ATS;