export const metadata = {
  title: "About CSP",
  description: "Learn more about Christian Stensøe",
  keywords: "about, christian, stensøe, developer",
};

const AboutPage = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        About{" "}
        <span className="text-blue-600 dark:text-blue-400">Christian</span>
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Christian is a developer passionate about creating modern web
          applications. He is new to the Next.js framework but is quickly
          learning its capabilities.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This website showcases some of his projects and experiences in web
          development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Skills
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>JavaScript / TypeScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Tailwind CSS</li>
            <li>Node.js</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Interests
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Web Development</li>
            <li>Running</li>
            <li>Fitness</li>
            <li>Technology</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
