import Login from "./Login";
import Register from "./Register";
import TaskManagement from "./TaskManagement";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import IsAuth from "./IsAuth";
import NotAuth from "./NotAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <NotAuth>
              <Login />
            </NotAuth>
          }
        />
        <Route
          path="/register"
          element={
            <NotAuth>
              <Register />
            </NotAuth>
          }
        />

        <Route
          path="/taskManagement"
          element={
            <IsAuth>
              <TaskManagement />
            </IsAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
