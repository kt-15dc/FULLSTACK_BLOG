import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s\-']+$/.test(formData.name)) {
      newErrors.name = "Name contains invalid characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9._]{3,20}$/.test(formData.username)) {
      newErrors.username =
        "Username must be 3–20 characters and can contain letters, numbers, dots, or underscores";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email must be a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" }); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("✅ Submit form:", formData);
      // proceed with real submission
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-start justify-center bg-white px-4 pt-[120px]">
        <div className="bg-[#efeeeb] p-10 rounded-xl w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8">Sign up</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full flex flex-col items-center"
          >
            {[
              { label: "Full name", name: "name" },
              { label: "Username", name: "username" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name} className="w-full flex flex-col items-center">
                <label
                  htmlFor={name}
                  className="text-sm font-medium mb-1 w-full max-w-96 text-left"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange(name)}
                  placeholder={label}
                  className={`w-full max-w-96 min-w-64 rounded-md px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 transition ${
                    errors[name]
                      ? "border border-red-500 focus:ring-red-500"
                      : "border border-gray-300 focus:ring-black"
                  }`}
                />

                {errors[name] && (
                  <span className="text-sm text-red-500 mt-1 w-full max-w-96 text-left">
                    {errors[name]}
                  </span>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full max-w-48 mt-4 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-all duration-200"
            >
              Sign up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black underline hover:text-gray-800"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
