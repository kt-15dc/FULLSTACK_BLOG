import { Link } from "react-router-dom";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-white px-4 pt-[120px]">
      <div className="bg-[#efeeeb] p-10 rounded-xl w-full max-w-2xl">
        <h2 className="text-center text-sm text-orange-400 font-medium mb-1">
          Admin panel
        </h2>
        <h1 className="text-3xl font-bold text-center mb-8">Log in</h1>

        <form className="space-y-6 w-full flex flex-col items-center">
          {/* Email Field */}
          <div className="w-full flex flex-col items-center">
            <label className="text-sm font-medium mb-1 w-full max-w-96 text-left">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full max-w-96 min-w-64 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* Password Field */}
          <div className="w-full flex flex-col items-center">
            <label className="text-sm font-medium mb-1 w-full max-w-96 text-left">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full max-w-96 min-w-64 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full max-w-48 mt-4 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-all duration-200"
          >
            Log in
          </button>
        </form>


      </div>
    </div>
  );
}
