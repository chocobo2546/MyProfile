import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes";
import { QueryProvider } from "./QueryProvider";
import { useAuthStore } from "../store/authStore";

function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
