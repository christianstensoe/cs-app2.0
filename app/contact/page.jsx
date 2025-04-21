import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Christian Stensøe",
  keywords: "contact, email, message",
};

const ContactPage = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Contact <span className="text-blue-600 dark:text-blue-400">Me</span>
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Feel free to reach out if you have any questions, want to collaborate
          on a project, or just want to say hello!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>christian@example.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <FaPhone className="text-blue-600 dark:text-blue-400 text-xl" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>+47 123 45 678</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-xl" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>Oslo, Norway</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Send a Message
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Your email"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
