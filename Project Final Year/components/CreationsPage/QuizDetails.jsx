import { useEffect, useState } from "react";
import QuestionsPage from "./QuestionsPage";

const QuizDetails = (props) => {
   const [questions, setQuestions] = useState([]);
   const [quiz, setQuiz] = useState();

   useEffect(() => {
      setQuiz(props.data);
      console.log(quiz);
   }, [props.data]);

   return (
      <>
         {quiz === undefined && (
            <div
               className="border border-3 rounded-5 d-flex justify-content-center align-items-center fs-4 bg-info-subtle"
               style={{ height: "30rem" }}
            >
               <p className="text-info fw-bold fst-italic">Click on a quiz to view Complete Info</p>
            </div>
         )}

         {quiz !== undefined && (
            <div className="border border-bottom-0 border-2 rounded-top p-3 quiz-details">
               <div className="d-flex justify-content-center">
                  <h3
                     className="border-bottom border-3 border-info-subtle fs-2 px-3 fst-italic fw-bold"
                     style={{ width: "fit-content" }}
                  >
                     {quiz.title}
                  </h3>
               </div>
               <div className="d-flex justify-content-between ">
                  <h4 className="fs-6 ">
                     Subject: <span className="fst-italic"> {quiz.subject}</span>
                  </h4>
                  <h4 className="fs-6 ">
                     Date: <span className="fst-italic"> {quiz.date}</span>
                  </h4>
               </div>
               <div className="d-flex justify-content-between mt-2">
                  <h4 className="fs-6">
                     Total Questions: <span className="fst-italic"> {quiz.totalQuestions}</span>
                  </h4>
                  <h4 className="fs-6">
                     Total Points: <span className="fst-italic"> {quiz.totalPoints}</span>
                  </h4>
               </div>
               <div className="d-flex justify-content-between mt-2">
                  <h4 className="fs-6">
                     Difficulty: <span className="fst-italic"> {quiz.difficulty}</span>
                  </h4>
                  <h4 className="fs-6">
                     Duration:{" "}
                     <span className="fst-italic"> {quiz.duration / 60 + " minutes"}</span>
                  </h4>
               </div>
            </div>
         )}

         {quiz !== undefined && <QuestionsPage quizId={quiz.quizId} />}
      </>
   );
};

export default QuizDetails;
