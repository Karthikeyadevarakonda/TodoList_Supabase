import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, PlusCircle, Save, Trash2, Pencil } from "lucide-react"; // Icons
import supabase from "./supabase-client";

const TaskManagement = () => {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    let result;
    if (editId) {
      result = await supabase
        .from("tasks")
        .upsert({ id: editId, email, age: Number(age) });
    } else {
      result = await supabase.from("tasks").insert({ email, age: Number(age) });
    }

    const { error } = result;
    if (error) {
      console.error("DB error:", error.message);
      return;
    }

    setAge("");
    setEmail("");
    setEditId(null);
    handleDisplay();
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("ERROR IN Delete ", error.message);
      return;
    }
    handleDisplay();
  }

  async function handleUpdate(obj) {
    setEmail(obj.email);
    setAge(obj.age);
    setEditId(obj.id);
  }

  async function handleDisplay() {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("ERROR IN Display ", error.message);
      return;
    }
    setData(data);
  }

  useEffect(() => {
    handleDisplay();
  }, []);

  async function handleLogout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 flex flex-col items-center p-4">
      {/* Logout button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleLogout}
        disabled={loading}
        className={`w-full max-w-xs h-10 mb-6 flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-white rounded-2xl shadow-lg transition-all duration-300 ease-in-out ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-neutral-400 to-slate-500 hover:opacity-90"
        }`}
      >
        <LogOut size={18} />
        {loading ? "Logging out..." : "LOGOUT"}
      </motion.button>

      {/* Form */}
      <motion.form
        layout
        onSubmit={handleSubmit}
        className="w-full max-w-xs flex flex-col gap-3 bg-white p-4 rounded-2xl shadow-md"
      >
        <input
          value={email ?? ""}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <input
          value={age ?? ""}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Age"
          className="px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="py-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neutral-400 to-slate-500 text-white font-semibold shadow hover:opacity-90 transition"
        >
          {editId ? (
            <>
              <Save size={18} /> UPDATE
            </>
          ) : (
            <>
              <PlusCircle size={18} /> ADD
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Task List */}
      <div className="w-full max-w-xs mt-6 flex flex-col gap-4">
        <AnimatePresence>
          {data.map((obj) => (
            <motion.div
              key={obj.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-2xl shadow-md flex justify-between items-center gap-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{obj.email}</p>
                <p className="text-xs text-gray-500">Age: {obj.age}</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleDelete(obj.id)}
                  className="px-2 py-1 flex items-center gap-1 text-xl  text-red-500"
                >
                  <Trash2 size={20} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleUpdate(obj)}
                  className="px-2 py-1 flex items-center gap-1 text-xl text-blue-500"
                >
                  <Pencil size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskManagement;
