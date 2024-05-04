"use client";

import { useState, useEffect } from "react";
import { KeyboardEvent } from "react";
import { ChangeEvent } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputType, setInputType] = useState(4); //4 represents "NULL" but I can't use null because useState type is int

  useEffect(() => {
    if (inputType === 4) {
      const checkboxes =
        document.querySelectorAll<HTMLInputElement>(".checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  }, [inputType]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInput(event.target.value);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (userInput.trim() === "" && inputType === 4) {
      setShowError(true);
      setShowErrorBox(true);
    } else if (userInput.trim() === "") {
      setShowError(true);
      setShowErrorBox(false);
    } else if (inputType === 4) {
      setShowError(false);
      setShowErrorBox(true);
    } else {
      setShowError(false);
      setShowErrorBox(false);
      sentResultToBack();
    }
  };

  const sentResultToBack = () => {
    console.log("UserInput:", userInput);
    console.log("InputType", inputType);

    //api

    openModal();
    setIsLoading(true);
    simulateLoading();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
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

    setUserInput("");
    setInputType(4);
  };

  const simulateLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const checkbox = event.target as HTMLInputElement;
    const checkboxes = document.querySelectorAll<HTMLInputElement>(".checkbox");

    checkboxes.forEach((cb) => {
      if (cb !== checkbox) {
        cb.checked = false;
      }
    });

    setInputType((prevInputType) => {
      if (checkbox.checked) {
        if (checkbox.name === "spam") {
          //console.log("Input Type: 0");
          return 2;
        } else if (checkbox.name === "smishing") {
          //console.log("Input Type: 1");
          return 1;
        }
      }

      return 4; // Default value if neither checkbox is checked
    });
    setShowErrorBox(false);
  }

  return (
    <main className="bg-white">
      {" "}
      <div className="relative text-black">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg lg:h-[580px] w-11/12 md:h-[480px] flex flex-col justify-center">
            <div className="lg:p-8 md:p-10 p-4 gap-0 md:gap-4 flex md:flex-row flex-col-reverse items-center h-[550px] md:h-[480px] mt-10 md:mt-0">
              <div className="h-64 w-11/12 md:w-1/2 md:h-full flex items-center justify-center">
                <div className="w-11/12 h-full md:h-10/12 flex flex-col justify-center">
                  <div className="h-screen relative">
                    <textarea
                      id="message"
                      className={`${
                        showError ? "border-red-500" : "border-gray-300"
                      } w-full h-full p-4 border-gray-300 resize-none bg-white rounded-lg border z-0 focus:shadow focus:outline-none absolute`}
                      placeholder="Type your message here..."
                      value={userInput}
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

              <div className="md:w-1/2 md:h-full flex items-center justify-center">
                <div className="flex flex-col items-center w-full text-3xl md:text-4xl lg:text-5xl">
                  {/* Title */}
                  <div className="text-black merriweather font-normal mb-2 ">
                    Help us Improve
                  </div>
                  {/* Subtitle */}
                  <div className="text-gray-400 merriweather font-normal">
                    Our Model
                    <span className="animate-blink">!</span>
                  </div>

                  <div className="lg:my-8 md:my-7 my-4 form-control items-center">
                    <div
                      className={`${
                        showErrorBox ? "border-red-500" : "border-gray-300"
                      } w-[134px] m-4 label border rounded-xl my-1 flex items-center`}
                    >
                      <div className="flex items-center gap-1">
                        <div
                          className="icon-wrapper tooltip"
                          data-tip="Spam SMS is an unsolicited text message sent to a large number of recipients, typically for commercial purposes or to spread malware. It often contains advertisements, phishing links, or fraudulent schemes. Spam SMS messages can be annoying, invasive, and potentially harmful to recipients' privacy and security."
                        >
                          <svg
                            className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <label className="label-text text-gray-400">Spam</label>
                      </div>

                      <input
                        type="checkbox"
                        name="spam"
                        className="checkbox bg-white checked:border-gray-800 [--chkbg:theme(colors.gray.800)] [--chkfg:white] border-gray-300"
                        onChange={handleCheckboxChange}
                      />
                    </div>

                    <div
                      className={`${
                        showErrorBox ? "border-red-500" : "border-gray-300"
                      } w-[134px] m-4 label border rounded-xl my-1 flex items-center`}
                    >
                      <div className="flex items-center gap-1">
                        <div
                          className="icon-wrapper tooltip"
                          data-tip="Smishing SMS is a type of phishing attack that occurs via text message. In a smishing attack, scammers use deceptive messages to trick recipients into revealing sensitive information, such as personal identification details, banking credentials, or account passwords. These messages often appear to be from legitimate sources, such as banks, government agencies, or well-known companies, and typically contain urgent requests or enticing offers to prompt recipients to respond or click on malicious links. Smishing SMS messages exploit the trust and immediacy of text messaging to deceive individuals and steal their confidential information."
                        >
                          <svg
                            className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <label className="label-text text-gray-400">
                          Smishing
                        </label>
                      </div>

                      <input
                        type="checkbox"
                        name="smishing"
                        className="checkbox bg-white checked:border-gray-800 [--chkbg:theme(colors.gray.800)] [--chkfg:white] border-gray-300"
                        onChange={handleCheckboxChange}
                      />
                    </div>
                    {showErrorBox && (
                      <div className="mt-2 font-thin text-xs text-red-500 m-2 text-center">
                        Please select at least one option.
                      </div>
                    )}
                  </div>
                  <div className="justify-center md:block hidden">
                    <div
                      className="btn bg-neutral text-white lg:w-96 md:w-72"
                      onClick={handleSubmit}
                    >
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto flex justify-center items-center h-screen">
          {/* Information Box */}
          <div className="bg-white p-8 rounded-lg shadow-md max-w-xl text-center">
            {/* Your content here */}
          </div>
        </div>
        {showModal && (
          <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10"
            aria-live="assertive"
          >
            <div
              className={`relative bg-white p-8 rounded-lg ${
                isLoading
                  ? "h-48 w-64 md:h-56 md:w-80"
                  : "h-56 w-80 md:w-96 md:h-72"
              } flex justify-center items-center`}
            >
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

              {isLoading ? (
                <div className="text-black">
                  <div className="flex flex-col items-center">
                    <span className="loading loading-dots w-16 md:w-20"></span>
                    <p className="font-bold text-xl">Submitting ...</p>
                  </div>
                </div>
              ) : (
                <div className="text-black">
                  <div className="flex flex-col items-center m-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                      alt="submit"
                      className="w-1/3 m-8"
                    />
                    <p className="font-bold text-sm md:text-lg max-h-16 flex flex-col text-black items-center">
                      Thank you for your submission!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
