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
   // Store the password length
   const passwordLength = prompt(
    `How long would you like your password to be?
  Must be at least 8 and no more than 128 characters`
  );

  // Verify that the password is in the acceptable range
  while (passwordLength < 8 || passwordLength > 128) {
    console.log(`Password length is ${passwordLength}`);

    // Retry getting a valid password length from the user
    passwordLength = prompt(
      `${passwordLength} is less than eight characters or greater than 128 characters. Please enter a new password length.`
    );
  }

  const lowercase = prompt(
    `Would you like to use uppercase characters in your password?`
  );
  const uppercase = prompt(
    `Would you like to use lowercase characters in your password?`
  );
  const numeric = prompt(`Would you like to use numbers in your password?`);
  const specialChar = prompt(
    `Would you like to use special characters in your password?`
  );

  
    // Populate the types array with the user's chosen character types
    const charTypes = [];

    if (lowercase === 'yes') {
      charTypes.push('lowercase');
    }
    if (uppercase === 'yes') {
      charTypes.push('uppercase');
    }
    if (numeric === 'yes') {
      charTypes.push('numeric');
    }
    if (specialChar === 'yes') {
      charTypes.push('special');
    }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
