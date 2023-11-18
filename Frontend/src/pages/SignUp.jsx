import { useState } from "react";
import GoogleLogo from "../assets/google";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
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
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
    } else if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
    } else {
      // Simulate form submission (replace with actual logic)
      console.log("Form submitted:", formData);
      setError(""); // Clear error
    }
  };

  const handleAgreementChange = () => {
    setFormData({ ...formData, agreed: !formData.agreed });
  };

  return (
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
          <div className="flex items-center">
            <input
              id="agreed"
              name="agreed"
              checked={formData.agreed}
              onChange={handleAgreementChange}
              className="rounded border border-gray-300 p-2"
              type="checkbox"
              required
            />
            <label htmlFor="agreed" className="ml-3 text-gray-600">
              I agree to
              <a href="/terms" className="text-blue-600">
                &nbsp;terms & conditions
              </a>
            </label>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
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
