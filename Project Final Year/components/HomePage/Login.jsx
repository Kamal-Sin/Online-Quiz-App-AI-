import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const Login = (props) => {
   const [showSpinner, setShowSpinner] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loginError, setLoginError] = useState("");
   const [passVisible, setPassVisible] = useState(false);

   const [firstName, setFirstName] = useState();
   const [lastName, setLastName] = useState();

   const [showRegister, setShowRegister] = useState(false);
   async function login(e) {
      setShowSpinner(true);
      let url = "http://localhost:8000/user/login";
      e.preventDefault();
      try {
         const data = {
            email: email,
            password: password,
         };
         const res = await fetch(url, {
            method: "POST",
            headers: {
               "Content-type": "application/json",
            },
            body: JSON.stringify(data),
         });
         if (res.status === 404) {
            setLoginError("User Not Found!");
         } else if (res.status === 400) {
            setLoginError("Password is incorrect!");
         } else if (res.status === 200) {
            const id = await res.json();
            localStorage.setItem("pid", id["id"]);

            props.onLogin(id["username"]);
         }
         setShowSpinner(false);
      } catch (error) {
         setShowSpinner(false);
         setLoginError("Something Went Wrong! Try Again");
         console.log(error);
      }
   }

   async function register(e) {
      setShowSpinner(true);
      e.preventDefault();
      const url = "http://localhost:8000/user/register";
      const data = {
         email: email,
         password: password,
         firstName: firstName,
         lastName: lastName,
      };
      try {
         const res = await fetch(url, {
            body: JSON.stringify(data),
            headers: {
               "Content-Type": "application/json",
            },
            method: "POST",
         });
         if (res.status === 409) {
            setLoginError("Email already registered");
         } else if (res.status === 201) {
            setLoginError("Registered. Login with your account");
            setShowRegister(false);
         }
      } catch (error) {
         console.log(error);
         setLoginError("Something went wrong...");
      }
      setShowSpinner(false);
   }

   return (
      <>
         {props.loginVisible && !props.isLoggedIn && (
            <div className="login-form">
               {!showRegister && (
                  <form onSubmit={(e) => login(e)}>
                     <div className="login-title">
                        <h3>Login</h3>
                        <button
                           type="button"
                           className="btn-close"
                           aria-label="Close"
                           onClick={() => {
                              props.setVisibilty(false);
                              setLoginError("");
                              setEmail("");
                              setPassword("");
                           }}
                        ></button>
                     </div>
                     <div>
                        <p style={{ color: "red", fontWeight: "700" }}>{loginError}</p>
                     </div>
                     <div className="form-inputs">
                        <div className="mb-3 form-email">
                           <label htmlFor="exampleInputEmail1" className="form-label">
                              Email address
                           </label>
                           <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              value={props.login}
                              onChange={(e) => {
                                 setEmail(e.target.value);
                              }}
                           />
                           <div id="emailHelp" className="form-text">
                              We'll never share your email with anyone else.
                           </div>
                        </div>
                        <div className="mb-3 form-password">
                           <label htmlFor="exampleInputPassword1" className="form-label">
                              Password
                           </label>
                           <div className="d-flex">
                              <input
                                 type={passVisible ? "text" : "password"}
                                 className="form-control"
                                 id="exampleInputPassword1"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="ps-2 mt-2 d-flex">
                                 {passVisible && (
                                    <i
                                       className="bi bi-eye-fill fs-5"
                                       onClick={() => setPassVisible(false)}
                                    ></i>
                                 )}
                                 {!passVisible && (
                                    <i
                                       className="bi bi-eye-slash-fill fs-5"
                                       onClick={() => setPassVisible(true)}
                                    ></i>
                                 )}
                              </div>
                           </div>
                        </div>

                        {showSpinner && (
                           <div
                              className="spinner"
                              style={{ alignSelf: "center", marginBottom: "20px" }}
                           >
                              <Spinner />
                           </div>
                        )}
                        <button type="submit" className="btn btn-success">
                           Login
                        </button>
                     </div>
                     <button
                        className="btn btn-danger p-1 px-2 mb-3"
                        onClick={() => setShowRegister(true)}
                     >
                        Register
                     </button>
                  </form>
               )}

               {showRegister && (
                  <form onSubmit={(e) => register(e)}>
                     <div className="login-title">
                        <h3>Register</h3>
                        <button
                           type="button"
                           className="btn-close"
                           aria-label="Close"
                           onClick={() => {
                              props.setVisibilty(false);
                              setLoginError("");
                              setEmail("");
                              setPassword("");
                           }}
                        ></button>
                     </div>
                     <div>
                        <p style={{ color: "red", fontWeight: "700" }}>{loginError}</p>
                     </div>
                     <div className="form-inputs" style={{ width: "initial " }}>
                        <div className="d-flex w-100">
                           <div className="d-flex flex-column me-4">
                              <label htmlFor="first-name">First Name:</label>
                              <input
                                 type="text"
                                 name="first-name"
                                 id="first-name"
                                 onChange={(e) => setFirstName(e.target.value)}
                              />
                           </div>
                           <div className="d-flex flex-column">
                              <label htmlFor="last-name">Last Name:</label>
                              <input
                                 type="text"
                                 name="last-name"
                                 id="last-name"
                                 onChange={(e) => setLastName(e.target.value)}
                              />
                           </div>
                        </div>
                        <div className="mb-3 form-email">
                           <label htmlFor="exampleInputEmail1" className="form-label">
                              Email address
                           </label>
                           <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              value={props.login}
                              onChange={(e) => {
                                 setEmail(e.target.value);
                              }}
                           />
                           <div id="emailHelp" className="form-text">
                              We'll never share your email with anyone else.
                           </div>
                        </div>
                        <div className="mb-3 form-password">
                           <label htmlFor="exampleInputPassword1" className="form-label">
                              Password
                           </label>
                           <div className="d-flex">
                              <input
                                 type={passVisible ? "text" : "password"}
                                 className="form-control"
                                 id="exampleInputPassword1"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="ps-2 mt-2 d-flex">
                                 {passVisible && (
                                    <i
                                       className="bi bi-eye-fill fs-5"
                                       onClick={() => setPassVisible(false)}
                                    ></i>
                                 )}
                                 {!passVisible && (
                                    <i
                                       className="bi bi-eye-slash-fill fs-5"
                                       onClick={() => setPassVisible(true)}
                                    ></i>
                                 )}
                              </div>
                           </div>
                        </div>
                        {showSpinner && (
                           <div
                              className="spinner"
                              style={{ alignSelf: "center", marginBottom: "20px" }}
                           >
                              <Spinner />
                           </div>
                        )}
                        <button type="submit" className="btn btn-success">
                           Register
                        </button>
                     </div>
                     <button
                        className="btn btn-danger p-1 px-2 mb-3"
                        onClick={() => setShowRegister(false)}
                     >
                        Login
                     </button>
                  </form>
               )}
            </div>
         )}
      </>
   );
};

export default Login;
