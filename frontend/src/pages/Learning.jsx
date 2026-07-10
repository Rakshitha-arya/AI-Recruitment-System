import { useEffect, useState } from "react";

function Learning() {

    const [learning, setLearning] = useState({});

    useEffect(() => {

        const data = localStorage.getItem("analysis");

        if (data) {

            const analysis = JSON.parse(data);

            setLearning(
                analysis.learning_recommendations || {}
            );

        }

    }, []);

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">
                    Learning Recommendations
                </h2>

                {
                    Object.keys(learning).length === 0 ? (

                        <div className="alert alert-warning">
                            No recommendations available.
                        </div>

                    ) : (

                        Object.entries(learning).map(
                            ([skill, resources], index) => (

                                <div
                                    className="card mb-4"
                                    key={index}
                                >

                                    <div className="card-body">

                                        <h4 className="text-primary">
                                            {skill}
                                        </h4>

                                        <ul>

                                            {resources.map((resource, i) => (

                                                <li key={i}>
                                                    {resource}
                                                </li>

                                            ))}

                                        </ul>

                                    </div>

                                </div>

                            )
                        )

                    )

                }

            </div>

        </div>

    );

}

export default Learning;