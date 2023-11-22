import { useState } from "react";
import GoogleLogo from "../assets/google";
import { Link } from "react-router-dom";
import Qrcode from "./Qrcode";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupError, setSignupError] = useState("");
  const [logged, setLogged] = useState("false");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setSignupError("Please fill in all fields.");
    } else if (formData.password !== formData.confirmPassword) {
      setSignupError("Passwords do not match.");
    } else {
      try {
        const response = await fetch('YOUR_BACKEND_SIGNUP_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          // backend returns a token upon successful signup
          localStorage.setItem('token', data.token); // Store token in localStorage
          setSignupError('');
          console.log('User signed up:', data.user); 
          setLogged(true);
        } else {
          setSignupError('Signup failed. Please try again.');
        }
      } catch (error) {
        console.error('Signup failed:', error);
        setSignupError('Signup failed. Please try again.');
      }
    }
  };

  return (
    logged? <Qrcode email={formData.email}/> :
    <div className="h-screen flex justify-center mt-14">
      <section className="w-80 flex flex-col gap-2">
        <div className="flex justify-end mb-6 w-80">
          <span className="text-gray-500 text-sm">
            Already have an account?
          </span>
          <Link
            to="/"
            className="text-blue-600 text-sm ml-1 font-semibold hover:opacity-80"
          >
            Sign In
          </Link>
        </div>
        <header className="mb-5 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Create Your Account
          </h2>
          <h3 className="text-gray-500">We kindly ask for your information.</h3>
        </header>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded border border-gray-300 p-2"
            placeholder="Email"
            type="email"
            required
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="rounded border border-gray-300 p-2"
            placeholder="Password"
            type="password"
            required
          />
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="rounded border border-gray-300 p-2"
            placeholder="Confirm Password"
            type="password"
            required
          />
          {signupError && <div className="text-red-500 text-sm">{signupError}</div>}
          <button
            className="rounded bg-blue-600 text-white p-2 mt-2"
            type="submit"
          >
            Register Account
          </button>
        </form>
        <div className="flex justify-between items-center">
          <hr className="flex-1" />
          <div className="mx-3 py-3 text-gray-500 text-xs font-semibold">
            Or
          </div>
          <hr className="flex-1" />
        </div>
        <button className="rounded shadow-md flex items-center pl-10">
          <span aria-hidden="true">
            <GoogleLogo />
          </span>
          <span className="text-black font-medium ml-4">
            Register with Google
          </span>
        </button>
      </section>
    </div>
  );
};

export default SignUp;

