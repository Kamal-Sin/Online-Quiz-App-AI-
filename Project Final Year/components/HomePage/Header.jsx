import { useEffect, useState } from "react";
import menuButtonImage from "../../assets/menu button.jpg";
import { Link } from "react-router-dom";
import Login from "./Login";

function Header() {
   const [activeMenu, setActiveMenu] = useState("home");
   const menuItems = ["Home", "Practice", "Creations", "Recents"];
   const [showNavbar, setShowNavbar] = useState(false);
   const clickLogout = () => {
      localStorage.removeItem("pid");
      setUser("");
   };

   const [loginVisible, setLoginVisible] = useState(false);
   const [user, setUser] = useState("");
   const onLogin = (username) => {
      setUser(username);
      setLoginVisible(false);
   };

   const getUser = async () => {
      const url = "http://localhost:8000/user/getUser";
      const pid = localStorage.getItem("pid");
      if (pid !== null)
         try {
            const res = await fetch(url, {
               headers: {
                  pid: pid,
               },
            });

            if (res.status === 401) {
               setUser("");
            } else if (res.status === 200) {
               const data = await res.text();
               setUser(data);
            }
         } catch (error) {
            // console.log("Some error occured");
            // // console.log(error);
         }
   };
   const setVisibilty = (bool) => {
      setLoginVisible(bool);
   };

   useEffect(() => {
      if (loginVisible) {
         document.body.classList.add("no-scroll");
      } else {
         document.body.classList.remove("no-scroll");
      }
   }, [loginVisible]);

   useEffect(() => {
      getUser();
   });

   return (
      <div className="header">
         <div className="app-title">
            <h1>Quiz Web Application</h1>
            <button onClick={() => setShowNavbar(!showNavbar)}>
               <img src={menuButtonImage} />
            </button>
         </div>
         <div style={{ height: "90px" }}>
            <nav className="app-navbar" style={{ display: showNavbar ? "flex" : "" }}>
               <ul>
                  {menuItems.map((item) => (
                     <li
                        key={item}
                        className={activeMenu === item ? "active" : ""}
                        onClick={() => setActiveMenu(item)}
                     >
                        <Link
                           to={`/${item === "Home" ? "" : item}`}
                           onClick={(e) => {
                              // e.preventDefault();
                           }}
                        >
                           {item}
                        </Link>
                     </li>
                  ))}
               </ul>
               <h3>
                  {user === "" ? (
                     <Link
                        to=""
                        onClick={(e) => {
                           e.preventDefault();
                           setVisibilty(true);
                        }}
                     >
                        Login/Register
                     </Link>
                  ) : (
                     <div className="header-logout">
                        <button>{user}</button>

                        <button
                           className="header-logout-button"
                           style={{ padding: "0px", height: "30px" }}
                           onClick={() => clickLogout()}
                        >
                           <p style={{ marginBottom: "0" }}>Log out</p>
                        </button>
                     </div>
                  )}
               </h3>
            </nav>
         </div>
         <Login loginVisible={loginVisible} setVisibilty={setVisibilty} onLogin={onLogin} />
      </div>
   );
}

export default Header;
