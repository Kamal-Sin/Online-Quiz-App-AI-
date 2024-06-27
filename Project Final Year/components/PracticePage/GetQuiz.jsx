import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../HomePage/Spinner";

const GetQuiz = () => {
   const { quizId } = useParams();
   const [subject, setSubject] = useState("");
   const [duration, setDuration] = useState();
   const [questions, setQuestions] = useState("");
   const [difficulty, setDifficulty] = useState("");
   const [title, setTitle] = useState("");
   const [showSpinner, setShowSpinner] = useState(true);
   const [noError, setNoError] = useState(true);
   const [unauthorized, setUnauthorized] = useState(false);
   const [attempted, setAttempted] = useState(false);
   const [notFound, setNotFound] = useState(false);
   const loadInstructions = async () => {
      const url = "http://localhost:8000/quiz/attempt/" + quizId;
      try {
         const res = await fetch(url, {
            headers: {
               "Content-Type": "application/json",
               pid: localStorage.getItem("pid"),
            },
         });
         if (res.status === 401) {
            setUnauthorized(true);
         } else if (res.status === 409) {
            setAttempted(true);
         } else if (res.status === 404) {
            setNotFound(true);
         } else if (res.status === 200) {
            const data = await res.json();
            setTitle(data["title"]);
            let t = parseInt(data["duration"], 10);
            t = t / 60;
            setDuration(t);
            setDifficulty(data["difficulty"]);
            setQuestions(data["totalQuestions"]);
            setSubject(data["subject"]);
         }
         setShowSpinner(false);
      } catch (error) {
         setNoError(false);
         setShowSpinner(false);
      }
   };

   useEffect(() => {
      loadInstructions();
   }, []);

   return (
      <div className="bg-info-subtle" style={{ height: "100" }}>
         <div style={{ width: "fit-content", margin: "auto" }}>
            <h1
               style={{ padding: "20px", paddingBottom: "5px" }}
               className="text-danger fw-bold border-bottom border-2 border-dark"
            >
               Quiz Instructions
            </h1>
         </div>

         {showSpinner && (
            <div
               style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "88vh",
               }}
               className="d-flex"
            >
               <Spinner />
            </div>
         )}

         {unauthorized && (
            <div
               style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "88vh",
               }}
               className="d-flex flex-column"
            >
               <h2>
                  You are Not Logged In ! <br />
                  Kindly Login To attempt the Quiz
               </h2>
               <Link to="/">
                  <button onClick={(e) => e.preventDefault()}>Go To Login Page</button>
               </Link>
            </div>
         )}

         {!noError && (
            <div
               style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "88vh",
               }}
               className="d-flex flex-column"
            >
               <h2 className="fs-4 text-danger ">
                  Something Went Wrong !<br /> Refresh The Page
               </h2>
            </div>
         )}
         {attempted && (
            <div
               style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "88vh",
               }}
               className="d-flex flex-column"
            >
               <h2 className="fs-4 text-danger ">
                  Quiz already Attempted !<br /> Try with another quiz
               </h2>
            </div>
         )}
         {notFound && (
            <div
               style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "88vh",
               }}
               className="d-flex flex-column"
            >
               <h2 className="fs-4 text-success ">
                  Quiz Not Found
                  <br /> Re-Enter Quiz Id
               </h2>
               <Link to="/Practice">
                  <button className="btn btn-primary">Re-Enter Id</button>
               </Link>
            </div>
         )}

         {!showSpinner && noError && !unauthorized && !attempted && !notFound && (
            <div>
               <div className="d-flex justify-content-between mx-5  mt-3">
                  <h2
                     style={{ color: "#F58B27" }}
                     className="fst-italic border-bottom border-1 border-dark p-2"
                  >
                     Subject: {subject}
                  </h2>

                  <h3
                     style={{ color: "#F58B27" }}
                     className="fst-italic border-bottom border-1 border-dark p-2"
                  >
                     Duration: {duration} minutes
                  </h3>
               </div>
               <div className="mx-auto" style={{ width: "fit-content" }}>
                  <h2 className="fs-1 fw-bold text-success mt-0 border-bottom border-2 border-dark p-2">
                     {title}
                  </h2>
               </div>
               <div className="d-flex justify-content-between">
                  <div style={{ marginLeft: "20%", width: "fit-content" }} className="mt-4">
                     <ol
                        className="list-group list-group-flush list-group-numbered bg-info-subtle"
                        style={{ backgroundColor: "red" }}
                     >
                        <li
                           className="list-group-item bg-info-subtle fs-4 fw-bold"
                           style={{ borderBottom: "2px solid black" }}
                        >
                           Quiz Format:
                           <ul className="fs-6 fw-medium" style={{ listStyle: "disc" }}>
                              <li>This quiz consists of multiple-choice questions.</li>
                              <li>Each question has a single correct answer.</li>
                           </ul>
                        </li>
                        <li
                           className="list-group-item bg-info-subtle fs-4 fw-bold"
                           style={{ borderBottom: "2px solid black" }}
                        >
                           Time Limit:
                           <ul className="fs-6 fw-medium" style={{ listStyle: "disc" }}>
                              <li>
                                 Time Limit for the quiz :{" "}
                                 <span className="fw-bold fs-5">{duration} minutes</span>
                              </li>
                              <li>
                                 Make sure to answer all the questions within the allocated time.
                              </li>
                           </ul>
                        </li>
                        <li
                           className="list-group-item bg-info-subtle fs-4 fw-bold"
                           style={{ borderBottom: "2px solid black" }}
                        >
                           Answer Submission:
                           <ul className="fs-6 fw-medium" style={{ listStyle: "disc" }}>
                              <li>Click the "Submit" button to finalize your answers.</li>
                              <li>Once submitted, you cannot change your answers.</li>
                           </ul>
                        </li>
                        <li
                           className="list-group-item bg-info-subtle fs-4 fw-bold"
                           style={{ borderBottom: "2px solid black" }}
                        >
                           Scoring:
                           <ul className="fs-6 fw-medium" style={{ listStyle: "disc" }}>
                              <li>
                                 Your score will be calculated based on the number of correct
                                 answers.
                              </li>
                              <li>Incorrect answers will not be penalized.</li>
                           </ul>
                        </li>
                     </ol>
                  </div>
                  <div className="d-flex flex-column mt-4" style={{ marginRight: "10%" }}>
                     <div className="pt-2">
                        <h3 className="fs-4 fw-bold">
                           Total Questions: <span>{questions}</span>
                        </h3>
                     </div>
                     <div className="mt-4">
                        <h3 className="fs-4 fw-bold">
                           Difficulty: <span>{difficulty}</span>
                        </h3>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-center mt-3">
                  <Link to={`/Practice/${quizId}/start`} className="p-3" state={duration * 60}>
                     <button type="button" className="btn btn-success px-4 fs-5">
                        Start
                     </button>
                  </Link>
                  <Link to="/" className="p-3">
                     <button type="button" className="btn btn-secondary px-4 fs-5">
                        Exit
                     </button>
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
};
export default GetQuiz;
