// Using Timer for every question and in last total time spent is also shown in this code  

import React, { useState, useEffect } from 'react';

function QuizApp() {
  const questions = [
    {
      question: "Which company developed JavaScript ?", 
      options: ["Netscape", "Microsoft", "Google", "Apple"], 
      answer: "Netscape" 
    },
    { 
      question: "Inside which HTML element do we put JavaScript ?", 
      options: ["<script>", "<js>", "<javascript>", "<code>"], 
      answer: "<script>" 
    },
    { 
      question: "What is the correct syntax for referring to an external script called 'app.js' ?", 
      options: ["<script src='app.js'>", "<script href='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"], 
      answer: "<script src='app.js'>" 
    },
    { 
      question: "How do you create a function in JavaScript ?", 
      options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "myFunction = function()"], 
      answer: "function myFunction()" 
    },
    { 
      question: "How do you write 'Hello World' in an alert box ?", 
      options: ["msgBox('Hello World');", "alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');"], 
      answer: "alert('Hello World');" 
    },
    { 
      question: "Which operator is used to assign a value to a variable ?", 
      options: ["*", "=", "-", "x"], 
      answer: "=" 
    },
    { 
      question: "What will 'typeof null' return ?", 
      options: ["'null'", "'undefined'", "'object'", "'number'"], 
      answer: "'object'" 
    },
    {
      question: "Which symbol is used for comments in JavaScript ?", 
      options: ["//", "<!-- -->", "#", "**"], 
      answer: "//" 
    },
    { question: "How can you add a single-line comment in JavaScript ?", 
      options: ["# This is a comment", "// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"], 
      answer: "// This is a comment" 
    },
    { question: "What is the correct way to declare a variable in JavaScript ?", 
      options: ["var name;", "variable name;", "v name;", "String name;"], 
      answer: "var name;" 
    },
    {
        question: "Which method is used to find the length of a string in JavaScript?",
        options: ["size()", "length", "len()", "count()"],
        answer: "length"
    },
    {
        question: "What is the output of '2' + 2 in JavaScript?",
        options: ["4", "'22'", "NaN", "undefined"],
        answer: "'22'"
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: ["let myVar;", "variable myVar;", "var: myVar;", "declare myVar;"],
        answer: "let myVar;"
    },
    {
        question: "Which event is used to perform an action when a user clicks an HTML element?",
        options: ["onmouseover", "onclick", "onload", "onchange"],
        answer: "onclick"
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        options: [
            "Refers to the current HTML element",
            "Refers to the global object",
            "Refers to the current function",
            "Refers to the object from which it was called"
        ],
        answer: "Refers to the object from which it was called"
    },
    {
        question: "Which built-in method is used to convert a JSON string into a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toObject()"],
        answer: "JSON.parse()"
    },
    {
        question: "What keyword is used to define a constant in JavaScript?",
        options: ["var", "let", "const", "define"],
        answer: "const"
    },
    {
        question: "Which of the following will stop the execution of a function?",
        options: ["return", "stop", "end", "halt"],
        answer: "return"
    },
    {
        question: "What does 'NaN' stand for in JavaScript?",
        options: ["Not a Null", "Not a Number", "Null and Negative", "Negative and Null"],
        answer: "Not a Number"
    },
    {
        question: "Which function is used to print something in the console?",
        options: ["print()", "console()", "console.log()", "log()"],
        answer: "console.log()"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [questionTimes, setQuestionTimes] = useState(Array(questions.length).fill(0));
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleNext = () => {
    setQuestionTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[currentQuestion] = time;
      return updatedTimes;
    });
    setTime(0);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    setQuestionTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[currentQuestion] = time;
      return updatedTimes;
    });
    setTime(0);
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleAnswerChange = (event) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = event.target.value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuestionTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[currentQuestion] = time;
      return updatedTimes;
    });
    let tempScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
        tempScore++;
      }
    }
    setScore(tempScore);
  };

  const totalTime = questionTimes.reduce((acc, curr) => acc + curr, 0);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      flexDirection: 'column',
      backgroundColor: '#f4f4f4' 
    }}>
      <div style={{
        padding: '20px',
        border: '2px solid #333', 
        borderRadius: '25px', 
        width: '450px',  
        backgroundColor: '#fff' 
      }}>
        <h1>JavaScript Quiz App</h1>
        
        {score === null ? (
          <form onSubmit={currentQuestion === questions.length - 1 ? handleSubmit : undefined}>
            <div>
              <h3>Question {currentQuestion + 1} of {questions.length}</h3>
              <h3>{questions[currentQuestion].question}</h3>
              <div style={{ textAlign: 'left' }}>
                {questions[currentQuestion].options.map((option, optIndex) => (
                  <div key={optIndex} style={{ marginBottom: '10px' }}>
                    <input
                      type="radio"
                      name={`question${currentQuestion}`}
                      value={option}
                      checked={userAnswers[currentQuestion] === option}
                      onChange={handleAnswerChange}
                      style={{ marginRight: '10px' }}
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
              <h4>Time spent on this question : {time} seconds </h4>
            </div>
            <div style={{ marginTop: '20px' }}>
              {currentQuestion > 0 && (
                <button type="button" onClick={handlePrevious} style={{ marginRight: '10px' }}>Previous</button>
              )}
              {currentQuestion < questions.length - 1 ? (
                <button type="button" onClick={handleNext}>Next</button>
              ) : (
                <button type="submit">Submit</button>
              )}
            </div> 
          </form>
        ) : (
          <div>
            <h2>Your score : {score} / {questions.length}</h2>
            <p>Total questions : {questions.length}</p>
            <p>Correct answers : {score}</p>
            <p>Incorrect answers : {questions.length - score}</p>
            <h4>Total time taken : {totalTime} seconds </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizApp;


//=========================================================================================================================================

//// ======= ===== Using Without Timer  ========

// import React, { useState } from 'react';

// const QuizApp = () => {
//   const questions = [
//     {
//       question: "Which company developed JavaScript ?", 
//       options: ["Netscape", "Microsoft", "Google", "Apple"], 
//       answer: "Netscape" 
//     },
//     { 
//       question: "Inside which HTML element do we put JavaScript ?", 
//       options: ["<script>", "<js>", "<javascript>", "<code>"], 
//       answer: "<script>" 
//     },
//     { 
//       question: "What is the correct syntax for referring to an external script called 'app.js' ?", 
//       options: ["<script src='app.js'>", "<script href='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"], 
//       answer: "<script src='app.js'>" 
//     },
//     { 
//       question: "How do you create a function in JavaScript ?", 
//       options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "myFunction = function()"], 
//       answer: "function myFunction()" 
//     },
//     { 
//       question: "How do you write 'Hello World' in an alert box ?", 
//       options: ["msgBox('Hello World');", "alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');"], 
//       answer: "alert('Hello World');" 
//     },
//     { 
//       question: "Which operator is used to assign a value to a variable ?", 
//       options: ["*", "=", "-", "x"], 
//       answer: "=" 
//     },
//     { 
//       question: "What will 'typeof null' return ?", 
//       options: ["'null'", "'undefined'", "'object'", "'number'"], 
//       answer: "'object'" 
//     },
//     {
//       question: "Which symbol is used for comments in JavaScript ?", 
//       options: ["//", "<!-- -->", "#", "**"], 
//       answer: "//" 
//     },
//     { question: "How can you add a single-line comment in JavaScript ?", 
//       options: ["# This is a comment", "// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"], 
//       answer: "// This is a comment" 
//     },
//     { question: "What is the correct way to declare a variable in JavaScript ?", 
//       options: ["var name;", "variable name;", "v name;", "String name;"], 
//       answer: "var name;" 
//     },
//     {
//         question: "Which method is used to find the length of a string in JavaScript?",
//         options: ["size()", "length", "len()", "count()"],
//         answer: "length"
//     },
//     {
//         question: "What is the output of '2' + 2 in JavaScript?",
//         options: ["4", "'22'", "NaN", "undefined"],
//         answer: "'22'"
//     },
//     {
//         question: "How do you declare a variable in JavaScript?",
//         options: ["let myVar;", "variable myVar;", "var: myVar;", "declare myVar;"],
//         answer: "let myVar;"
//     },
//     {
//         question: "Which event is used to perform an action when a user clicks an HTML element?",
//         options: ["onmouseover", "onclick", "onload", "onchange"],
//         answer: "onclick"
//     },
//     {
//         question: "What is the purpose of the 'this' keyword in JavaScript?",
//         options: [
//             "Refers to the current HTML element",
//             "Refers to the global object",
//             "Refers to the current function",
//             "Refers to the object from which it was called"
//         ],
//         answer: "Refers to the object from which it was called"
//     },
//     {
//         question: "Which built-in method is used to convert a JSON string into a JavaScript object?",
//         options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toObject()"],
//         answer: "JSON.parse()"
//     },
//     {
//         question: "What keyword is used to define a constant in JavaScript?",
//         options: ["var", "let", "const", "define"],
//         answer: "const"
//     },
//     {
//         question: "Which of the following will stop the execution of a function?",
//         options: ["return", "stop", "end", "halt"],
//         answer: "return"
//     },
//     {
//         question: "What does 'NaN' stand for in JavaScript?",
//         options: ["Not a Null", "Not a Number", "Null and Negative", "Negative and Null"],
//         answer: "Not a Number"
//     },
//     {
//         question: "Which function is used to print something in the console?",
//         options: ["print()", "console()", "console.log()", "log()"],
//         answer: "console.log()"
//     }
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(null);
//   const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleAnswerChange = (event) => {
//     const newAnswers = [...userAnswers];
//     newAnswers[currentQuestion] = event.target.value;
//     setUserAnswers(newAnswers);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     let tempScore = 0;
//     for (let i = 0; i < questions.length; i++) {
//       if (userAnswers[i] === questions[i].answer) {
//         tempScore++;
//       }
//     }
//     setScore(tempScore);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       textAlign: 'center',
//       flexDirection: 'column',
//       backgroundColor: '#f4f4f4' 
//          }}>
//       <div style={{
//         padding: '20px',
//         border: '2px solid #333', 
//         borderRadius: '8px', 
//         width: '350px',  
//         backgroundColor: '#fff' 
//       }}>
//       <h1>JavaScript Quiz App</h1>

//         {score === null ? (
//           <form onSubmit={currentQuestion === questions.length - 1 ? handleSubmit : undefined}>
//             <div>
//               <h3>Question {currentQuestion + 1} of {questions.length}</h3>
//               <p>{questions[currentQuestion].question}</p>
//               <div style={{ textAlign: 'left' }}>
//                 {questions[currentQuestion].options.map((option, optIndex) => (
//                   <div key={optIndex} style={{ marginBottom: '10px' }}>
//                     <input
//                       type="radio"
//                       name={`question${currentQuestion}`}
//                       value={option}
//                       checked={userAnswers[currentQuestion] === option}
//                       onChange={handleAnswerChange}
//                       style={{ marginRight: '10px' }}
//                     />
//                     <label>{option}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div style={{ marginTop: '20px' }}>
//               {currentQuestion > 0 && (
//                 <button type="button" onClick={handlePrevious} style={{ marginRight: '10px' }}>Previous</button>
//               )}
//               {currentQuestion < questions.length - 1 ? (
//                 <button type="button" onClick={handleNext}>Next</button>
//               ) : (
//                 <button type="submit">Submit</button>
//               )}
//             </div> 
//           </form>
//         ) : (
//           <div>
//             <h2>Your score : {score} / {questions.length}</h2>
//             <p>Total questions : {questions.length}</p>
//             <p>Correct answers : {score}</p>
//             <p>Incorrect answers : {questions.length - score}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizApp;

//=======================================================================================================================================


//========================================================================================================================================

// Single page Quiz only total Score shown in this code 

// import React, { useRef, useState } from 'react';

// const QuizApp = () => {
//   const questions = [
//     {
//       question: "Which company developed JavaScript ?", 
//       options: ["Netscape", "Microsoft", "Google", "Apple"], 
//       answer: "Netscape" 
//     },
//     { 
//       question: "Inside which HTML element do we put JavaScript ?", 
//       options: ["<script>", "<js>", "<javascript>", "<code>"], 
//       answer: "<script>" 
//     },
//     { 
//       question: "What is the correct syntax for referring to an external script called 'app.js' ?", 
//       options: ["<script src='app.js'>", "<script href='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"], 
//       answer: "<script src='app.js'>" 
//     },
//     { 
//       question: "How do you create a function in JavaScript ?", 
//       options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "myFunction = function()"], 
//       answer: "function myFunction()" 
//     },
//     { 
//       question: "How do you write 'Hello World' in an alert box ?", 
//       options: ["msgBox('Hello World');", "alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');"], 
//       answer: "alert('Hello World');" 
//     },
//     { 
//       question: "Which operator is used to assign a value to a variable ?", 
//       options: ["*", "=", "-", "x"], 
//       answer: "=" 
//     },
//     { 
//       question: "What will 'typeof null' return ?", 
//       options: ["'null'", "'undefined'", "'object'", "'number'"], 
//       answer: "'object'" 
//     },
//     {
//       question: "Which symbol is used for comments in JavaScript ?", 
//       options: ["//", "<!-- -->", "#", "**"], 
//       answer: "//" 
//     },
//     { question: "How can you add a single-line comment in JavaScript ?", 
//       options: ["# This is a comment", "// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"], 
//       answer: "// This is a comment" 
//     },
//     { question: "What is the correct way to declare a variable in JavaScript ?", 
//       options: ["var name;", "variable name;", "v name;", "String name;"], 
//       answer: "var name;" 
//     }
//  ];

//   const [score, setScore] = useState(null);
//   const formRefs = useRef([]);

//   // Initialize the refs array to match the number of questions
//   formRefs.current = questions.map((_, i) => formRefs.current[i] ?? React.createRef());

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     let tempScore = 0;

//     // Loop through each question and check if the selected answer is correct
//     questions.forEach((question, index) => {
//       const userAnswer = formRefs.current[index].current.value;
//       if (userAnswer === question.answer) {
//         tempScore++;
//       }
//     });

//     setScore(tempScore);
//   };

//   return (
//     <div>
//       <h1> Java Script Interview Questioin</h1>
//       <form onSubmit={handleSubmit}>
//         {questions.map((question, index) => (
//           <div key={index}>
//             <h3>{question.question}</h3>
//             {question.options.map((option, optIndex) => (
//               <div key={optIndex}>
//                 <input
//                   type="radio"
//                   name={`question${index}`}
//                   value={option}
//                   ref={optIndex === 0 ? formRefs.current[index] : null} // Use ref for the first option only
//                 />
//                 {option}
//               </div>
//             ))}
//           </div>
//         ))}<br/>
//         <button type="submit">Submit</button>
//       </form>
//       {score !== null && <h2>Your score: {score} / {questions.length}</h2>}
//     </div>
//   );
// };

// export default QuizApp;

//========================================================================================================================================
