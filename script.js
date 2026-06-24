const expenseForm = document.getElementById("expenseForm");

const expenseName = document.getElementById("expenseName");

const expenseAmount = document.getElementById("expenseAmount");

const expenseCategory = document.getElementById("expenseCategory");

const expenseList = document.getElementById("expenseList");

const total = document.getElementById("total");


expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value;

    const amount = Number(expenseAmount.value);

    const category = expenseCategory.value;


    const newExpense = document.createElement("li");

    newExpense.textContent =
        `${name} - ₹${amount} (${category})`;

    expenseList.appendChild(newExpense);

});