# Quiz Stack

![Quiz Stack Homepage](https://i.imgur.com/3iT7lGS.png)

Completed during my 12th week on General Assembly’s Software Engineering Immersive, Quiz Stack is an application for junior developers (such as myself) to test their knowledge and use as a revision tool. I felt this idea would be beneficial not only to have use of such a  tool but to build this tool in order to increase my own opportunities for learning. This project was built using MongoDB, Express, React, Node.js, JavaScript, jQuery, Bootstrap, HTML and CSS

**Quiz Stack is deployed at https://quiz-stack.skreslett.com**

You can experience Quiz Stack by visiting the link above. Quiz Stack does not require the installation of any additional software. You can visit the website and try the quizzes by signing in using the following credentials:
- Username: test@skreslett.com
- Password: Pa$$word123

This project was completed independently within a week.

---
| Table of Contents |
|-|
| [Technologies Used](#Technologies-Used) |
| [Brief](#Brief) |
| [Planning](#Planning) |
| [Build Process](#Build-Process) |
| [Challenges](#Challenges) |
| [Wins](#Wins) |
| [Key Learnings](#Key-Learnings) |
| [Bugs](#Bugs) |
| [Future Improvements](#Future-Improvements) |

---
## Technologies Used

- MongoDB
- Express
- React
- Node.js
- JavaScript
- jQuery
- Bootstrap
- HTML
- CSS

---
## Brief

Our brief was to create a web application of our choice from scratch in 7 days with the following requirements specified:
- A working full-stack, single-page application hosted on Heroku.
- Incorporate the technologies of the MERN-stack:
	- MongoDB/Mongoose
	- Express
	- React
	- Node
- Have a well-styled interactive front-end.
- Communicates with the Express backend via AJAX.
- Implement token-based authentication. Including the ability of a user to sign-up, log in & log out.
- Implement authorization by restricting CUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.
- Have a well-scoped feature-set. Full-CRUD data operations are not required if one or more of the following are included:
	- Consume data from a third-party API.
	- Implement additional functionality if the user is an admin.
	- Utilise multi-user, real-time communications (beware that this is difficult and time consuming - please seek instructor approval).


---
## Planning

I had been thinking about my idea for this project for a while so I had a pretty clear vision for it from the outset. My intention was to build a tool that junior developers such as myself could use to revise prior learning and gain confidence in their recall of taught concepts and skills. Consequently, I did not create any wireframes for my front end and I started my planning by working on an ERD using Miro before creating a Kanban board using Trello.

#### ERD
![ERD](https://i.imgur.com/qWXKjTq.jpg)

---
## Build Process

### Stage 1
I started by creating the project’s file and folder structure, configuring server.js, and installing my dependencies such as json web token for authorisation. Once my environment was ready I started by writing my authorisation APIs and then implementing the functionality in the front end using a basic Bootstrap navbar.

### Stage 2
I then created my Models and APIs with full CRUD functionality for the quiz questions and their relative categories. Once the back-end was ready I started working on my React components whilst being mindful of how the user would traverse the site and what data would be needed from my MongoDB collection for each step of the user experience.

### Stage 3
I started working on implementing an Optical Character Recognition image to text API that Dan found during some early research as well as drafting the nutrition API request while Dan started working on the authorisation functionality.

### Stage 4
I moved on to styling which I did using mostly Bootstrap. I then started working on the ‘My Profile’ page where I wanted users to be able to see their saved scores. Unfortunately, I ran out of time and the page is displaying the quiz id rather than name and also requires some further styling.

Below you will find some code snippets from the stages described above.

### Highlights
#### Fisher-Yates Shuffle
```
  function shuffle(array){
    for(let i = array.length-1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
```
This function iterates through the array, randomly selecting an element and moving it to the end of the array. I use this function to shuffle the questions each time a quiz is loaded in order to minimise the likelihood of the question sequence being repeated. I also use this function for the multiple choice answers for each new question.

#### Preparing to Render a New Question
```
  useEffect(() => {
      stageQuestion(questions)
    }, [questions, questionIndex])

  function stageQuestion(q) {
    if(q[questionIndex]){
      let newChoices = {...choices}
      shuffle(q[questionIndex].choices)
      newChoices = q[questionIndex].choices
      setChoices(newChoices);
      setAnswer("");
      setLoading(false);
    }
  }
```
When the user moves from one question to another this function runs before the page is re-rendered. Here we have the Use Effect hook listening for changes to the state of questions and questionIndex which will trigger the stageQuestion function. This function first checks whether there is an element at the array position defined by the questionIndex state variable. If there is a question the function will get the multiple choice answers and shuffle them, update the choices state variable, clear the answer state variable and set the loading state variable to false to stop the loading spinner.

#### Question Pagination Handler
```
  const paginationHandler = (e) => {
    let newScore = score;
    let newQuestion = {...questionIndex}
    if (e === "next" && questionIndex !== maxQuestionIndex) {
      if(answer === "correct"){
        newScore++;
      }
      newQuestion = questionIndex + 1;
      setQuestionIndex(newQuestion);
    } else if (e === "prev" && questionIndex !== 0) {
      if(newScore > 0){
        newScore--;
      }
      newQuestion = questionIndex - 1;
      setQuestionIndex(newQuestion);
    }
    setScore(newScore);
  }
```
Once a user has answered a quiz question they will click next to move forward using the buttons rendered by the pagination component at which point this function is called.This function also handles clicks to the previous button if the user wants to go back to an earlier question. The direction is passed to the function as a parameter and then depending on the direction the function checks that the user isn’t currently on the first or last question. If this is true the function then checks whether the answer given was correct and updates the score accordingly before incrementing the questionIndex state variable up or down depending on the direction given.

---
## Challenges
My biggest challenge was an issue with React rendering the page before the API requests had returned a response. I managed to get around this with conditional rendering and a state variable ‘loading’. If loading is set to true then a spinner is displayed and once it is set to false the full page is rendered.

---
## Wins
This project gave me my biggest boost in confidence so far and I feel that I was able to produce an application that is on the verge of looking and feeling like a commercial effort. I believe the use of bootstrap components along with my use of CSS contribute to the professional feel of the site. In addition I am very happy that the site functions properly and is bug free.

---
## Key Learnings

On reflection a key learning point from this project was the importance of having a clear vision, oversight of the end goal and how to reach it.  As this project was conducted independently I had to work on both the front-end and back-end, giving me a greater understanding of the required progression through each stage of the sequence, as well as the reasoning behind this. It was not possible in this project, as in previous team projects, to work on both front and back-end simultaneously. This meant I had to be methodical in my approach, something I have come to understand is a strength of mine. 

In addition, I developed in terms of both confidence and capability in my working knowledge of React. Specifically, I have an enhanced understanding of React’s hooks such as useEffect and useState. 

---
## Bugs
At this stage, no bugs have been detected.

---
## Future Improvements
I would like to make the site fully responsive and complete the ‘My Profile’ section. I also think it would be a nice touch to add a confetti animation when a correct answer is given.

---
