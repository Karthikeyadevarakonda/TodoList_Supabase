import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./supabase-client";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Google OAuth login
  async function signUpwithOAuth() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("ERROR IN GOOGLE SIGN UP:", error.message);
      setError("Google login failed. Try again.");
      return;
    }
  }

  // Email/password login
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      console.error("ERROR IN SIGNIN ", error.message);
      setError("Invalid login credentials");
      return;
    }
    navigate("/taskManagement");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-3 md:px-0 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="font-bold tracking-widest text-[#364153] text-2xl text-center mb-6">
          LOGIN FORM
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cad5e2] sm:text-sm"
            placeholder="Enter Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cad5e2] sm:text-sm"
            placeholder="Enter Password"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-10 flex items-center justify-center rounded font-bold text-white transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-neutral-400 to-slate-500 hover:opacity-90"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "LOG-IN"
            )}
          </button>

          <Link
            to="/register"
            className="block text-center w-full text-sm md:text-[15px] text-gray-600 hover:underline"
          >
            Don't Have an Account? Register
          </Link>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 my-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="text-gray-500 text-sm">OR</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={signUpwithOAuth}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm md:text-base font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 active:scale-95"
        >
          <FcGoogle className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-gray-700">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
