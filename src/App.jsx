import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

// Componets :
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import ForgetPassword from './Pages/Auth/ForgetPassword/ForgetPassword';

// Redux :
import { useDispatch, useSelector } from 'react-redux';
import { userDataActions } from 'Redux/Slice/userData';

// APIs :
import { GetProfileDataAPI } from 'API/user';
// Helpers :
import { ToastContainer } from "react-toastify";

// CSS :
import 'react-toastify/dist/ReactToastify.css';






const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
const AuthRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  let Dispatch = useDispatch()

  let token = localStorage.getItem("everooToken")
  let tokenTime = Number(localStorage.getItem("tokenTime")) + 3000000
  let expireTime = new Date().getTime()

  let AuthToken = token ?? null

  let RefreshAPIs = useSelector(state => state.refreshAPIs)

  const gettingProfileData = async () => {
    let res = await GetProfileDataAPI()
    if (res.error != null) {

    } else {
      let userData = res.data?.result;
      Dispatch(userDataActions.setUserData(userData))
      localStorage.setItem("everooUserData", JSON.stringify(userData))
      // localStorage.setItem("tokenTime", new Date().getTime())
    }
  }
  useEffect(() => {
    if (AuthToken && expireTime < tokenTime) {
      gettingProfileData()
    } else {
      localStorage.clear();
    }
  }, [RefreshAPIs?.userData])

  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      // theme="dark"
      />
      <Routes>
        <Route path='login' element={<AuthRoute user={AuthToken}> <Login /> </AuthRoute>} />
        <Route path='forget' element={<AuthRoute user={AuthToken}> <ForgetPassword /> </AuthRoute>} />
        <Route path='dashboard/*' element={<ProtectedRoute user={AuthToken}> <Dashboard /></ProtectedRoute>} />
        <Route path='*' element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;