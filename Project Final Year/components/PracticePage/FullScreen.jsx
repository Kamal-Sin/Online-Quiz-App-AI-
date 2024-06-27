import { useEffect, useRef, useState } from "react";
import QuizStart from "./QuizStart";
import { ToastContainer, toast } from "react-toastify";

const FullScreen = () => {
   const [isFullscreen, setIsFullscreen] = useState(false);
   const fullscreenRef = useRef(null);
   const [changeCount, setChangeCount] = useState(0);
   const requestFullScreen = () => {
      if (fullscreenRef.current) {
         if (fullscreenRef.current.requestFullscreen) {
            fullscreenRef.current.requestFullscreen();
         } else if (fullscreenRef.current.mozRequestFullScreen) {
            fullscreenRef.current.mozRequestFullScreen();
         } else if (fullscreenRef.current.webkitRequestFullscreen) {
            fullscreenRef.current.webkitRequestFullscreen();
         } else if (fullscreenRef.current.msRequestFullscreen) {
            fullscreenRef.current.msRequestFullscreen();
         }
         setIsFullscreen(true);
      }
   };

   useEffect(() => {
      const exitFullScreenHandler = () => {
         if (!document.fullscreenElement) {
            setIsFullscreen(false);
            toast.error("Do not leave Full Screen. " + `${3 - changeCount} times left`);
            console.log(changeCount);
            setChangeCount((prev) => prev + 1);
         }
      };
      document.addEventListener("fullscreenchange", exitFullScreenHandler);
      document.addEventListener("webkitfullscreenchange", exitFullScreenHandler);
      document.addEventListener("mozfullscreenchange", exitFullScreenHandler);
      document.addEventListener("MSfullscreenchange", exitFullScreenHandler);

      return () => {
         document.removeEventListener("fullscreenchange", exitFullScreenHandler);
         document.removeEventListener("webkitfullscreenchange", exitFullScreenHandler);
         document.removeEventListener("mozfullscreenchange", exitFullScreenHandler);
         document.removeEventListener("MSfullscreenchange", exitFullScreenHandler);
      };
   }, [changeCount]);

   return (
      <>
         <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
         <div
            className="d-flex justify-content-center align-items-center bg-secondary-subtle"
            style={{ height: "100vh" }}
         >
            <button onClick={requestFullScreen} className="btn btn-outline-info fs-1">
               Click to Enter Quiz
            </button>
         </div>
         <div ref={fullscreenRef} className="bg-info">
            {isFullscreen && <QuizStart changeCount={changeCount} />}
         </div>
      </>
   );
};
export default FullScreen;
