import Header from "./Header";
import { useState } from "react";

const Login = () =>{

    const [isSignUp,setIsSignUp] = useState(false);

    const handleClick = () =>{
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
        <form className="absolute w-1/4 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignUp?"Sign-Up":"Sign-In"}</h1>
                {isSignUp && <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="p-4 my-4 w-full bg-gray-700"
                />}
                <input 
                    type="text" 
                    placeholder="email" 
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <button 
                    className="p-4 my-4 bg-red-700 w-full"
                >
                    {isSignUp?"Sign-Up":"Sign-In"}
                </button>
                <p className="py-6 cursor-pointer" onClick={handleClick}>
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