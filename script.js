const regForm = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const userContainer = document.querySelector('#user-container')


const invalidInput = (input, textMessage) => {
    const parent = input.parentElement;
    parent.classList.add('is-invalid')
    parent.classList.remove('is-valid')
    parent.querySelector('.invalid-feedback').innerText = textMessage;
}

const validInput = (input) => {
  const parent = input.parentElement;
  parent.classList.add('is-valid')
  parent.classList.remove('is-invalid')
}



const validateName = (input) => {
  let validName = /^[a-zA-ZäöåÄÖÅ]+$/
  
  switch(true) {
    case (input.value.trim() === ''):
      invalidInput(input, 'You must enter a name.')
      return false;
    case (input.value.trim().length < 2): 
      invalidInput(input, 'Your name must be atleast 2 characters long.')
      return false;
    case (!validName.test(input.value)):
      invalidInput(input, 'Your name can\'t have numbers.')
      return false;
    default: 
      validInput(input)
      return true;
  }
  
}
 

// Med en IF-sats

// const validateText = (input) => {
//   let validName = /^[a-zA-ZäöåÄÖÅ]+$/
  
//   if(input.value.trim() === '') {
//     invalidInput(input, 'You must enter a name.')
//     return false;
//   }
//   else if(input.value.trim().length < 2) {
//     invalidInput(input, 'Your name must be atleast 2 characters long.')
//     return false;
//   }
//   else if(!validName.test(input.value)) {
//     invalidInput(input, 'Your name can\'t contain numbers.')
//     return false;
//   }
//   else {
//     validInput(input);
//     return true;
//   }
  
// }



const validateEmail = email => {
  
  let regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  if(email.value.trim() === '') {
    invalidInput(email, 'Please enter your email address.')
    return false;
  }
  else if(!regExEmail.test(email.value) === '') {
    invalidInput(email, 'You must enter a valid email address')
    return false;
  }
 
  else {
    validInput(email)
    return true;
  }
}




regForm.addEventListener('submit', (e) => {
  e.preventDefault();

  validateName(firstName);
  validateName(lastName);
  validateEmail(email);
  if(validateName(firstName) 
    && validateName(lastName) 
    && validateEmail(email)) {
    
    createUser();
    
  }
  
  // IFALL JAG SKA LOOPA IGENOM FORMULÄRET

  // for(let i = 0; i < regForm.length; i++) {

  // }

})





let usersArray = [];

const createUser = () => {

  const user = {
    id: Date.now().toString(),
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value
  }
  usersArray.push(user)
  userCardsOutput();
  // input.value

}

  const userCardsOutput = () => {
    userContainer.innerHTML = '';
    usersArray.forEach(user => {

      userContainer.innerHTML += `
      <div class="user-card">
        <div class ="user-info">
          <p>${user.firstName} ${user.lastName}</p>
          <p class="p-email">${user.email}</p> 
        </div>
        <div id="${user.id}" class="card-btn">
          <button type="button" class="btn change-btn" id="change-btn">Change</button>
          <button type="button" class="btn remove-btn" id="remove-btn">Remove</button>
        </div>
      </div>`;
  })
}


userContainer.addEventListener('click', (e) => {
  if(e.target.id === 'remove-btn') {
    usersArray = usersArray.filter(user => user.id !== e.target.parentNode.id) 
    userCardsOutput();
    
  }
  else if(e.target.id === 'change-btn') {
    console.log('changeknappen')

    // Försöka göra så att man kan ändra en användare
    e.currentTarget[0] = firstName.value
  }
})


