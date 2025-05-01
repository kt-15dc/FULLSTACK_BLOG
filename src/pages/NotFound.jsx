import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white text-black">
      <Info className="w-15 h-15 text-black hover:text-blue-500 transition-colors duration-200 mb-4" />

      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 cursor-pointer transition duration-300"
      >
        Go To Homepage
      </button>
    </div>
  );
}
