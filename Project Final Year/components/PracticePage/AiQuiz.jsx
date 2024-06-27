import { useState } from "react";

const AiQuiz = () => {
   const [error, setError] = useState();
   const [grade, setGrade] = useState(null);
   const [difficulty, setDifficulty] = useState(null);
   const [subject, setSubject] = useState(null);
   const [topic, setTopic] = useState(null);
   return (
      <div className="d-flex flex-column justify-content-center align-items-center w-50">
         <div className="w-50 text-center">
            <h2 className="fw-bold text-danger">Want to practice with A.I Generated Quiz</h2>
         </div>
         <div className="d-flex mt-4">
            <select
               name="grade-select"
               id="grade-select"
               onChange={(e) => {
                  console.log(e.target.value);
               }}
            >
               <option value="" disabled selected>
                  Select your grade...
               </option>
               <option value="1st grade">1st grade</option>
               <option value="2nd grade">2nd grade</option>
               <option value="3rd grade">3rd grade</option>
               <option value="4th grade">4th grade</option>
               <option value="5th grade">5th grade</option>
               <option value="6th grade">6th grade</option>
               <option value="7th grade">7th grade</option>
               <option value="8th grade">8th grade</option>
               <option value="9th grade">9th grade</option>
               <option value="10th grade">10th grade</option>
               <option value="11th grade">11th grade</option>
               <option value="12th grade">12th grade</option>
               <option value="bachelor's scholar">Bachelor's</option>
               <option value="master's scholar">Master's</option>
               <option value="phd scholar">Phd</option>
            </select>
            <select name="dfficulty-select" id="difficulty-select" className="ms-4">
               <option value="" disabled selected>
                  Select difficulty level
               </option>
               <option value="easy">Easy</option>
               <option value="medium">Medium</option>
               <option value="hard">Hard</option>
            </select>
         </div>
         <div className="mt-3 d-flex user-input">
            <input type="text" name="subject" id="subject" placeholder="Enter subject name" />
            <input type="text" name="topic" id="topic" placeholder="Enter topic here" />
         </div>
         <div>
            <button className="btn btn-success mt-4 mb-0 fs-4 px-4">Start</button>
         </div>
         <div>
            <span>{error}</span>
         </div>
      </div>
   );
};

export default AiQuiz;
