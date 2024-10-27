import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import './CodeScreen.css';

const App = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [question, setQuestion] = useState("Write a function that returns the sum of two numbers.");

  const questions = [
    "Write a function that returns the sum of two numbers.",
    "Write a function that multiplies two numbers.",
    "Write a function that finds the maximum of an array.",
    "Write a function that reverses a string.",
    "Write a function that checks if a number is prime.",
    "Write a function that sorts an array.",
    "Write a function that removes duplicates from an array.",
    "Write a function that converts Celsius to Fahrenheit.",
    "Write a function that calculates the factorial of a number.",
    "Write a function that merges two sorted arrays."
  ];

  const languages = [
    //{ label: 'JavaScript', value: 'javascript', id: 63 },
    { label: 'Python', value: 'python', id: 71 },
    { label: 'C++', value: 'cpp', id: 53 },
    //{ label: 'Java', value: 'java', id: 62 },
    //{ label: 'Rust', value: 'rust', id: 73 },
    // c eklenecek
  ];

  const handleCompile = () => {
    if (!code.trim()) {
      setOutput('Please write some code to compile.');
      return;
    }
  
    setLoading(true);
    setOutput('');
  
    console.log("code:" + code );

    axios.post('http://185.224.139.118:5000/compile', {
        code: code,
        language: language,
      }, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        //console.log(response.data.output)
        setOutput(response.data.output.output || 'No output received.');
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setOutput('Error compiling code. Please try again.');
        setLoading(false);
      });
  };
  
  
  

  const handleSubmit = () => {
    if (!code.trim()) {
      setSubmissionMessage('Please write and run code before submitting.');
      return;
    }
    setSubmissionMessage('Code submitted successfully!');
    setCode('');
  };

  const handleButtonClick = (index) => {
    setQuestion(questions[index]); // Update the question based on button index
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 p-4 pl-8">
      {/* Number buttons container */}
      <div className="number-buttons-container flex flex-col gap-2 absolute left-1 top-1/3 transform -translate-y-1/2">
        {[...Array(10).keys()].map((num) => (
          <button
            key={num}
            className="bg-gray-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => handleButtonClick(num)} // Update question on button click
          >
            {num + 1}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Hiring Question</h3>
          <p className="text-gray-300">{question}</p>
        </div>

        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Select Language: </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="editor-container mb-4">
            <Editor
              height="300px"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(newCode) => setCode(newCode)}
              className="border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleCompile}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? 'Running...' : 'Run Code'}
          </button>

          <button
            onClick={handleSubmit}
            className="mt-6 ml-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit Code
          </button>

          {submissionMessage && (
            <div className="submission-message mt-4 text-green-600 font-medium">
              {submissionMessage}
            </div>
          )}

          <div className="terminal mt-6 bg-black text-white p-4 rounded-lg shadow-lg">
            <h4 className="text-sm font-medium text-gray-300">Output:</h4>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
