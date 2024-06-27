import { Link } from "react-router-dom";
import Header from "../HomePage/Header";
import Spinner from "../HomePage/Spinner";
import { useEffect, useState } from "react";
import "./Creations.css";
import QuizDetails from "./QuizDetails";
const Creations = () => {
   const [currentQuiz, setCurrentQuiz] = useState();
   const [showSpinner, setShowSpinner] = useState(true);
   const [error, setError] = useState(false);
   const [data, setData] = useState([]);
   const [errorText, setErrorText] = useState("");
   const getQuizzes = async () => {
      const url = "http://localhost:8000/user/creations";
      try {
         const res = await fetch(url, {
            headers: {
               pid: localStorage.getItem("pid"),
               "Content-type": "application/json",
            },
         });
         if (res.status === 204) {
            setErrorText("You have not created any quiz");
            setError(true);
            setShowSpinner(false);
         } else if (res.status === 500) {
            setErrorText("Something went wrong! Try again ");
            setError(true);
            setShowSpinner(false);
         } else if (res.status === 302) {
            const data = await res.json();
            setData(data);
            setShowSpinner(false);
         } else if (res.status === 401) {
            setErrorText("You are not logged in. Kindly login");
            setShowSpinner(false);
         }
         //  console.log(errorText);
      } catch (error) {
         setErrorText("Something went wrong! Try again ");
         setError(true);
         setShowSpinner(false);
      }
   };

   useEffect(() => {
      getQuizzes();
   }, []);

   return (
      <div className="bg-light pb-5">
         <Header />
         <div className="create-quiz d-flex text-center justify-content-center align-items-center">
            <h4 className="p-4 fs-1 text-info fw-bold me-5">
               Want to create a quiz{" "}
               <span className="fs-1 ms-5" style={{ width: "80px" }}>
                  &#10230;
               </span>
            </h4>
            <Link to="/Creations/Create-Quiz" className="pe-5 me-5">
               <button type="button" className="btn btn-outline-danger fs-4">
                  Create Quiz
               </button>
            </Link>
         </div>
         <hr className="container-lg border border-2 border-dark mt-0" />
         <div className="d-flex justify-content-center">
            <h3 className="fs-1 fw-bold" style={{ color: "#f1c02b" }}>
               Previous Quizzes
            </h3>
         </div>
         {error && (
            <div className="p-4 d-flex align-items-center justify-content-center">
               <div
                  className="border border-3 rounded-5 d-flex align-items-center justify-content-center"
                  style={{ height: "25rem", width: "60%" }}
               >
                  <h3 className="fs-4 text-danger">{errorText}</h3>
               </div>
            </div>
         )}
         {!error && (
            <div className="row text-center justify-content-center mt-4" style={{ width: "99vw" }}>
               <div className="col-4 ">
                  {showSpinner && <Spinner />}
                  <ul class="list-group quizzes overflow-y-auto" style={{ height: "36rem" }}>
                     {!showSpinner &&
                        data.map((res) => (
                           <li class="list-group-item">
                              <button
                                 className="border-0"
                                 style={{ width: "100%", background: "none" }}
                                 onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentQuiz(res);
                                    //  console.log(res);
                                 }}
                              >
                                 <div
                                    className="d-flex justify-content-between p-1 px-4"
                                    key={res.id}
                                 >
                                    <p className="">{res.subject}</p>
                                    <p className="m-0"> {res.date} </p>
                                 </div>
                                 <div key={res.title}>
                                    <h4> {res.title}</h4>
                                 </div>
                              </button>
                           </li>
                        ))}
                  </ul>
               </div>
               <div className="col-7 justify-content-start">
                  <QuizDetails data={currentQuiz} />
               </div>
            </div>
         )}
      </div>
   );
};
export default Creations;
