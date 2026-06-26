const expenseName =
document.getElementById("expenseName");

const expenseAmount =
document.getElementById("expenseAmount");

const expenseCategory =
document.getElementById("expenseCategory");

const addExpenseBtn =
document.getElementById("addExpenseBtn");

const expenseList =
document.getElementById("expenseList");

const total =
document.getElementById("total");

const logoutBtn =
document.getElementById("logoutBtn");

const searchInput =
document.getElementById("searchInput");


let totalAmount = 0;


loadExpenses();


addExpenseBtn.addEventListener(
"click",

async ()=>{

const name =
expenseName.value.trim();

const amount =
Number(expenseAmount.value);

const category =
expenseCategory.value;


if(!name || !amount){

return;

}


const {
data:{user}
} = await supabaseClient.auth.getUser();

const now = new Date();

const expenseDate =
now.toISOString().split("T")[0];

const expenseTime =
now.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
});


const {error} =
await supabaseClient

.from("expenses")

.insert({

user_id:user.id,

name,

amount,

category,

expense_date:expenseDate,

expense_time:expenseTime

});


if(error){

console.log(error);

alert(error.message);

return;

}


expenseName.value = "";

expenseAmount.value = "";

loadExpenses();

});


async function loadExpenses(){

expenseList.innerHTML = "";

totalAmount = 0;


const {
data:{user}
} = await supabaseClient.auth.getUser();


const {data,error} =
await supabaseClient

.from("expenses")

.select("*")

.eq("user_id",user.id)

.order("created_at",{ascending:false});


if(error){

console.log(error);

return;

}


data.forEach((expense)=>{

totalAmount += expense.amount;


const li =
document.createElement("li");


li.innerHTML = `

<div>

<h3>${expense.name}</h3>

<p>₹${expense.amount}</p>

<p>${expense.category}</p>

<p>📅 ${expense.expense_date || "-"}</p>

<p>🕒 ${expense.expense_time || "-"}</p>

</div>

<button onclick="deleteExpense(${expense.id})">

🗑️

</button>

`;


expenseList.appendChild(li);

});


total.textContent = totalAmount;

}


async function deleteExpense(id){

const {error} =
await supabaseClient

.from("expenses")

.delete()

.eq("id",id);


if(error){

console.log(error);

return;

}


loadExpenses();

}


logoutBtn.addEventListener(

"click",

async ()=>{

await supabaseClient.auth.signOut();

window.location.href =

"index.html";

});

searchInput.addEventListener(

"input",

()=>{

const search =
searchInput.value.toLowerCase();

const expenses =
expenseList.querySelectorAll("li");

expenses.forEach((expense)=>{

const text =
expense.textContent.toLowerCase();

if(text.includes(search)){

expense.style.display = "flex";

}

else{

expense.style.display = "none";

}

});

});