import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function ResumeUpload() {

    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const uploadResume = async () => {

        if (!file) {
            alert("Please select a resume.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            const token = localStorage.getItem("token");

            // Upload Resume
            const uploadResponse = await api.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            const filePath = uploadResponse.data.path;

            // Analyze Resume
            const analysisResponse = await api.post(
                "/analysis/analyze",
                {
                    file_path: filePath,
                    job_description: ""
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Save Complete Analysis
            localStorage.setItem(
                "analysis",
                JSON.stringify(analysisResponse.data)
            );

            alert("Resume uploaded and analyzed successfully.");

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Upload Failed"
            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-5">

                <h2 className="mb-4">
                    Upload Resume
                </h2>

                <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.docx"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                />

                <button
                    className="btn btn-success mt-4"
                    onClick={uploadResume}
                >
                    Upload & Analyze
                </button>

            </div>

        </div>

    );

}

export default ResumeUpload;