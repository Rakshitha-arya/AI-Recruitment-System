import { useEffect, useState } from "react";

function Report() {

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

                <h2>No Report Available</h2>

            </div>

        );

    }


    return (

        <div className="container mt-5">

            <div className="card shadow p-5">


                <h1 className="text-center text-primary">
                    AI Candidate Report
                </h1>


                <hr />


                {/* ATS Score */}

                <h3>📊 ATS Score</h3>

                <div className="progress mb-3">

                    <div
                        className="progress-bar bg-success"
                        style={{
                            width: `${analysis.ats_score || 0}%`
                        }}
                    >

                        {analysis.ats_score || 0}%

                    </div>

                </div>


                <hr />


                {/* Resume Skills */}

                <h3>✅ Resume Skills</h3>

                <ul>

                    {
                        analysis.resume_skills?.map((skill,index)=>(

                            <li key={index}>
                                {skill}
                            </li>

                        ))
                    }

                </ul>


                <hr />


                {/* Missing Skills */}

                <h3>❌ Missing Skills</h3>

                <ul>

                    {
                        analysis.missing_skills?.map((skill,index)=>(

                            <li key={index}>
                                {skill}
                            </li>

                        ))
                    }

                </ul>


                <hr />


                {/* Jobs */}

                <h3>💼 Recommended Jobs</h3>


                {
                    analysis.job_matches?.map((job,index)=>(

                        <div
                            className="card mb-3"
                            key={index}
                        >

                            <div className="card-body">


                                <h5>
                                    {job.title}
                                </h5>


                                <p>
                                    {job.company}
                                </p>


                                <h4 className="text-success">

                                    Match {job.match || 0}%

                                </h4>


                            </div>

                        </div>

                    ))
                }



                <hr />


                {/* Learning */}

                <h3>📚 Learning Recommendations</h3>


                {

                    Object.entries(
                        analysis.learning_recommendations || {}
                    )
                    .map(([skill,courses],index)=>(

                        <div key={index}>


                            <h5>
                                {skill}
                            </h5>


                            <ul>


                                {
                                    courses?.map((course,i)=>(

                                        <li key={i}>
                                            {course}
                                        </li>

                                    ))
                                }


                            </ul>


                        </div>

                    ))

                }



                <hr />



                {/* Interview */}

                <h3>🎤 Interview Questions</h3>


                <h5>Technical</h5>

                <ul>

                    {
                        analysis.mock_interview?.Technical?.map((q,i)=>(

                            <li key={i}>
                                {q}
                            </li>

                        ))
                    }

                </ul>



                <h5>Coding</h5>

                <ul>

                    {
                        analysis.mock_interview?.Coding?.map((q,i)=>(

                            <li key={i}>
                                {q}
                            </li>

                        ))
                    }

                </ul>



                <h5>HR</h5>

                <ul>

                    {
                        analysis.mock_interview?.HR?.map((q,i)=>(

                            <li key={i}>
                                {q}
                            </li>

                        ))
                    }

                </ul>



                <hr />



                {/* Suggestions */}

                <h3>💡 Resume Suggestions</h3>


                <ul>

                    {
                        analysis.resume_suggestions?.map((item,index)=>(

                            <li key={index}>
                                {item}
                            </li>

                        ))
                    }

                </ul>


            </div>

        </div>

    );

}


export default Report;