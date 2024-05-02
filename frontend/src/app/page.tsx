"use client";

import { useState, useEffect } from "react";
import { KeyboardEvent } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [numResult, setNumResult] = useState(1);
  const [finalResult, setFinalResult] = useState("");

  useEffect(() => {
    if (numResult === 0) {
      setFinalResult("Not Spam");
    } else if (numResult === 1) {
      setFinalResult("Smishing");
    } else if (numResult === 2) {
      setFinalResult("Spam");
    } else {
      setFinalResult("Smishing");
    }
  }, [numResult]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      setShowError(true);
    } else {
      setModalText(inputValue);

      //sent to back end and get result as numResult
      //setFinalResult("Spam");
      getResult();
    }
  };

  const getResult = () => {
    //recieve
    setNumResult(0);

    //console.log(finalResult);

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

      <div className="gap-4 flex md:flex-row flex-col items-center justify-center h-[450px] md:h-[480px] ml-0 md:ml-20">
        <div className="md:w-1/2 md:h-full flex items-center justify-center mt-20 md:mt-0">
          <div className="flex flex-col items-center text-3xl md:text-4xl lg:text-5xl whitespace-nowrap">
            {/* Title */}
            <div className="text-black merriweather font-normal mb-2">
              Message Spam Detector
            </div>
            {/* Subtitle */}
            <div className="text-gray-400 merriweather font-normal mb-2 relative">
              for everyone
              <span className="animate-blink">!</span>
            </div>
          </div>
        </div>

        <div className="h-56 w-[480px] md:w-1/2 md:h-full flex items-center justify-center mt-5 md:mt-0">
          <div className="w-9/12 h-full flex flex-col justify-center">
            <div className="h-2/3 relative">
              <textarea
                id="message"
                className={`${
                  showError ? "border-red-500" : "border-gray-300"
                } w-full h-full p-4 border-gray-300 resize-none bg-white rounded-lg border z-0 focus:shadow focus:outline-none`}
                placeholder="Type your message here..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              ></textarea>

              {/* Submit button */}
              <div className="absolute bottom-2 right-3">
                <div className="tooltip" data-tip="Submit">
                  <button
                    className="bg-gray-400 rounded-full hover:bg-gray-500"
                    onClick={handleSubmit}
                    aria-label="Submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="white"
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

            {showError && (
              <div className="font-thin text-xs text-red-500 m-2 text-center">
                The field can't be empty!
              </div>
            )}
            {!showError && (
              <div className="font-thin text-xs text-gray-400 m-2 text-center">
                Try pasting something!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10"
          aria-live="assertive"
        >
          <div
            className={`relative bg-white p-8 rounded-lg ${
              isLoading
                ? "h-48 w-64 md:h-56 md:w-80"
                : "h-72 w-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
            } flex justify-center items-center`}
          >
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
              <div className="text-black">
                <div className="flex flex-col items-center">
                  <span className="loading loading-dots w-16 md:w-20"></span>
                  <p className="font-bold text-xl">Analyzing ...</p>
                </div>
              </div>
            ) : (
              <div className="text-black">
                <div className="flex flex-col items-center m-2">
                  <img
                    src={
                      finalResult === "Spam"
                        ? "spam.png"
                        : finalResult === "Not Spam"
                        ? "not_spam.png"
                        : "smishing.png"
                    }
                    alt={
                      finalResult === "Spam"
                        ? "Spam Image"
                        : finalResult === "Not Spam"
                        ? "Not Spam Image"
                        : "Smishing Image"
                    }
                    className="w-1/2"
                  />
                  <p className="font-bold text-xl max-h-16 flex flex-col text-black items-center">
                    {finalResult}
                  </p>
                </div>
                <div>
                  <p className="text-md">Your Message:</p>
                  <div className="mt-2 mb-2 mr-2 border rounded-lg bg-gray-100 max-h-full overflow-y-auto">
                    <p className="whitespace-nowrap m-2">{modalText}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Background image 
      <div className="h-96 w-screen relative overflow-hidden">
        <img
          src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
          className="absolute top-0 left-0 transform scale-150 saturate-150"
        />
      </div>
      */}
      <div
        className="h-96 w-screen"
        style={{ background: "linear-gradient(70deg, #a855f7, #ec4899)" }}
      ></div>
    </main>
  );
}
