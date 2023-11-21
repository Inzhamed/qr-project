import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Qrcode from "./Qrcode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={SignIn} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/qrcode" Component={Qrcode} />
      </Routes>
    </Router>
  );
}

export default App;
