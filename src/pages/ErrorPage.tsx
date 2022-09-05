import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  let navigate = useNavigate();

  // Redirect to home page after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  }, []);

  return (
    <section className="container flex min-h-screen items-center justify-center">
      <p className="text-2xl font-light">Oh no! Page not found</p>
    </section>
  );
};

export default ErrorPage;
