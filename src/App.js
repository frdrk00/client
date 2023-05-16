import {Route, Routes, useNavigate} from "react-router-dom"
import { Dashboard, Login, Main } from "./containers"
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useEffect, useState } from "react";
import { validateUserJWTToken } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion"
import { fadeInOut } from "./animations";
import { Alert, MainLoader } from "./components";

const App = () => {
  const dispatch = useDispatch()
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const alert = useSelector(state => state.alert)

  useEffect(() => {
    setIsLoading(true)
        firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data))
            });
          });
        }

        setInterval(() => {
          setIsLoading(false)
        }, 1500)
      });
  }, []);


  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
        {isLoading && (
          <motion.div {...fadeInOut} className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full">
            <MainLoader />
          </motion.div>
        )}
        <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        
        {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  )
}

export default App