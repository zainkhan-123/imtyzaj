


// import React, { useState } from 'react';
// import './index.css'
// import '../public/App.css'


// function App() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [combinedText, setCombinedText] = useState("");

//   // Urdu-only validation (yeh spaces allow karta hai, lekin hum merge se pehle remove kar denge)
//   const isValidUrdu = (text) => /^[\u0600-\u06FF\s]+$/.test(text);

//   // Merging alternate letters with cycling, ignoring spaces in the merge logic
//   const handleGenerate = () => {
//     // Remove all spaces from the inputs
//     const cleanFirst = firstName.replace(/\s+/g, '');
//     const cleanLast = lastName.replace(/\s+/g, '');
//     let result = [];
//     const minLength = Math.min(cleanFirst.length, cleanLast.length);

//     // Alternate merging for common part:
//     for (let i = 0; i < minLength; i++) {
//       result.push(cleanFirst[i]);  // pehla input ka letter
//       result.push(cleanLast[i]);   // doosre input ka letter
//     }

//     // Agar firstName (cleaned) lamba hai:
//     if (cleanFirst.length > cleanLast.length) {
//       const remaining = cleanFirst.slice(minLength);
//       let j = 0;
//       for (let i = 0; i < remaining.length; i++) {
//         result.push(remaining[i]);
//         result.push(cleanLast[j % cleanLast.length]);
//         j++;
//       }
//     }

//     // Agar lastName (cleaned) lamba hai:
//     if (cleanLast.length > cleanFirst.length) {
//       const remaining = cleanLast.slice(minLength);
//       let j = 0;
//       for (let i = 0; i < remaining.length; i++) {
//         result.push(cleanFirst[j % cleanFirst.length]);
//         result.push(remaining[i]);
//         j++;
//       }
//     }

// const chars = Array.from(result.join("")); // convert into array for easily spliting urdu letters
// let groupedout = [];
//     groupedout.push(chars.slice(0,4).join(""))

//     for (let i = 4; i < chars.length ; i +=4){
//       groupedout.push(chars.slice(i , i + 4).join(""))
// 4     
//     }



//     setCombinedText(groupedout.join(" "));
//   };

//   return (
//    <div>
//     <h1 className="text-center text-2xl font-bold  mt-6 p-4 mb-0 text-black bg-sky-700 border rounded-lg max-w-sm  h-16  mx-auto">ابوبکر روحانی ویلفیرٹرسٹ</h1>
//     <div className="max-w-sm mx-auto p-4 bg-sky-800  shadow-md rounded-md mt-10">
//       <h2 className="text-center text-2xl font-bold mb-4 text-white">
//               امتزاج
//       </h2>
//       <input
//         type="text"
//         placeholder="پہلا نام درج کریں"
//         value={firstName}
//         onChange={(e) => {
//           if (isValidUrdu(e.target.value) || e.target.value === "") {
//             setFirstName(e.target.value);
//           }
//         }}
//         className="w-full p-3 border border-gray-300 rounded-md mb-4 text-right"
//         dir="rtl"
//       />
//       <input
//         type="text"
//         placeholder="دوسرا نام درج کریں"
//         value={lastName}
//         onChange={(e) => {
//           if (isValidUrdu(e.target.value) || e.target.value === "") {
//             setLastName(e.target.value);
//           }
//         }}
//         className="w-full p-3 border border-gray-300 rounded-md mb-4 text-right"
//         dir="rtl"
//       />
//       <button
//         onClick={handleGenerate}
//         disabled={!firstName.trim() || !lastName.trim()}
//         className="w-full p-3 bg-green-500 text-white rounded-md mb-4 disabled:bg-gray-400"
//       >
//         نام جوڑیں
//       </button>
//       <textarea
//         readOnly
//         value={combinedText}
//         className="w-full p-3 border border-gray-300 rounded-md text-right text-lg"
//         dir="rtl"
//       />
//     </div>
//     </div>
//   );
// }

// export default App;




import React, { useState } from 'react';
import './index.css';
import '../public/App.css';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [combinedText, setCombinedText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Urdu-only validation
  const isValidUrdu = (text) => /^[\u0600-\u06FF\s]+$/.test(text);

  // Dropdown options
  const dropdownOptions = [
    {
      label: "صوامت شمسی",
      value: "ا ح د ر س ص ط ع ک ل م و ہ",
    },
    {
      label: "صوامت قمری",
      value: "ادھ و ح ط ک ل م س ع ص ر",
    },
    {
      label: "نورانی",
      value: "ا ھ ح ط ی ک ل م ن س ع ص ق ر",
    },
    {
      label: "تسخیر",
      value: "اد ح ک م س ف ق ر ش ت ث خ غ ظ ض ذ",
    },
  ];

  // Handle dropdown selection
  const handleOptionSelect = (value) => {
    setFirstName(value);
    setShowDropdown(false);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Merging alternate letters with cycling, ignoring spaces in the merge logic
  const handleGenerate = () => {
    const cleanFirst = firstName.replace(/\s+/g, '');
    const cleanLast = lastName.replace(/\s+/g, '');
    let result = [];
    const minLength = Math.min(cleanFirst.length, cleanLast.length);

    for (let i = 0; i < minLength; i++) {
      result.push(cleanFirst[i]);
      result.push(cleanLast[i]);
    }

    if (cleanFirst.length > cleanLast.length) {
      const remaining = cleanFirst.slice(minLength);
      let j = 0;
      for (let i = 0; i < remaining.length; i++) {
        result.push(remaining[i]);
        result.push(cleanLast[j % cleanLast.length]);
        j++;
      }
    }

    if (cleanLast.length > cleanFirst.length) {
      const remaining = cleanLast.slice(minLength);
      let j = 0;
      for (let i = 0; i < remaining.length; i++) {
        result.push(cleanFirst[j % cleanFirst.length]);
        result.push(remaining[i]);
        j++;
      }
    }

    const chars = Array.from(result.join(""));
    let groupedout = [];
    groupedout.push(chars.slice(0, 4).join(""));

    for (let i = 4; i < chars.length; i += 4) {
      groupedout.push(chars.slice(i, i + 4).join(""));
    }

    setCombinedText(groupedout.join(" "));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-center text-3xl font-extrabold text-gray-100 bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg p-4 mb-6 shadow-lg">
          ابوبکر روحانی ویلفیرٹرسٹ
        </h1>
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
          <h2 className="text-center text-2xl font-bold text-gray-200 mb-6">
            امتزاج
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="پہلا نام درج کریں"
              value={firstName}
              onChange={(e) => {
                if (isValidUrdu(e.target.value) || e.target.value === "") {
                  setFirstName(e.target.value);
                }
              }}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 text-right text-lg transition-all duration-300 placeholder-gray-400"
              dir="rtl"
            />
            <button
              onClick={toggleDropdown}
              className="w-full mt-2 p-3 bg-blue-700 text-gray-100 rounded-lg flex justify-between items-center hover:bg-blue-600 transition-colors duration-200 shadow-md"
              dir="rtl"
            >
              <span>اختیار منتخب کریں</span>
              <span className="text-xl">{showDropdown ? '▲' : '▼'}</span>
            </button>
            {showDropdown && (
              <div className="absolute w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                {dropdownOptions.map((option, index) => (
                  <button
                    key={index}
                    className="w-full p-3 text-right bg-gray-700 hover:bg-blue-600 text-gray-100 font-medium border-b border-gray-600 last:border-b-0 transition-colors duration-200"
                    onClick={() => handleOptionSelect(option.value)}
                    dir="rtl"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="دوسرا نام درج کریں"
            value={lastName}
            onChange={(e) => {
              if (isValidUrdu(e.target.value) || e.target.value === "") {
                setLastName(e.target.value);
              }
            }}
            className="w-full p-3 mt-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 text-right text-lg transition-all duration-300 placeholder-gray-400"
            dir="rtl"
          />
          <button
            onClick={handleGenerate}
            disabled={!firstName.trim() || !lastName.trim()}
            className="w-full mt-4 p-3 bg-green-700 text-gray-100 rounded-lg hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
          >
            نام جوڑیں
          </button>
          <textarea
            readOnly
            value={combinedText}
            className="w-full mt-4 p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 text-right text-lg resize-none h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
            dir="rtl"
          />
        </div>
      </div>
    </div>
  );
}

export default App;



