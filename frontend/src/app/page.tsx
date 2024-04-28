"use client";

import { useState, useEffect } from "react";
import { KeyboardEvent } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [numResult, setNumResult] = useState("");
  const [finalResult, setFinalResult] = useState("");

  useEffect(() => {
    if (numResult === '0') {
      setFinalResult("Spam");
    } else if (numResult === '1') {
      setFinalResult("Not spam");
    } else if (numResult === '2') {
      setFinalResult("Smishing");
    } else {
      setFinalResult("Unknown");
    }
  }, [numResult]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
    setShowError(false);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === "") {
      setShowError(true);
    } else {
      setModalText(inputValue);
      try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Text: inputValue })
        });
        const data = await response.json();
        setNumResult(data.prediction);
        sentResult();
    } catch (error) {
        console.error('Error:', error);
    }

      //sent to back end and get result as numResult
      //setFinalResult("Spam");
      
    }
  };

  const sentResult = () => {
    //recieve
    //setNumResult(1);
    
    console.log(finalResult);

    openModal();
    setIsLoading(true);
    simulateLoading();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
    setModalText("");
    setInputValue("");
  };

  const simulateLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    // Main content
    <main className="bg-white">
      {/* Header */}
      <div className="gap-4 min-h-[480px] flex flex-col md:flex-row items-center justify-center mx-4 md:mx-8 lg:mx-12">
        {/* Title */}
        <div className="flex flex-col items-center w-full text-3xl md:text-4xl lg:text-5xl mt-20 md:mt-0">
          {/* Title */}
          <div className="text-black merriweather font-normal mb-2 ">
            Message Spam Detector
          </div>
          {/* Subtitle */}
          <div className="text-gray-400 merriweather font-normal mb-2 relative">
            for everyone
            <span className="animate-blink">!</span>
          </div>
        </div>

        {/* Input area */}
        <div className="flex flex-col justify-center items-center m-10">
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
            <div className="font-thin text-xs text-gray-400 m-2 inter">
              Try pasting something!
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10"
          aria-live="assertive"
        >
          <div className="relative bg-white p-8 rounded-lg h-56 w-80 lg:w-96">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Loading or result */}
            {isLoading ? (
              <div className="flex flex-col items-center text-black">
                <span className="loading loading-dots w-20"></span>
                <p className="font-bold text-xl text-black">Analyzing ...</p>
              </div>
            ) : (
              <div className="flex flex-col text-black">
                <div>
                  <p className="font-bold text-xl">Text Input:</p>
                  <div className="mt-2 mb-2 mr-2 border rounded-lg bg-gray-100 max-h-full overflow-y-auto">
                    <p className="whitespace-nowrap m-3">{modalText}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="font-bold text-xl">Result:&nbsp;</p>
                  <p className="text-xl max-h-16">{finalResult}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Background image */}
      <div className="h-96 w-screen relative overflow-hidden">
        <img
          src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
          className="absolute top-0 left-0 transform scale-150 saturate-150"
        />
      </div>
    </main>
  );
}
