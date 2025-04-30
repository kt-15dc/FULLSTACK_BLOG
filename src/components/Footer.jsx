import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#F9F8F6] rounded-lg shadow-sm dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:flex-row sm:items-center sm:justify-between flex flex-col items-center justify-center">
            <div className="flex items-center mb-6 sm:mb-0 gap-3 font-medium text-gray-600 dark:text-gray-400">
              <a href="#" className="text-xs">
                Get in touch
              </a>
              <div className="flex gap-2">
                <a href="">
                  <i className="bx bxl-github text-xl hover:text-gray-800"></i>
                </a>
                <a href="">
                  <i className="bx bxl-linkedin-square text-xl hover:text-gray-800"></i>
                </a>
                <a href="">
                  <i className="bx bxl-twitter text-xl hover:text-gray-800"></i>
                </a>
              </div>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 flex items-center justify-center">
            © 2025 FEIBITE. All Rights Reserved.
          </span>
        </div>
      </footer>
    )
}
export default Footer;
  