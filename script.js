// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword () {
  var characterLength = prompt("How many characters would you like? (8 to 128 characters pls)")

  while(characterLength < 8 || characterLength > 128) {
    characterLength = prompt("Yo 8 to 128 bro, try again")
  }

  var lowercaseCheck = prompt("Do you want lower case characters?")

  if (lowercaseCheck==="yes") {
    lowercaseCheck = true
  } else {
    lowercaseCheck = false
  }

  var UppercaseCheck = prompt("Do you want upper case characters?")

  if (UppercaseCheck==="yes") {
    UppercaseCheck = true
  } else {
    UppercaseCheck = false
  }

  
  var numericCheck = prompt("Do you want numbers?")
  
  if (numericCheck==="yes") {
    numericCheck = true
  } else {
    numericCheck = false
  }
  
  var specialCharCheck = prompt("Do you want special characters?")
  const specialChars = `~\`!#$&@+=-*[]';,\{}|\\":<>?`;

  if (specialCharCheck==="yes") {
    specialCharCheck = true
  } else {
    specialCharCheck = false
  }

  console.log(lowercaseCheck, UppercaseCheck, numericCheck, specialCharCheck);

  var password = '';

  for (i = 0; i <= Number(characterLength); i++) {
    if (lowercaseCheck) {
      var lowerString = Math.random().toString(36).slice(2).replace(/^[0-9]g/)
      console.log(lowerString)
    }
  }


  console.log(lowercaseCheck)
  return "Sean"
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
