"use client";

import { useState } from "react";
import { KeyboardEvent } from "react";
import { ChangeEvent } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      setShowError(true); // Show error if input is empty
    } else {
      // Handle submission
      console.log(inputValue);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const checkbox = event.target as HTMLInputElement;
    const checkboxes = document.querySelectorAll<HTMLInputElement>(".checkbox");
    checkboxes.forEach((cb) => {
      if (cb !== checkbox) {
        cb.checked = false;
      }
    });
  }

  return (
    <main className="bg-white">
      <div className="gap-4 min-h-[480px] flex flex-col md:flex-row-reverse items-center justify-center mx-4 md:mx-8 lg:mx-12">
        {/* Title */}
        <div className="flex flex-col items-center w-full text-3xl md:text-4xl lg:text-5xl mt-20 md:mt-0">
          {/* Title */}
          <div className="text-black merriweather font-normal mb-2 ">
            Help us Improve
          </div>
          {/* Subtitle */}
          <div className="text-gray-400 merriweather font-normal mb-2 relative">
            Our Model
            <span className="animate-blink">!</span>
          </div>
          <div className="form-control m-4 w-28">
            <div className="label cursor-pointer border rounded-xl my-1">
              <label className="label-text text-gray-400">Spam</label>
              <input
                type="checkbox"
                name="spam"
                className="checkbox"
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="label cursor-pointer border rounded-xl my-1">
              <label className="label-text text-gray-400">Not Spam</label>
              <input
                type="checkbox"
                name="not-spam"
                className="checkbox"
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="label cursor-pointer border rounded-xl my-1">
              <label className="label-text text-gray-400">Smashing</label>
              <input
                type="checkbox"
                name="smashing"
                className="checkbox"
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="flex flex-col justify-center items-center mb-6 md:m-10">
          {/* Input field */}
          <div className="relative">
            {/* Search icon */}
            <div className="absolute top-4 left-30">
              <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
            </div>
            {/* Textarea */}
            <div className="max-w-2xl mx-auto">
              <textarea
                id="message"
                className={`${
                  showError ? "border-red-500" : "border-gray-300"
                } pr-14 block p-2.5 transform lg:w-[520px] md:w-[400px] w-[300px] md:h-[300px] h-[120px] text-md text-gray-700 bg-white rounded-lg border border-gray-300 z-0 focus:shadow focus:outline-none`}
                placeholder="paste your message here"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              ></textarea>
            </div>
            {/* Submit button */}
            <div className="absolute bottom-2 right-3">
              <div className="tooltip" data-tip="Submit">
                <button
                  className="bg-gray-400 rounded-full hover:transition duration-500 hover:bg-gray-500"
                  onClick={handleSubmit}
                  aria-label="Submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="white"
                    className="bi bi-arrow-right-short"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Error messages */}
          {showError && (
            <div className="font-thin text-xs text-red-500 m-2 inter">
              The field can't be empty!
            </div>
          )}
          {!showError && (
            <div className="font-thin text-xs text-gray-400 m-2 inter"></div>
          )}
        </div>
      </div>
      <div
        className="h-96 w-screen"
        style={{ background: "linear-gradient(70deg, #a855f7, #ec4899)" }}
      ></div>
    </main>
  );
}
