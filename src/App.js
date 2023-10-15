import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./componets/Navbar";
import "./index.css";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Protected from "./componets/Protected";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
          <Route path="/netflix-n-chill" element={<Navigate to="/" />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
