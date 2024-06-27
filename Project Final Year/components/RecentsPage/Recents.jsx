import { useEffect, useRef, useState } from "react";
import Header from "../HomePage/Header";
import "./recents.css";
import Spinner from "../HomePage/Spinner";
import Footer from "../HomePage/Footer";
const Recents = () => {
   const [activeIndex, setActiveIndex] = useState(-1);
   const [showSpinner, setShowSpinner] = useState(true);
   const [error, setError] = useState(null);
   const [data, setData] = useState();

   const getAttempted = async () => {
      setShowSpinner(true);
      const pid = localStorage.getItem("pid");

      if (pid === null) {
         setShowSpinner(false);
         return;
      }
      try {
         const url = "http://localhost:8000/user/attempted";
         const res = await fetch(url, {
            headers: {
               "Content-Type": "application/json",
               pid: pid,
            },
            method: "GET",
         });
         if (res.status === 404) {
            setError("You have not attempted any quiz ...");
         } else if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            const combinedData = resData.attempted.map((item, index) => ({
               ...item,
               ...resData.quizDetails[index],
            }));
            setData(combinedData);
         } else if (res.status === 401) {
            setError("Login to proceed");
         }
      } catch (error) {
         setError("Something went wrong! Try Again...");
      }
      setShowSpinner(false);
   };

   const handleClick = (index) => {
      setActiveIndex(index);
   };
   useEffect(() => {
      getAttempted();
   }, []);

   return (
      <>
         <Header />
         {showSpinner && (
            <div
               className="d-flex justify-content-center align-items-center"
               style={{ height: "60vh" }}
            >
               <Spinner />
            </div>
         )}

         {!showSpinner && error !== null && (
            <div
               className="d-flex bg-secondary-subtle justify-content-center align-items-center"
               style={{ height: "70vh" }}
            >
               <p className="fs-2 fst-italic text-danger fw-bold">{error}</p>
            </div>
         )}

         {!showSpinner && error === null && (
            <div>
               <div className="bg-secondary-subtle d-flex justify-content-center align-items-center p-4">
                  <h1 className="fst-italic fw-bold text-info">Attempted Quizzes</h1>
               </div>
               <div className="bg-secondary-subtle d-flex justify-content-around w-100 h-100">
                  <div className="px-3 pt-5" style={{ width: "35%", height: "65vh" }}>
                     <ul
                        className="list-group ps-5 rounded-4 pb-5 overflow-y-auto"
                        style={{ height: "49vh" }}
                     >
                        {data.map((item, index) => (
                           <button
                              type="button"
                              className="list-group-item list-group-item-action"
                              key={index}
                              onClick={() => handleClick(index)}
                           >
                              <div className="d-flex justify-content-between fst-italic">
                                 <h5 className="fs-6">{item.subject}</h5>
                                 <h5 className="fs-6">{item.date}</h5>
                              </div>
                              <div className="text-center text-success pt-2">
                                 <h3 className="fw-bold">{item.title}</h3>
                              </div>
                           </button>
                        ))}
                     </ul>
                  </div>
                  {activeIndex === -1 && (
                     <div
                        className="px-5 mx-5 my-5 border border-secondary border-3 rounded-4 bg-info-subtle "
                        style={{ width: "65%" }}
                     >
                        <div className="d-flex justify-content-center align-items-center h-100">
                           <h3 className="text-danger fst-italic">
                              Click on a quiz to view more...
                           </h3>
                        </div>
                     </div>
                  )}
                  {activeIndex > -1 && (
                     <div
                        className="px-5 mx-5 my-5 border border-secondary border-3 rounded-4"
                        style={{ width: "65%" }}
                     >
                        <div className="d-flex justify-content-center">
                           <h1 className="fst-italic fw-bold text-success pt-2">{data[0].title}</h1>
                        </div>
                        <div className="d-flex justify-content-between">
                           <div className="pt-3">
                              <span className="fs-4 fw-bold">Subject: </span>{" "}
                              <span className="fs-4 fst-italic">{data[activeIndex].subject}</span>
                           </div>
                           <div className="pt-3">
                              <span className="fs-4 fw-bold">Attempted Date: </span>{" "}
                              <span className="fs-4 fst-italic">{data[activeIndex].date}</span>
                           </div>
                        </div>
                        <div className="d-flex justify-content-between">
                           <div className="pt-3">
                              <span className="fs-4 fw-bold">Difficulty: </span>{" "}
                              <span className="fs-4 fst-italic">
                                 {data[activeIndex].difficulty}
                              </span>
                           </div>
                           <div className="pt-3">
                              <span className="fs-4 fw-bold">Total Questions: </span>{" "}
                              <span className="fs-4 fst-italic">
                                 {data[activeIndex].totalQuestions}
                              </span>
                           </div>
                        </div>
                        <div className="d-flex justify-content-center flex-column align-items-center pt-4 ">
                           <h2 className="border-bottom border-3 border-secondary px-2">Score:</h2>
                           <div>
                              <span className="fs-2 fw-bold">{data[activeIndex].points}</span>
                              <span className="fs-2 px-2 fw-bold">/</span>
                              <span className="fs-2 fw-bold">{data[activeIndex].totalPoints}</span>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         )}
         <Footer />
      </>
   );
};

export default Recents;
