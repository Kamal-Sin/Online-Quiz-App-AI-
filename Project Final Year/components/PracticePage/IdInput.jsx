import { useState } from "react";
import { Link } from "react-router-dom";

const IdInput = () => {
   const regex = /^\d{6}$/;
   const [quizId, setQuizId] = useState("");
   const [invalid, setInvalid] = useState(false);
   return (
      <>
         <h3 style={{ marginTop: "70px" }} className="fs-1 fw-bold text-danger">
            Have a Quiz Id
         </h3>
         <p className="fs-4">Enter quiz id below </p>
         <input
            type="tel"
            placeholder="Quiz ID"
            className="p-2 border border-success rounded-pill btn-outline-light btn"
            style={{ color: "black", cursor: "text" }}
            onChange={(e) => {
               setQuizId(e.target.value);
               if (e.target.value.length > 6) {
                  setInvalid("Length Exceeded !");
               } else if (e.target.value.length === 6) {
                  regex.test(e.target.value) ? setInvalid("") : setInvalid("Invalid Input");
               } else if (e.target.value.length < 6) {
                  setInvalid("");
               }
            }}
         />
         <p className="text-danger fs-5 mt-2 mb-0">{invalid}</p>
         <Link className=" btn-success btn mt-4 fs-5" to={`/Practice/${quizId}`}>
            Attempt
         </Link>
      </>
   );
};

export default IdInput;
