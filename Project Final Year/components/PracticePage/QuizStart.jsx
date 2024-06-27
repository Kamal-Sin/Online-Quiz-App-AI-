import { useEffect, useRef, useState } from "react";
import Spinner from "../HomePage/Spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const QuizStart = (props) => {
   const location = useLocation();
   const duration = location.state;
   const params = useParams();
   const navigate = useNavigate();
   const [timeLeft, setTimeLeft] = useState(duration);
   const [index, setIndex] = useState(0);
   const [questions, setQuestions] = useState(null);
   const [answers, setAnswers] = useState(null);
   const [showSpinner, setShowSpinner] = useState(true);
   const [loadingText, setLoadingText] = useState("Loading Quiz...");
   const [responseData, setResponseData] = useState();
   const handleChange = (index, option) => {
      setAnswers((prev) => ({
         ...prev,
         [index + 1]: option,
      }));
   };

   const fetchQuestions = async (quizId) => {
      setShowSpinner(true);
      try {
         const url = "http://localhost:8000/quiz/start";
         if (localStorage.getItem("pid") === null && sessionStorage.getItem("pid") === null) {
            toast.error("Kindly login or register");
            navigate("/Practice");
         }
         let p = localStorage.getItem("pid");
         if (p === null) {
            p = sessionStorage.getItem("pid");
         }
         const temp = { quizId: quizId };
         const req = JSON.stringify(temp);
         const res = await fetch(url, {
            headers: {
               pid: p,
               "Content-Type": "application/json",
            },
            body: req,
            method: "POST",
         });
         if (res.status === 404) {
            toast.error("Nothing Found");
            navigate("/Practice");
         } else if (res.status === 302) {
            const data = await res.json();
            setQuestions(data);
            setAnswers(Array(data.length).fill(null));
         }
         setShowSpinner(false);
      } catch (error) {
         console.log(error);
         navigate("/Practice/GetQuiz");
         toast.error("Unable to load Quiz! Try Again");
      }
      setShowSpinner(false);
   };

   const submitQuiz = async () => {
      setShowSpinner(true);
      setLoadingText("Submitting Quiz...");
      const req = {
         quizId: params.quizId,
         date: new Date().toLocaleDateString(),
         answers: answers,
      };
      if (localStorage.getItem("pid") === null && sessionStorage.getItem("pid") === null) {
         toast.error("Kindly login or register");
         navigate("/Practice");
      }
      let p = localStorage.getItem("pid");
      if (p === null) {
         p = sessionStorage.getItem("pid");
      }
      try {
         const url = "http://localhost:8000/quiz/submit";
         const res = await fetch(url, {
            headers: {
               pid: p,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
            method: "POST",
         });
         const data = await res.json();
         setResponseData(data);
      } catch (error) {
         console.log(error);
      }
      setShowSpinner(false);
   };

   const proceedQuiz = () => {
      navigate("/");
   };

   useEffect(() => {
      fetchQuestions(params.quizId);
   }, []);

   useEffect(() => {
      if (timeLeft === 0) {
         submitQuiz();
      }
      const timer = setInterval(() => {
         setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
   }, [timeLeft]);

   useEffect(() => {
      if (props.changeCount === 3) {
         submitQuiz();
      }
   }, [props.changeCount]);

   return (
      <>
         {showSpinner && (
            <div
               className="d-flex flex-column justify-content-center align-items-center"
               style={{ height: "100vh" }}
            >
               <>
                  <div>
                     <Spinner />
                  </div>
                  <div>
                     <p className="pt-2 fs-3 fst-italic">{loadingText}</p>
                  </div>
               </>
            </div>
         )}
         {!showSpinner && questions !== null && (
            <div>
               {" "}
               <div
                  className="quiz-start bg-secondary-subtle text-dark"
                  style={{ minHeight: "75vh" }}
               >
                  <div className="d-flex justify-content-between me-5 pt-3 fs-3 px-3">
                     <div className="pt-3 px-3">
                        <span className="fst-italic text-primary fw-bold me-2">Points :</span>
                        <span>{questions[index].points}</span>
                     </div>
                     <div className="text-end ">
                        <p className="fst-italic m-0 text-danger fw-bold">Time-Left : </p>
                        {`${Math.floor(timeLeft / 60)} : ${timeLeft % 60 < 10 ? "0" : ""}${
                           timeLeft % 60
                        }`}
                     </div>
                  </div>
                  <div
                     style={{ top: "3rem", width: "70%", margin: "auto", position: "relative" }}
                     className="d-flex justify-content-center flex-column"
                  >
                     <div>
                        <div className="fs-3 fst-italic" style={{ width: "fit-content" }}>
                           Q- {index + 1}:
                        </div>
                        <div className=" fs-3">{questions[index].question}</div>
                     </div>
                     <div className="m-4 fs-4">
                        <ul style={{ listStyle: "none" }}>
                           <li>
                              <input
                                 onChange={() => {
                                    handleChange(index, "1");
                                 }}
                                 id="option1"
                                 type="radio"
                                 checked={answers[index + 1] === "1"}
                                 name="answer"
                                 className="border border-4 border-secondary"
                                 style={{
                                    transform: "scale(2)",
                                    WebkitTransform: "scale(2)",
                                    cursor: "pointer",
                                    boxShadow: "none",
                                 }}
                              />
                              <span className="ms-3">
                                 <label htmlFor="option1">{questions[index].option1}</label>
                              </span>
                           </li>
                           <li>
                              <input
                                 onChange={() => {
                                    handleChange(index, "2");
                                 }}
                                 id="option2"
                                 type="radio"
                                 checked={answers[index + 1] === "2"}
                                 name="answer"
                                 className="border border-4 border-secondary"
                                 style={{
                                    transform: "scale(2)",
                                    WebkitTransform: "scale(2)",
                                    cursor: "pointer",
                                    boxShadow: "none",
                                 }}
                              />
                              <span className="ms-3">
                                 <label htmlFor="option2">{questions[index].option2}</label>
                              </span>
                           </li>
                           <li>
                              <input
                                 onChange={() => {
                                    handleChange(index, "3");
                                 }}
                                 id="option3"
                                 type="radio"
                                 checked={answers[index + 1] === "3"}
                                 name="answer"
                                 className="border border-4 border-secondary"
                                 style={{
                                    transform: "scale(2)",
                                    WebkitTransform: "scale(2)",
                                    cursor: "pointer",
                                    boxShadow: "none",
                                 }}
                              />
                              <span className="ms-3">
                                 <label htmlFor="option3">{questions[index].option3}</label>
                              </span>
                           </li>
                           <li>
                              <input
                                 onChange={() => {
                                    handleChange(index, "4");
                                 }}
                                 id="option4"
                                 type="radio"
                                 name="answer"
                                 checked={answers[index + 1] === "4"}
                                 style={{
                                    transform: "scale(2)",
                                    WebkitTransform: "scale(2)",
                                    cursor: "pointer",
                                    boxShadow: "none",
                                 }}
                              />
                              <span className="ms-3">
                                 <label htmlFor="option4">{questions[index].option4}</label>
                              </span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div
                  className="d-flex justify-content-center align-items-center bg-secondary-subtle text-dark"
                  style={{ height: "25vh" }}
               >
                  <button
                     className={`fs-2 ${index === 0 ? "d-none" : ""} me-5 p-0`}
                     style={{
                        background: "none",
                        border: "0",
                     }}
                     onClick={(e) => {
                        e.preventDefault();
                        setIndex(index - 1);
                     }}
                  >
                     <i class="bi bi-caret-left "></i>
                  </button>
                  <button className="btn btn-success fs-4 me-5" onClick={submitQuiz}>
                     Submit
                  </button>
                  <button
                     className="btn btn-danger fs-4 me-5"
                     onClick={(e) => {
                        e.preventDefault();
                        handleChange(index, null);
                     }}
                  >
                     Reset
                  </button>
                  <button
                     className={`fs-2 ${index === questions.length - 1 ? "d-none" : ""} m-0`}
                     style={{
                        background: "none",
                        border: "0",
                     }}
                     onClick={(e) => {
                        e.preventDefault();
                        setIndex(index + 1);
                     }}
                  >
                     <i class="bi bi-caret-right "></i>
                  </button>
               </div>
            </div>
         )}
         {responseData !== undefined && (
            <div className="submit-response">
               <div className="d-flex flex-column justify-content-center align-items-center p-5 bg-info border-3 rounded-5">
                  <h2 className=" text-light fw-bold">
                     Total Score: {`${responseData.points} / ${responseData.totalPoints}`}
                  </h2>
                  <button className="btn btn-success fs-4 m-4" onClick={proceedQuiz}>
                     Proceed
                  </button>
               </div>
            </div>
         )}
      </>
   );
};

export default QuizStart;
