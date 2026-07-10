import { useState } from "react";
import api from "../services/api";

function Interview() {

    const [loading, setLoading] = useState(false);

    const [questions, setQuestions] = useState([]);

    const [sessionId, setSessionId] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState(null);

    const [answer, setAnswer] = useState("");

    const [feedback, setFeedback] = useState(null);

    const [completed, setCompleted] = useState(false);

    const [report, setReport] = useState(null);


    // ==========================================
    // Start Interview
    // ==========================================

    const startInterview = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const analysis = JSON.parse(
                localStorage.getItem("analysis")
            );

            if (!analysis) {

                alert("Upload Resume First");

                return;

            }

            const response = await api.post(

                "/interview/start",

                {

                    resume_text: analysis.resume_text,

                    resume_skills: analysis.resume_skills

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            console.log(response.data);

            setSessionId(response.data.session_id);

            setQuestions(response.data.questions);

            setCurrentQuestion(response.data.question);

            setCurrentIndex(0);

            setFeedback(null);

            setAnswer("");

            setCompleted(false);

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Unable to Start Interview."

            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // Submit Answer
    // ==========================================

    const submitAnswer = async () => {

        if (answer.trim() === "") {

            alert("Please enter your answer.");

            return;

        }

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(

                "/interview/answer",

                {

                    session_id: sessionId,

                    questions: questions,

                    question_index: currentIndex,

                    answer: answer

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            console.log(response.data);

            setFeedback(response.data.feedback);

            setCompleted(response.data.completed);

        }

        catch (err) {

            console.log(err);

            alert("Evaluation Failed.");

        }

    };
        // ==========================================
    // Next Question
    // ==========================================

    const nextQuestion = async () => {

        if (currentIndex + 1 >= questions.length) {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(

                    `/interview/report/${sessionId}`,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                );

                setReport(response.data);

                setCompleted(true);

            }

            catch (err) {

                console.log(err);

                alert("Unable to load final report.");

            }

            return;

        }

        setCurrentIndex(currentIndex + 1);

        setCurrentQuestion(questions[currentIndex + 1]);

        setAnswer("");

        setFeedback(null);

    };


    // ==========================================
    // Restart Interview
    // ==========================================

    const restartInterview = () => {

        setQuestions([]);

        setCurrentQuestion(null);

        setCurrentIndex(0);

        setFeedback(null);

        setAnswer("");

        setCompleted(false);

        setReport(null);

        setSessionId(null);

    };
    return (

<div className="container mt-5">

<div className="card shadow-lg p-4">

<h2 className="text-center text-primary">
AI Resume Based Mock Interview
</h2>

<hr/>

{
!currentQuestion && !completed &&

<div className="text-center">

<button
className="btn btn-primary btn-lg"
onClick={startInterview}
disabled={loading}
>

{
loading
?
"Generating..."
:
"Start Interview"
}

</button>

</div>

}

{
currentQuestion && !completed &&

<>

<div className="mb-3">

<h5>

Question {currentIndex + 1} / {questions.length}

</h5>

<div className="progress">

<div
className="progress-bar"
style={{
width:
`${((currentIndex+1)/questions.length)*100}%`
}}
>

{Math.round(((currentIndex+1)/questions.length)*100)}%

</div>

</div>

</div>

<div className="card p-3 bg-light">

<h4>

{currentQuestion.type}

</h4>

<p className="mt-3">

{currentQuestion.question}

</p>

</div>

<textarea

className="form-control mt-4"

rows="6"

placeholder="Type your answer..."

value={answer}

onChange={(e)=>setAnswer(e.target.value)}

/>

<div className="mt-3">

<button

className="btn btn-success"

onClick={submitAnswer}

>

Submit Answer

</button>

</div>

{
feedback &&

<div className="card mt-4 shadow p-3">

<h4 className="text-success">

AI Evaluation

</h4>

<hr/>

<p>

<b>Score :</b>

{feedback.score}/10

</p>

<p>

<b>Strengths :</b>

{feedback.strengths}

</p>

<p>

<b>Weaknesses :</b>

{feedback.weaknesses}

</p>

<p>

<b>Correct Answer :</b>

</p>

<div className="alert alert-success">

{feedback.correct_answer}

</div>

<p>

<b>Improvement :</b>

</p>

<div className="alert alert-warning">

{feedback.improvement}

</div>

<div className="text-end">

<button

className="btn btn-primary"

onClick={nextQuestion}

>

{

currentIndex+1===questions.length

?

"Finish Interview"

:

"Next Question"

}

</button>

</div>

</div>

}

</>

}

{
completed && report &&

<div className="text-center">

<h2 className="text-success">

Interview Completed

</h2>

<hr/>

<h3>

Overall Percentage

</h3>

<h1 className="display-3 text-primary">

{report.percentage}%

</h1>

<p>

<b>Total Score :</b>

{report.score}

</p>

<p>

<b>Total Questions :</b>

{report.total_questions}

</p>

<button

className="btn btn-success"

onClick={restartInterview}

>

Start Again

</button>

</div>

}

</div>

</div>

);

}

export default Interview;