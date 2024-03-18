"use client";

import { useState, useEffect } from "react";
import { KeyboardEvent } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [finalResult, setFinalResult] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      setShowError(true);
    } else {
      setModalText(inputValue);
      setFinalResult("Spam");
      openModal();
      setIsLoading(true);
      simulateLoading();
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
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
    <main>
      <div className="flex flex-col items-center ml-2 mr-2 mt-10 mb-0 md:mt-20 md:ml-5 md:mr-5 lg:mt-20 lg:ml-24 lg:mr-24">
        <div className="flex flex-col items-center w-full m-10">
          <div className="text-black text-4xl merriweather font-normal m-2 md:text-5xl lg:text-6xl">
            Message Spam Detector
          </div>
          <div className="text-gray-400 text-4xl merriweather font-normal m-2 md:text-5xl lg:text-6xl relative">
            for everyone
            <span className="animate-blink">!</span>
          </div>
        </div>
        <div>
          <div className="container flex justify-center items-center">
            <div className="relative">
              <div className="absolute top-4 left-3">
                <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
              </div>
              <input
                type="text"
                className={`inter font-light text-base border ${
                  showError ? "border-red-500" : "border-gray-300"
                } h-12 w-96 pl-6 pr-20 md:h-12 md:w-96 md:pl-6 md:pr-20 rounded-full z-0 focus:shadow focus:outline-none`}
                placeholder="paste your message here"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <div className="absolute top-2 right-2">
                <button
                  className="bg-gray-400 rounded-full hover:transition duration-500 hover:bg-gray-500"
                  onClick={handleSubmit}
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
        </div>

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

        {/*
        <div
          className="mt-8 h-96 w-screen"
          style={{ background: 'linear-gradient(70deg, #a855f7, #ec4899)' }}
        />     
        */}

        <div className="mt-10 h-96 w-screen relative overflow-hidden">
          <img
            src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
            className="absolute top-0 left-0 transform scale-150 saturate-150"
          />
        </div>

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative bg-white p-8 rounded-lg h-48 w-96 overflow-hidden">
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

              <div className="flex justify-center">
                <div className="flex flex-col justify-center">
                  {isLoading ? (
                    <>
                      <span className="loading loading-dots loading-lg w-20"></span>
                      <p className="font-bold text-xl">Analyzing ...</p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center m-2">
                        <p className="font-bold text-xl">Text Input:</p>

                        <p className="text-xl overflow-auto max-h-16">
                          {modalText}
                        </p>
                      </div>

                      <div className="flex items-center m-3">
                        <p className="font-bold text-xl">Result:&nbsp;</p>

                        <p className="text-xl overflow-auto max-h-16">
                          {finalResult}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
