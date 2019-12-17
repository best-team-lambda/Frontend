import axios from 'axios';


export const isUsernameAvailable = async (name) => {
    try{
        const result = await axios.post('https://ddq.herokuapp.com/api/util/username', {username: name});
        if(result){ 
            return result.data;
        }
    }catch(err){
        console.log('isUsernameAvailable Catch Error:', err.response.data.message);
        return true;
    }
}
export const isValidUsername = (username) => {
    if(!(/^[a-z][a-z0-9_]*$/i.test(username))) {
      return false;
    }
    return true;
  };

//move full user object validator here- send object in, return true/false. 
//can use to update, just send current values on fields that are not being updated.
//doing validation only here means there is one set of rules (and also on the backend)
export const validateInputs = (user) => {
    // console.log("validate Firing");
    if (user.username === "") {
      alert("You must enter a username.");
      return false;
    }
    else if(!(/^[a-z][a-z0-9_]*$/i.test(user.username))) {
      alert("Username must start with a letter and may only contain a-z, _, or numbers.");
      return false;
    }
    // if (!isValidPassword(newUser.password)) {
    //   return false;
    // }
    if (user.name === "") {
      alert("You must enter your name.");
      return false;
    }
    // console.log('validate inputs returning true');
    return true;
  };

export const isValidPassword = (password) => {

    if (password === "") {
      alert("You must enter a password.");
      return false;
    }
    if (password.length < 5 || password.length > 20) {
      alert("Password cannot be less than 5 or greater than 20 characters");
      return false;
    }
    if (!/(!|@|#|\$|&|\*|%|^)/.test(password)) {
      alert("Password must contain at least one special character");
      return false;
    }
    if (!/([A-Z])/.test(password)) {
      alert("Password must contain at least one capitalized letter");
      return false;
    }
    if (!/([0-9])/.test(password)) {
        alert("Password must contain at least one number");
        return false;
    }
    return true;
  };


export const scrollToTop = () => {
  window.scrollTo(0, 0);
}
export const scrollToBottom = () => {
  window.scrollTo(0, 30000);
  // window.scrollBy(0, -200);
}