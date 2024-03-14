
export const MainPage = () => {
    
    return (
        <div className="flex flex-col items-center ml-2 mr-2 mt-10 mb-8 md:mt-20 md:mb-8 md:ml-5 md:mr-5 lg:mt-20 lg:mb-8 lg:ml-24 lg:mr-24">
          <div className="flex flex-col items-center w-full m-10">
            <div className="text-black text-5xl merriweather font-normal m-2 md:text-6xl lg:text-6xl">
              Message Spam Detector
            </div>
            <div className="text-gray-400 text-5xl merriweather font-normal m-2 md:text-6xl lg:text-6xl">
              for everyone!
            </div>
          </div>
       

<div>
    <div className="container flex justify-center items-center">
        <div className="relative"> 
            <div className="absolute top-4 left-3">
                 <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
            </div>
          <input type="text" className="inter font-light text-base border border-gray-300 h-12 w-96 pl-6 pr-20 rounded-full z-0 focus:shadow focus:outline-none" placeholder="paste your message here" />
            <div className="absolute top-2 right-2">

            <button className="bg-gray-400 rounded-full hover:transition duration-500 hover:bg-gray-500">
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

<div className="font-thin text-xs text-gray-400 m-2 inter">
    Try pasting something!
</div>
          
        </div>
      );
  };