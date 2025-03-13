import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Messege from "./components/Messege";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store/AuthStore";

function App() {
  const { authUser } = useAuthStore();
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: !authUser ? <Login /> : <Navigate to="/message" />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/message",
        element: authUser ? <Messege /> : <Navigate to="/login" />,
      },
      { path: "*", element: <Navigate to="/" /> },
    ],
    {
      future: {
        v7_normalizeFormMethod: true,
        v7_relativeSplatPath: true,
        v7_partialHydration: true,
        v7_fetcherPersist: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
  return (
    <main className="bg-zinc-950 h-screen">
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
      <ToastContainer />
    </main>
  );
}

export default App;
