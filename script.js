const regForm = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const userContainer = document.querySelector('#user-container');
const regButton = document.querySelector('#reg-button');
const editButton = document.querySelector('#edit-button');




const invalidInput = (input, textMessage) => {
    const parent = input.parentElement;
    parent.classList.add('is-invalid')
    parent.classList.remove('is-valid')
    parent.querySelector('.invalid-feedback').innerText = textMessage;
    input.focus();
}

const validInput = (input) => {
  const parent = input.parentElement;
  parent.classList.add('is-valid')
  parent.classList.remove('is-invalid')
}

const validateName = (input) => {

  let validName = /^[a-zA-ZäöåÄÖÅ\-]+$/;
  
  switch(true) {
    case (input.value.trim() === ''):
      invalidInput(input, 'You must enter a name.')
      return false;
    case (input.value.trim().length < 2): 
      invalidInput(input, 'Your name must be atleast 2 characters long.')
      return false;
    case (!validName.test(input.value)):
      invalidInput(input, 'Your name is invalid.')
      return false;
    default: 
      validInput(input)
      return true;
  }
}

const validateEmail = email => {
  let regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  switch(true) {
    case (email.value.trim() === ''):
      invalidInput(email, 'Please enter your email address.')
      return false;
    case (!regExEmail.test(email.value) === ''): 
      invalidInput(email, 'You must enter a valid email address')
      return false;
    case (usersArray.some(user => user.email === email.value)): 
      invalidInput(email, 'This email already exists.')
      return false;
    default:
      validInput(email)
      return true;
  }
}

const clearForm = () => {

  regForm.reset();
  for(let i = 0; i < regForm.length; i++) {

    firstName.value = '';
    lastName.value = '';
    email.value = '';
    firstName.parentElement.classList.remove('is-valid')
    lastName.parentElement.classList.remove('is-valid')
    email.parentElement.classList.remove('is-valid')
  }
}

const validateForm = input => {
  switch(input.type) {
    case 'text': return validateName(input)
    case 'email': return validateEmail(input)
    default:
      break;
  }
}


regForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if(!userRef) {
    errors = [];
  
    for(let i = 0; i < regForm.length; i++) {
      errors[i] = validateForm(regForm[i])
    }
    if(!errors.includes(false)) {
      createUser();
      clearForm();
  
    }
  }
  else {
    userRef.firstName = firstName.value
    regButton.innerText = 'Register'
    userCardsOutput()
    clearForm();
    userRef = null
  }

  
})


let usersArray = [];


  const userCardsOutput = () => {
    userContainer.innerHTML = '';
    usersArray.forEach(user => {

      userContainer.innerHTML += `
      <div class="user-card">
        <div id="${user.id}" class="user-info">
          <p>${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}</p>
          <p class="p-email">${user.email}</p> 
          <button type="button" class="btn change-btn" data-editBtn="true" id="change${user.id}">Change</button>
          <button type="button" class="btn remove-btn" data-deleteBtn="true" id="remove${user.id}">Remove</button>
        </div>
      </div>`;

      // document.querySelector('#remove'+ user.id).addEventListener('click', )
      // document.querySelector('#change'+ user.id).addEventListener('click', )
  })

}

const createUser = () => {
  const user = {
    id: Date.now().toString(),
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value
  }
  usersArray.push(user)
  userCardsOutput();
}

let userRef = null

// function removeUser(user) {
//   console.log(this)
//   usersArray = usersArray.filter(_user => _user.id !== user.id)
//   userCardsOutput();
//   clearForm();
// }

// const updateUser = (user) => {
//   firstName.value = user.firstName;
//   lastName.value = user.lastName;
//   email.value = user.email;

//   // regButton.classList.add('d-none')
//   // editButton.classList.remove('d-none')
//   regButton.innerText = 'Edit User'
//   userRef = user
// }


userContainer.addEventListener('click', (e) => {

  console.log(e.target.dataset.editbtn)

  const parent = e.target.parentNode.id;
  if(e.target.dataset.deletebtn === 'true') {

    usersArray = usersArray.filter(user => user.id !== parent) 
    userCardsOutput();
    clearForm();


  } 

  else if(e.target.dataset.editbtn === 'true') {

    firstName.parentElement.classList.remove('is-invalid')
    lastName.parentElement.classList.remove('is-invalid')
    email.parentElement.classList.remove('is-invalid')

    userRef = usersArray.find(user => user.id === parent)
    firstName.value = userRef.firstName;
    lastName.value = userRef.lastName;
    email.value = userRef.email;

  // regButton.classList.add('d-none')
  // editButton.classList.remove('d-none')
    regButton.innerText = 'Edit User'


      //   usersArray.forEach(user => {
      //     if(user.id === parent) {
      //       firstName.value = user.firstName;
      //       lastName.value = user.lastName;
      //       email.value = user.email;
      //   }
      // })
      
      // regButton.classList.add('d-none')
      // editButton.classList.remove('d-none')
      // let changeButton = document.createElement('button');
      // changeButton.classList.add('mt-1', 'btn', 'btn-primary');
      // changeButton.innerText = 'EDIT USER';

      // let regButtons = document.querySelector('.reg-buttons');

      // regButtons.appendChild(changeButton)

      
      // editButton.addEventListener('click', updateUser(parent))
      
      
      // firstName.parentElement.classList.remove('is-invalid')
      // lastName.parentElement.classList.remove('is-invalid')
      // email.parentElement.classList.remove('is-invalid')
      
    }

  
})

const updateUser = (parent) => {
 

  for(const user of usersArray) {
    if(user.id === parent) {
      user.firstName = firstName.value
      user.lastName = lastName.value
      user.email = email.value
    }
  }
  
  userCardsOutput();
  
  
  regButton.classList.remove('d-none')
  editButton.classList.add('d-none')
  // changeButton.remove();
  clearForm();
  
  editButton.removeEventListener('click', updateUser(parent))
}
