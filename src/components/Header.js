import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Header = () => {
    const user = useSelector((store) => store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email , displayName , photoURL} = user;
              // ... dispatch user in store
              dispatch(addUser({uid : uid, email : email, displayName : displayName, photoURL: photoURL}));
              navigate("/browse");
            } else {
              // User is signed out
              // ... remove user from store
              dispatch(removeUser());
              navigate("/");
            }
          });
    }, []);
    
    const handleSignOut = () => {
        signOut(auth).then(() => {})
        .catch((error) => {
            navigate("/errorPage");
        });
    }

    return (
        <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="logo"
                className="w-44"
            />
            {user && (<div className="p-4">
                <img src={user?.photoUrl}
                    alt="img"
                />
                <button onClick={handleSignOut} className="font-bold text-white">sign out</button>
            </div>)}
        </div>
    );
}

export default Header;