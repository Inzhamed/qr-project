import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Routes>
    </Router>
  );
}

export default App;
