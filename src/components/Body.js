import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const Body = () =>{
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Login/>
        },
        {
            path : "/browse",
            element : <Browse/>
        }
    ])

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email , displayName , photoURL} = user;
              // ... dispatch user in store
              dispatch(addUser({uid : uid, email : email, displayName : displayName, photoURL: photoURL}));
            } else {
              // User is signed out
              // ... remove user from store
              dispatch(removeUser());
            }
          });
    }, []);

    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
 }

 export default Body;