import { useEffect, useState } from "react";
import Spinner from "../HomePage/Spinner";
import { useLocation } from "react-router-dom";

const QuestionsPage = (props) => {
   const [questions, setQuestions] = useState([]);
   const [showSpinner, setShowSpinner] = useState(false);
   const location = useLocation();
   const getQuestions = async () => {
      // const quizId = "272021";
      setShowSpinner(true);
      try {
         const url = "http://localhost:8000/user/creations/" + props.quizId + "/questions";

         const res = await fetch(url, {
            headers: {
               pid: localStorage.getItem("pid"),
               "Content-type": "application/json",
            },
         });
         if (res.status === 401) {
            console.log("Unauthorized");
         } else if (res.status === 404) {
            console.log("Quiz Not found");
         } else if (res.status === 302) {
            const data = await res.json();
            console.log(data);
            setQuestions(data);
            setShowSpinner(false);
         }
      } catch (error) {
         console.log("error occured");
         setShowSpinner(false);
      }
   };

   useEffect(() => {
      setQuestions([]);
   }, [location]);
   useEffect(() => {
      setQuestions([]);
      getQuestions();
   }, [props.quizId]);
   return (
      <>
         {showSpinner && (
            <div
               className="border border-3 rounded-5 d-flex align-items-center justify-content-center"
               style={{ height: "25rem" }}
            >
               <Spinner />
            </div>
         )}
         {!showSpinner && questions !== undefined && (
            <ul class="list-group overflow-y-auto" style={{ height: "25rem" }}>
               {questions.map((item) => (
                  <li class=" list-group-item text-start">
                     <div className="bg-light px-5 py-3 d-flex flex-column">
                        <div className="fs-4">
                           <span className="fw-bold fst-italic">
                              {"Q-" + item.questionNo + ". "}
                           </span>
                           <span className="fs-5">{item.question}</span>
                        </div>
                        <div>
                           <p className="fs-5 fw-bold mb-1">Options: </p>
                        </div>
                        <div className="px-5 mx-3">
                           <ul style={{ listStyle: "disc" }}>
                              <li>{item.option1}</li>
                              <li>{item.option2}</li>
                              <li>{item.option3}</li>
                              <li>{item.option4}</li>
                           </ul>
                        </div>
                        <div>
                           <p className="fs-5 fw-bold m-0 d-inline">Correct Answer: </p>
                           <span className="px-1">option- {item.correct}</span>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         )}
      </>
   );
};
export default QuestionsPage;
