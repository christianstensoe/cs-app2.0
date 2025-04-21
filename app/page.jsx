import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="py-12">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">
            CS Technologies
          </span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
          {/* Content will be added here */}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/about"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            About Me
            <FaArrowRight className="ml-2" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            View Projects
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Web Development
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {/* Content will be added here */}
          </p>
          <Link
            href="/projects"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Learn more →
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Strava Integration
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {/* Content will be added here */}
          </p>
          <Link
            href="/strava"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Learn more →
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Contact
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {/* Content will be added here */}
          </p>
          <Link
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Learn more →
          </Link>
        </div>
      </section>
    </div>
  );
}
