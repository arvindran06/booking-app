import SignUp from "./components/Signup";
import LogIn from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hotels from "./components/Hotels";
import UserBookings from "./components/UserBookings";
import Profile from "./components/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/userbookings" element={<UserBookings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )

}