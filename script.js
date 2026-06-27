// =========================
// Personal Finance Tracker
// Part 2C
// =========================

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");

const addButton = document.getElementById("addButton");

const transactionList = document.getElementById("transactionList");

const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expensesDisplay = document.getElementById("expenses");

let transactions = [];

addButton.addEventListener("click", addTransaction);

function addTransaction() {

    const description = descriptionInput.value.trim();

    const amount = Number(amountInput.value);

    const type = typeSelect.value;

    if (description === "" || amount <= 0) {

        alert("Please enter a valid description and amount.");

        return;

    }

    transactions.push({

        id: Date.now(),

        description,

        amount,

        type

    });

    descriptionInput.value = "";

    amountInput.value = "";

    typeSelect.value = "income";

    updateScreen();

}

function updateScreen() {

    renderTransactions();

    updateSummary();

}

function renderTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(transaction => {

        const item = document.createElement("li");

        item.className = transaction.type;

        item.innerHTML = `

<div class="transaction-left">

<div class="transaction-title">

${transaction.description}

</div>

<div class="transaction-type">

${transaction.type.toUpperCase()}

</div>

</div>

<div class="transaction-right">

<div class="amount ${transaction.type === "income" ? "incomeAmount" : "expenseAmount"}">

${transaction.type === "income" ? "+" : "-"}$${transaction.amount.toFixed(2)}

</div>

<button class="deleteButton" onclick="deleteTransaction(${transaction.id})">

Delete

</button>

</div>

`;

        transactionList.appendChild(item);

    });

}

function deleteTransaction(id) {

    transactions = transactions.filter(transaction => transaction.id !== id);

    updateScreen();

}

function updateSummary() {

    let income = 0;

    let expenses = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {

            income += transaction.amount;

        }

        else {

            expenses += transaction.amount;

        }

    });

    const balance = income - expenses;

    balanceDisplay.textContent = "$" + balance.toFixed(2);

    incomeDisplay.textContent = "$" + income.toFixed(2);

    expensesDisplay.textContent = "$" + expenses.toFixed(2);

}

updateScreen();