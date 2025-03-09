// import react, { useState } from 'react'
// import './index.css'

// function App() {
//   const [firstName, setfirstName] = useState("")
//   const [lastName, setlastName] = useState("")
//   const [combinedText, setcombinedText] = useState("")


//   // for urducheck 
//   const isvalidurdu = (text) => /^[\u0600-\u06FF\s]+$/.test(text)

//   //main logic for merging alternate letters 
//   const handlegenerate = () => {
//     let result = []

//    let minlength = Math.min(firstName.length, lastName.length)

//     for (let i = 0; i < minlength; i++) {
//       result.push(firstName[i], lastName[i])
//     }



//     // if when firstname is longer than lastname 
//     if (firstName.length > lastName.length) {
//       let remaining = firstName.slice(minlength)
//       let j = 0;
//       for (let i = 0; i < remaining.length; i++) {
//         //remaining first name is add (but first name remaing first letter then lastname first latter and continue )
//         result.push(remaining[i])
//         // for to continue the cycle until the first name is finished 
//         result.push(lastName[j % lastName.length])
//         j++;
//       }

//     }

//     // if when secondname is longer than firstname 
//     if (lastName.length > firstName.length) {
//       let remaining = lastName.slice(minlength)
//       let j = 0;
//       for (let i = 0; i < remaining.length; i++) {
//         // first firstname letter (cycle wise) then lastname remaining letter
//         result.push(firstName[j % firstName.length])
//         result.push(remaining[i])

//         j++;
//       }
//     }
//     setcombinedText(result.join(" "))
//   };
//   return (
    
//       <div className="max-w-md mx-auto p-4 bg-gray-500 shadow-md rounded-md mt-6" >
//         <h2 className="text-center text-2xl font-bold mb-4">اردو میں نام جوڑ کر دکھائیں</h2>
//         <input type="text" placeholder='پہلا نام درج کریں' value={firstName}
//           onChange={(e) => {
//             if (isvalidurdu(e.target.value) || e.target.value === "") {
//               setfirstName(e.target.value)
//             }
//           }}
//           className="w-full p-3 border border-red-500 rounded-md mb-4 text-right"
//         dir="rtl"
//         />

//         <input type="text" placeholder='دوسرا نام درج کریں' value={lastName}
//           onChange={(e) => {
//             if (isvalidurdu(e.target.value) || e.target.value === "") {
//               setlastName(e.target.value)
//             }
//           }}
//           className="w-full p-3 border border-gray-300 rounded-md mb-4 text-right"
//         dir="rtl"
//         />

//         <button onClick={handlegenerate}
//           disabled={!firstName.trim() || !lastName.trim()}
//           className="w-full p-3 bg-green-500 text-white rounded-md mb-4 disabled:bg-gray-400"
//         >
//           نام جوڑیں
//         </button>

//         <textarea readOnly value={combinedText} className="w-full p-3 border border-gray-300 rounded-md text-right text-lg"
//         dir="rtl" />

//       </div>
 
//   )

// }

// export default App;


import React, { useState } from 'react';
import './index.css'
import '../public/App.css'


function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [combinedText, setCombinedText] = useState("");

  // Urdu-only validation (yeh spaces allow karta hai, lekin hum merge se pehle remove kar denge)
  const isValidUrdu = (text) => /^[\u0600-\u06FF\s]+$/.test(text);

  // Merging alternate letters with cycling, ignoring spaces in the merge logic
  const handleGenerate = () => {
    // Remove all spaces from the inputs
    const cleanFirst = firstName.replace(/\s+/g, '');
    const cleanLast = lastName.replace(/\s+/g, '');
    let result = [];
    const minLength = Math.min(cleanFirst.length, cleanLast.length);

    // Alternate merging for common part:
    for (let i = 0; i < minLength; i++) {
      result.push(cleanFirst[i]);  // pehla input ka letter
      result.push(cleanLast[i]);   // doosre input ka letter
    }

    // Agar firstName (cleaned) lamba hai:
    if (cleanFirst.length > cleanLast.length) {
      const remaining = cleanFirst.slice(minLength);
      let j = 0;
      for (let i = 0; i < remaining.length; i++) {
        result.push(remaining[i]);
        result.push(cleanLast[j % cleanLast.length]);
        j++;
      }
    }

    // Agar lastName (cleaned) lamba hai:
    if (cleanLast.length > cleanFirst.length) {
      const remaining = cleanLast.slice(minLength);
      let j = 0;
      for (let i = 0; i < remaining.length; i++) {
        result.push(cleanFirst[j % cleanFirst.length]);
        result.push(remaining[i]);
        j++;
      }
    }

const chars = Array.from(result.join("")); // convert into array for easily spliting urdu letters
let groupedout = [];
    groupedout.push(chars.slice(0,4).join(""))

    for (let i = 4; i < chars.length ; i +=4){
      groupedout.push(chars.slice(i , i + 4).join(""))
4     
    }



    setCombinedText(groupedout.join(" "));
  };

  return (
   <div>
    <h1 className="text-center text-2xl font-bold  mt-6 p-4 mb-0 text-black bg-sky-700 border rounded-lg max-w-sm  h-16  mx-auto">ابوبکر روحانی ویلفیرٹرسٹ</h1>
    <div className="max-w-sm mx-auto p-4 bg-sky-800  shadow-md rounded-md mt-10">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">
              امتزاج
      </h2>
      <input
        type="text"
        placeholder="پہلا نام درج کریں"
        value={firstName}
        onChange={(e) => {
          if (isValidUrdu(e.target.value) || e.target.value === "") {
            setFirstName(e.target.value);
          }
        }}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 text-right"
        dir="rtl"
      />
      <input
        type="text"
        placeholder="دوسرا نام درج کریں"
        value={lastName}
        onChange={(e) => {
          if (isValidUrdu(e.target.value) || e.target.value === "") {
            setLastName(e.target.value);
          }
        }}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 text-right"
        dir="rtl"
      />
      <button
        onClick={handleGenerate}
        disabled={!firstName.trim() || !lastName.trim()}
        className="w-full p-3 bg-green-500 text-white rounded-md mb-4 disabled:bg-gray-400"
      >
        نام جوڑیں
      </button>
      <textarea
        readOnly
        value={combinedText}
        className="w-full p-3 border border-gray-300 rounded-md text-right text-lg"
        dir="rtl"
      />
    </div>
    </div>
  );
}

export default App;








