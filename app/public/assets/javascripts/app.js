// -------------------------------------------
// Program: app.js
// Purpose: Front end javascripts
// -------------------------------------------

document.getElementById("submitAnswers").addEventListener('click', event => {
  // override default behavior
  event.preventDefault;
  // clear previous errors
  clearErrorMessages();
  // is data mssing in the screen?
  let errorFound = isMissingData();
  // capture reponse
  if (!errorFound) {
    // get screen values
    let name = document.getElementById('fname').value.trim();
    let photo = document.getElementById('photo').value.trim();
    let answerArr = getQuestionAnswers();
    // send response back to server
    sendResponse(name, photo, answerArr);
  }
})

function getCompatibleFriend(name) {

  fetch(`/getCompatibleFriend?name=${name}`)
    .then(r => r.json())
    .then(r => {
      // clear section
      document.querySelector('#modalBody').innerHTML = ''
      let cFriend = document.createElement('div');
      cFriend.innerHTML= `
        <h4>${r.friend.name}</h4>
        <p>Photo : ${r.friend.photo}</p>
        <img src="${r.friend.photo}" class="img-fluid" alt="Responsive image">
        <p>Points: ${r.points} (max incompatibility is 40)</p>
      `
      document.querySelector('#modalBody').appendChild(cFriend)
     
     
     // show modal
      $('#exampleModal').modal('show')

    })
    .catch(e => console.error(e))
}

function sendResponse(name, photo, answerArr) {
  
  // send response back
  fetch('/addFriends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        name: name,
        photo: photo,
        scoresArr: answerArr
      })
    })
    .then(r => {
      // getBooks()
      console.log(r)
      getCompatibleFriend(name);
    })
    .catch(e => console.error(e));
}

function getQuestionAnswers() {
  let answerArr = [];
  // collect all question answers
  for (let i = 1; i <= 10; i++) {
    let asnwer = document.getElementById(`q${i}`).value;
    answerArr.push({
      qId: `q${i}`,
      answer: asnwer
    })
  }
  return answerArr;
}

function isMissingData() {
  let errorFound = false;
  // Validate
  if (document.getElementById('fname').value.trim() === '') {
    document.getElementById('nameError').innerHTML = "missing name!";
    errorFound = true;
  } else if (document.getElementById('photo').value.trim() === '') {
    document.getElementById('photoError').innerHTML = "missing photo URL!";
    errorFound = true;
  } else {
    for (let i = 1; i <= 10; i++) {
      let answer = document.getElementById(`q${i}`).value;
      if (answer === '') {
        document.getElementById(`q${i}Error`).innerHTML = "missing asnwer!";
        errorFound = true;
      }
    }
  }
  return errorFound;
}

function clearErrorMessages() {
  // clear previous errors
  document.getElementById('nameError').innerHTML = '';
  document.getElementById('photoError').innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    document.getElementById(`q${i}Error`).innerHTML = '';
  }
}

function displayQuestions() {
  // bring all questions and display them
  fetch('/questions')
    .then(r => r.json())
    .then(r => {
      // clear question section
      document.querySelector('#questionare').innerHTML = ''
      // prepare questions
      r.forEach(question => {
        let questionGroup = document.createElement('div');
        questionGroup.setAttribute('class', 'questionBlock')
        questionGroup.innerHTML = `
             <h4 class="questionLabel">${question.qLabel} <span id="${question.qId}Error" class="entryError"></span></h4>
             <p class="questionDescr">${question.qDescript}</p>
             <select class="custom-select rounded questionAnswer" id=${question.qId}>
               <option disabled selected value> -- select an option -- </option>
               <option value="1">1 (strongly Disagree)</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5 (Strongly Agree)</option>
             </select>
            `
        document.querySelector('#questionare').appendChild(questionGroup)
      })
    })
    .catch(e => console.error(e))
}