import React from "react";
import { Link } from "react-router-dom";

const Templates = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-blue-600">Choose a Template</h1>
      <p className="mt-4 text-lg text-gray-700">
        Select from pre-made templates to quickly start your whiteboard session.
      </p>
      <div className="mt-6 space-x-4">
        <button className="px-6 py-3 bg-purple-500 text-white rounded-lg text-lg shadow-lg hover:bg-purple-600 transition">
          Brainstorming
        </button>
        <button className="px-6 py-3 bg-teal-500 text-white rounded-lg text-lg shadow-lg hover:bg-teal-600 transition">
          Flowchart
        </button>
        <button className="px-6 py-3 bg-orange-500 text-white rounded-lg text-lg shadow-lg hover:bg-orange-600 transition">
          Mind Map
        </button>
      </div>
      <div className="mt-6">
        <Link to="/">
          <button className="px-6 py-3 bg-gray-500 text-white rounded-lg text-lg shadow-lg hover:bg-gray-600 transition">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Templates;
