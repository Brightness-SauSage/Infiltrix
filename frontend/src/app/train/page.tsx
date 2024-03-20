'use client'

import { useState } from "react";
import { KeyboardEvent } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowError(false); // Reset error state when input changes
  };

  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      setShowError(true); // Show error if input is empty
    } else {
      // Handle submission
      console.log(inputValue);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  function handleCheckboxChange(checkbox) {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((cb) => {
      if (cb !== checkbox) {
        cb.checked = false;
      }
    });
  }

  return (
    <main>
      <div className="flex flex-col items-center ml-2 mr-2 mt-10 mb-0 md:mt-20 md:ml-5 md:mr-5 lg:mt-20 lg:ml-24 lg:mr-24">
        <div className="flex flex-col items-center w-full m-10">
          <div className="text-black text-4xl merriweather font-normal m-2 md:text-5xl lg:text-6xl">
            Help Us Improve
          </div>
          <div className="text-gray-400 text-4xl merriweather font-normal m-2 md:text-5xl lg:text-6xl">
            Our model!
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
                  showError ? 'border-red-500' : 'border-gray-300'
                } h-12 w-96 pl-6 pr-20 md:h-12 md:w-96 md:pl-6 md:pr-20 rounded-full z-0 focus:shadow focus:outline-none`}
                placeholder="paste your message here"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} // Add key press event handler
              />
              
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

<div className="form-control">
  <div className="label cursor-pointer">
    <label className="label-text">Spam</label> 
    <input type="checkbox" name="spam" className="checkbox" onchange="handleCheckboxChange(this)" />
  </div>
  <div className="label cursor-pointer">
    <label className="label-text">Not Spam</label> 
    <input type="checkbox" name="not-spam" className="checkbox" onchange="handleCheckboxChange(this)" />
  </div>
  <div className="label cursor-pointer">
    <label className="label-text">Smashing</label> 
    <input type="checkbox" name="smashing" className="checkbox" onchange="handleCheckboxChange(this)" />
  </div>
</div>

<div className="absolute top-110 left-50">
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



        <div
          className="mt-10 h-96 w-screen"
          style={{ background: 'linear-gradient(70deg, #a855f7, #ec4899)' }}
        ></div>
      </div>
    </main>
  );
}
