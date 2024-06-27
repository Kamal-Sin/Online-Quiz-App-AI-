import Header from "../HomePage/Header";
import IdInput from "./IdInput";
import LeftComponent from "./AiQuiz";
import AiQuiz from "./AiQuiz";

const PracticePage = () => {
   return (
      <>
         <Header />
         <div className="bg-info-subtle d-flex" style={{ height: "70vh" }}>
            <div className="d-flex flex-column w-50 justify-content-center align-items-center">
               <IdInput />
            </div>
            <div>
               <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                     style={{ height: "30vh", border: "2px solid black", width: "2px" }}
                     className="align-self-center"
                  ></div>
                  <div>
                     <h3
                        className="text-danger fw-bold fst-italic my-3"
                        style={{ fontFamily: "Architects Daughter" }}
                     >
                        OR
                     </h3>
                  </div>
                  <div
                     style={{ height: "30vh", border: "2px solid black", width: "2px" }}
                     className="align-self-center"
                  ></div>
               </div>
            </div>
            <AiQuiz />
         </div>
      </>
   );
};

export default PracticePage;
