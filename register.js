const usernameInput =
document.getElementById("username");

const passwordInput =
document.getElementById("password");

const registerBtn =
document.getElementById("registerBtn");

const message =
document.getElementById("message");


function createEmail(username){

return `${username}@expense-tracker.app`;

}


function isValidUsername(username){

if(username.length < 4){

return "Username must be at least 4 characters";

}

if(username.includes(" ")){

return "Username cannot contain spaces";

}

return null;

}


function isValidPassword(password){

if(password.length < 8){

return "Password must be at least 8 characters";

}

if(password.includes(" ")){

return "Password cannot contain spaces";

}

return null;

}


registerBtn.addEventListener(

"click",

async ()=>{

const username =
usernameInput.value.trim();

const password =
passwordInput.value;


if(!username || !password){

message.textContent =
"Fill all fields";

return;

}


const usernameError =
isValidUsername(username);

if(usernameError){

message.textContent =
usernameError;

return;

}


const passwordError =
isValidPassword(password);

if(passwordError){

message.textContent =
passwordError;

return;

}


const email =
createEmail(username);


const {error} =
await supabaseClient.auth.signUp({

email,

password

});


if(error){

message.textContent =
error.message;

return;

}


message.textContent =
"Account created! Redirecting...";


setTimeout(()=>{

window.location.href =
"index.html";

},1500);

});