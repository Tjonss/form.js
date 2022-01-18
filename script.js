const regForm = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const userContainer = document.querySelector('#user-container');
const regButton = document.querySelector('#reg-button');




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


regForm.addEventListener('submit', (e) => {
  e.preventDefault();

  validateName(firstName);
  validateName(lastName);
  validateEmail(email);
  if(validateName(firstName) 
    && validateName(lastName) 
    && validateEmail(email)) {
    
    createUser();
    clearForm();
  }
  
  // IFALL JAG SKA LOOPA IGENOM FORMULÄRET

  // for(let i = 0; i < regForm.length; i++) {

  // }

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
          <button type="button" class="btn change-btn" id="change-btn">Change</button>
          <button type="button" class="btn remove-btn" id="remove-btn">Remove</button>
        </div>
      </div>`;
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


userContainer.addEventListener('click', (e) => {

  const parent = e.target.parentNode.id;
  if(e.target.id === 'remove-btn') {
    usersArray = usersArray.filter(user => user.id !== parent) 
    userCardsOutput();
  } 

  else if(e.target.id === 'change-btn') {
        usersArray.forEach(user => {
          if(user.id === parent) {
            firstName.value = user.firstName;
            lastName.value = user.lastName;
            email.value = user.email;
        }
      })
      
      regButton.classList.add('d-none')

      let changeButton = document.createElement('button');
      changeButton.classList.add('mt-1', 'btn', 'btn-primary');
      changeButton.innerText = 'EDIT USER';

      let regButtons = document.querySelector('.reg-buttons');

      regButtons.appendChild(changeButton)

      
      // changeButton.addEventListener('click', () => updateUser(parent, changeButton)) 
      changeButton.addEventListener('click', () => {
        updateUser(parent, changeButton)
      })
      
      
      // firstName.parentElement.classList.remove('is-invalid')
      // lastName.parentElement.classList.remove('is-invalid')
      // email.parentElement.classList.remove('is-invalid')
      
    }

  
})

const updateUser = (parent, changeButton) => {


  for(const user of usersArray) {
    if(user.id === parent) {
      user.firstName = firstName.value
      user.lastName = lastName.value
      user.email = email.value
    }
  }
  
  userCardsOutput();
  
  regButton.classList.remove('d-none')
  changeButton.remove();
  clearForm();
  
          // index = usersArray.findIndex(user => user.id === parent)
          // usersArray[index].firstName = firstName.value
          // usersArray[index].lastName = lastName.value
          // usersArray[index].email = email.value
}

      



// const newButton = () => {

//   regButton.classList.add('d-none')
  
//   const changeButton = document.createElement('button');
//   changeButton.classList.add('mt-1', 'btn', 'btn-primary');
//   changeButton.innerText = 'EDIT USER';

//   regForm.appendChild(changeButton)

//   changeButton.addEventListener('click', (e) => {

//   })

// }











    // const updateUser = (e) => {
    //   elementIndex = usersArray.findIndex(user => user.id === e.target.parentNode.id)
    //   usersArray[elementIndex].firstName = firstName.value
    //   usersArray[elementIndex].lastName = lastName.value
    //   usersArray[elementIndex].email = email.value

    // }





// const skapaAnvandare = user => {

//   let userCard = document.createElement('div');
//   userCard.classList.add('user-card');

//   let userInfo = document.createElement('div');
//   userInfo.classList.add('user-info')

//   let userName = document.createElement('p');
//   userName.innerText = user.firstName, user.lastname

//   let userEmail = document.createElement('p');
//   userEmail.classList.add('p-email');
//   userEmail.innerText = user.email

//   let editButton = document.createElement('button');
//   editButton.classList.add('btn', 'change-btn');
//   editButton.innerText = 'Change';

//   let removeButton = document.createElement('button');
//   removeButton.classList.add('btn', 'remove-btn');
//   removeButton.innerText = 'Remove';

//   userCard.appendChild(userInfo)
//   userInfo.appendChild(userName)
//   userInfo.appendChild(userEmail)
//   userInfo.appendChild(editButton)
//   userInfo.appendChild(removeButton)

//   userContainer.appendChild(userCard)

//   removeButton.addEventListener('click', (e) => {
//     if(e.target.id === 'remove-btn') {
//       usersArray = usersArray.filter(user => user.id !== e.target.parentNode.id) 
//       skapaAnvandare();
//     }
//     else if(e.target.id === 'change-btn') {

//     }
//   })
// }
