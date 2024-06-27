import homePageImage from "../../assets/online-exam-or-test.webp";

const HomeBody = () => {
   let heading = ["Welcome to Quizzy!", "Challenge Yourself"];
   let bodyContent = [
      "Elevate your knowledge and challenge your intellect with Quizzy, your ultimate destination for fun and engaging quizzes. Whether you're a trivia enthusiast, a curious learner, or just looking for a mental workout, Quizzy has something for everyone.",
      "Put your knowledge to the test and challenge yourself with our carefully crafted quizzes. Whether you're playing solo or competing with friends, each quiz promises an exhilarating experience and a chance to expand your horizons.",
   ];
   return (
      <div className="body">
         <div className="body-content">
            <div className="content">
               <h3>{heading[0]}</h3>
               <p>{bodyContent[0]}</p>
            </div>
            <div className="content">
               <h3>{heading[1]}</h3>
               <p>{bodyContent[1]}</p>
            </div>
         </div>
         <div className="body-image">
            <img src={homePageImage} />
         </div>
      </div>
   );
};

export default HomeBody;
