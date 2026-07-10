import { useEffect, useState } from "react";

function Jobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        const analysis = JSON.parse(
            localStorage.getItem("analysis")
        );

        if (analysis && analysis.job_matches) {
            setJobs(analysis.job_matches);
        }

    }, []);

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                Recommended Jobs
            </h2>

            <div className="row">

                {jobs.length === 0 ? (

                    <h4>No Job Recommendations Available</h4>

                ) : (

                    jobs.map((job, index) => (

                        <div
                            className="col-md-4 mb-4"
                            key={index}
                        >

                            <div className="card shadow">

                                <div className="card-body">

                                    <h4>
                                        {job.title}
                                    </h4>

                                    <h6 className="text-muted">
                                        {job.company}
                                    </h6>

                                    <hr />

                                    <h5 className="text-success">
                                        Match : {job.match}%
                                    </h5>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default Jobs;