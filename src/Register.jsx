import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./supabase-client";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    const { error, data } = await supabase.auth.signUp({ email, password });
    console.log(data);
    localStorage.setItem("token", data);
    if (error) {
      console.error("ERROR IN REGISTER ", error.message);
      return;
    }
    navigate("/");
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center px-3 md:px-0 pt-5 md:pt-10 overflow-hidden">
      <div className="p-2 md:p-6 h-full flex flex-col items-center justify-center w-full md:w-1/3 overflow-hidden">
        <h1 className="font-bold tracking-widest text-[#364153] text-xl md:text-2xl mb-3">
          {loading ? "Please Wait..." : "REGISTER"}
        </h1>

        <form
          className="bg-white p-4 pt-10 space-y-5 w-full min-h-auto border-3 border-t-neutral-400 rounded-2xl border-transparent"
          onSubmit={handleRegister}
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
          <button
            type="submit"
            className="w-full h-10 bg-gradient-to-r from-neutral-400 to-slate-500 text-white  outline-0 rounded font-bold"
          >
            REGISTER
          </button>
          <Link
            to={"/"}
            className="block text-center w-full text-sm md:text-[15px] text-gray-600 hover:underline"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
