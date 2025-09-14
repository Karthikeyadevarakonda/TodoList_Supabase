import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./supabase-client";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // <-- new state

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
    <div className="flex flex-col gap-3 items-center justify-center px-3 md:px-0 md:pt-20">
      <div className="p-2 md:p-6 h-full flex flex-col items-center justify-center w-full md:w-1/3">
        <h1 className="font-bold tracking-widest text-[#364153] text-2xl mb-3">
          LOGIN FORM
        </h1>
        <form
          className="bg-white p-4 pt-10 space-y-5 w-full min-h-auto border-3 border-t-neutral-400 rounded-2xl border-transparent"
          onSubmit={handleLogin}
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#cad5e2] sm:text-sm/6"
            placeholder="Enter Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#cad5e2] sm:text-sm/6"
            placeholder="Enter Password"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Button with loading state */}
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
      </div>
    </div>
  );
};

export default Login;
