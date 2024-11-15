
import React, { useState } from 'react';

const QuizApp = () => {
  const questions = [
    { question: "Which company developed JavaScript?", 
       options: ["Netscape", "Microsoft", "Google", "Apple"], 
        answer: "Netscape" },
    { question: "Inside which HTML element do we put JavaScript?", 
       options: ["<script>", "<js>", "<javascript>", "<code>"], 
        answer: "<script>" },
    { question: "What is the correct syntax for referring to an external script called 'app.js'?", 
       options: ["<script src='app.js'>", "<script href='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"], 
        answer: "<script src='app.js'>" },
    { question: "How do you create a function in JavaScript?", 
       options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "myFunction = function()"], 
        answer: "function myFunction()" },
    { question: "How do you write 'Hello World' in an alert box?",
       options: ["msgBox('Hello World');", "alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');"], 
        answer: "alert('Hello World');" },
    { question: "Which operator is used to assign a value to a variable?", 
       options: ["*", "=", "-", "x"], 
        answer: "=" },
    { question: "What will 'typeof null' return?", 
       options: ["'null'", "'undefined'", "'object'", "'number'"], 
        answer: "'object'" },
    { question: "Which symbol is used for comments in JavaScript?", 
       options: ["//", "<!-- -->", "#", "**"], 
        answer: "//" },
    { question: "How can you add a single-line comment in JavaScript?", 
       options: ["# This is a comment", "// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"], 
        answer: "// This is a comment" },
    { question: "What is the correct way to declare a variable in JavaScript?", 
       options: ["var name;", "variable name;", "v name;", "String name;"], 
        answer: "var name;" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (event) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = event.target.value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let tempScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
        tempScore++;
      }
    }
    setScore(tempScore);
  };

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
        borderRadius: '8px', 
        width: '350px',  
        backgroundColor: '#fff' 
      }}>
      <h1>JavaScript Quiz App</h1>

        {score === null ? (
          <form onSubmit={currentQuestion === questions.length - 1 ? handleSubmit : undefined}>
            <div>
              <h3>Question {currentQuestion + 1} of {questions.length}</h3>
              <p>{questions[currentQuestion].question}</p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;

