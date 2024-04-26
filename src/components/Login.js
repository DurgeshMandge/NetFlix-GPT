import Header from "./Header";
import { useState, useRef } from "react";
import { validateEmailPass } from "../utils/validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () =>{
    const dispatch = useDispatch();
    const [isSignUp,setIsSignUp] = useState(true);
    const [errorMsg,setErrorMsg] = useState(null);
    const navigate = useNavigate();

    const email = useRef(null);
    const passWord = useRef(null);
    const name = useRef(null)


    const handleOnSubmit = () =>{
        const msg = validateEmailPass(email.current.value,passWord.current.value);
        setErrorMsg(msg)
        if(errorMsg) return;
        
        //login - Authentication
        if(isSignUp){
            // sign up
            
            createUserWithEmailAndPassword(
                auth, 
                email.current.value, 
                passWord.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/117802796?v=4"
                      })
                      
                      .then(() => {
                        // Profile updated!
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({uid : uid, email : email, displayName : displayName, photoURL: photoURL}));
                        navigate("/browse")
                      }).catch((error) => {
                        // An error occurred
                        setErrorMsg(error)
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode," : ",errorMessage)
                });

        }else{
            // sign in

            signInWithEmailAndPassword(auth, 
                email.current.value, 
                passWord.current.value
            )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/117802796?v=4"
                      }).then(() => {
                        // Profile updated!
                        navigate("/browse")
                      }).catch((error) => {
                        // An error occurred
                        setErrorMsg(error)
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode," : ",errorMessage)
                });
            }

    }

    const handleFormToggle = () =>{
        setIsSignUp(!isSignUp)
    }

    return (
        <div>
            <Header/>
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="bg"
                />
            </div>
        <form onSubmit={(e)=>e.preventDefault()} className="absolute w-1/4 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignUp?"Sign-Up":"Sign-In"}</h1>
                {isSignUp && <input
                    ref={name}
                    type="text" 
                    placeholder="Full Name" 
                    className="p-4 my-4 w-full bg-gray-700"
                />}
                <input 
                    ref={email}
                    type="text" 
                    placeholder="email" 
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <input 
                    ref={passWord}
                    type="password" 
                    placeholder="password" 
                    className="p-4 my-4 w-full bg-gray-700"
                />
                {errorMsg && <p className="text-red-500 font-bold py-2 text-lg">{errorMsg}</p>}
                <button 
                    className="p-4 my-4 bg-red-700 w-full"
                    onClick={handleOnSubmit}
                >
                    {isSignUp?"Sign-Up":"Sign-In"}
                </button>
                <p className="py-6 cursor-pointer" onClick={handleFormToggle}>
                    {isSignUp
                        ?"Already regestered ? Sign-In"
                        :"No Account? Sign Up Now !!"
                    }
                </p>
            </form>
        </div>
    );
}

export default Login;