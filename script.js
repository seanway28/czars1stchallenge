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

    let password = '';
    console.log('Lenght: ', Number(passwordLength));

    for (i = 0; password.length < Number(passwordLength); i++) {
      for (j = 0; j < charTypes.length; j++) {
        if (charTypes[j] === 'lowercase') {
          // Generate a string of lowercase alphanumeric characters
          let lowerString = Math.random().toString(36).slice(2);
          lowerString = lowerString.replace(/\d+/g, '');
          password += lowerString[0];
        }

        if (charTypes[j] === 'uppercase') {
          let upperString = '';
          // Generate a string of uppercase alphanumeric characters
          upperString = Math.random().toString(36).toUpperCase().slice(2);
          upperString = upperString.replace(/\d+/g, '');
          password += upperString[0];
        }

        if (charTypes[j] === 'numeric') {
          // Generate a random number
          let num = Math.floor(Math.random() * 10);
          num = num.toString();
          password += num;
        }

        if (charTypes[j] === 'special') {
          const specialChars = `~\`!#$%^&*+=-[]';,/{}|\\":<>?`;
          let specialChar = '';
          // Select a random special character from the list
          specialChar =
            specialChars[Math.floor(Math.random() * specialChars.length)];
          // Add the special character to the current password
          password += specialChar;
        }
      }
    }
}



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
