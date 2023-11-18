import { useState } from "react";
import GoogleLogo from "../assets/google";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
    } else {
      console.log("Form submitted:", formData);
      setError("");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <section className="w-80 flex flex-col gap-3">
        <header className="mb-6 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800">
            Welcome to our event!
          </h2>
          <h3 className="text-gray-500">Login by Your Secure Account</h3>
        </header>
        <div className="flex justify-between gap-3">
          <button className="flex justify-start items-center p-0.5 rounded bg-blue-500 flex-1">
            <span aria-hidden="true">
              <GoogleLogo />
            </span>
            <span className="text-white font-bold ml-10">
              Sign in with Google
            </span>
          </button>
        </div>
        <div className="flex justify-between items-center">
          <hr className="flex-1" />
          <div className="mx-3 py-3 text-gray-500 text-xs font-semibold">
            Or
          </div>
          <hr className="flex-1" />
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end">
            <a
              href="/"
              className="text-blue-600 text-sm underline hover:opacity-80"
            >
              Forgot password?
            </a>
          </div>
          <button className="rounded bg-blue-600 text-white p-2" type="submit">
            Sign in
          </button>
          <div className="flex justify-center">
            <span className="text-gray-500 text-sm">
              Don't have an account?
            </span>
            <Link
              to="/signup"
              className="text-blue-600 text-sm ml-1 hover:opacity-80 font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
