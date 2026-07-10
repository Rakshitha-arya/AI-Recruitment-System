import { useEffect, useState } from "react";

function Suggestions() {

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {

        const analysis = JSON.parse(
            localStorage.getItem("analysis")
        );

        if (
            analysis &&
            analysis.resume_suggestions
        ) {

            setSuggestions(
                analysis.resume_suggestions
            );

        }

    }, []);

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">
                    AI Resume Suggestions
                </h2>

                {
                    suggestions.length > 0 ? (

                        <ul className="list-group">

                            {
                                suggestions.map((item, index) => (

                                    <li
                                        key={index}
                                        className="list-group-item"
                                    >
                                        ✅ {item}
                                    </li>

                                ))
                            }

                        </ul>

                    ) : (

                        <div className="alert alert-warning">

                            No suggestions available.

                            <br />

                            Please upload and analyze your resume first.

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default Suggestions;