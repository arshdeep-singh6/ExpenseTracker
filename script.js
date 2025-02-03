let submitBtn = document.getElementById("btn");
let expenseForm = document.getElementById("expenseForm");
const table = document.getElementById("expTable");
const tableBody = document.querySelector("tbody");
const clearAll = document.getElementById("deleteAll");
// const showTotal = document.getElementById("calcTotal");
const total = document.getElementById("total");
let num = localStorage.getItem("expenseCount") ? Number(localStorage.getItem("expenseCount")) : 0;



expenseForm.addEventListener("submit", function(event){

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    event.preventDefault();
    const expName = document.getElementById("expName").value;
    const amountInStr = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date= document.getElementById("date").value;

    const amount = Number(amountInStr);

    if(expName.trim() !=="" && amount !==0 && category.trim() !== "" && date!="")
    {
        console.log(expName);
        console.log(amount);
        console.log(category);
        console.log(date);

        const expense = {
            expId: "exp" + num++,
            expName: expName,
            expAmount: amount,
            expCategory: category,
            expDate: date
        }
        
        expenses.push(expense);

        localStorage.setItem("expenses", JSON.stringify(expenses));
        localStorage.setItem("expenseCount", num);

        addExpense();
        expenseForm.reset();
    }
    else
    {
        console.log("All fields are mandatory");
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "All fields are mandatory!",
            background: "#f0e6b4",
            color: "#ff6675",
            confirmButtonColor: "#ff4d4d",
        });
    }
})

tableBody.addEventListener("click", function(event){
    console.log("clicked");
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    if (event.target.classList.contains("delete")) {
        console.log(expenses);
        if(expenses != [])
        {
            const row = event.target.closest("tr");
            if(row)
            {
                const expIndex = expenses.findIndex((expense) => 
                    expense.expId === row.getAttribute("id"))

                console.log("expense To del", expIndex);

                if(expIndex !== -1)
                {
                    expenses.splice(expIndex, 1);
                    localStorage.setItem("expenses", JSON.stringify(expenses));
                    console.log(expenses);
                    row.remove();
                    console.log("deleted");
                    total.textContent= calculateTotal();
                }
                

            }   

        }
    }

    
})

function addExpense()
{

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

        tableBody.innerHTML = "";

        if(expenses.length >0)
        {
            tableBody.innerHTML =
            `<tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
            </tr>`;
        }
        
        expenses.forEach(expense => {
        const row = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdAmount = document.createElement("td");
        const tdCategory = document.createElement("td");
        const tdDate = document.createElement("td");
        const tdAction = document.createElement("td");
        const delBtn = document.createElement("button");
        delBtn.classList.add("delete");
        delBtn.textContent = "Delete";
        

        tdName.textContent = expense.expName;
        tdAmount.textContent = expense.expAmount;
        tdCategory.textContent = expense.expCategory;
        tdDate.textContent = expense.expDate;
        tdAction.appendChild(delBtn);

        row.id=expense.expId;
        row.appendChild(tdName);
        row.appendChild(tdAmount);
        row.appendChild(tdCategory);
        row.appendChild(tdDate);
        row.appendChild(delBtn);

        tableBody.appendChild(row);
        total.textContent = calculateTotal();
        
    });
}

function calculateTotal()
{   
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = 0;
    expenses.forEach(expense =>{
        total += expense.expAmount;
    })
    return total;
}


document.addEventListener("DOMContentLoaded", addExpense);

clearAll.addEventListener("click", function(){
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.length = 0;
    localStorage.removeItem("expenses");
    localStorage.setItem("expenseCount", 0);
    console.log(expenses);
    total.textContent = "";
    tableBody.innerHTML =
    `<tr>
    <th>Name</th>
    <th>Amount</th>
    <th>Category</th>
    <th>Date</th>
    <th>Action</th>
    </tr>`;

    
})

// showTotal.addEventListener("click", function(){


//     let totalAmount = calculateTotal(); 
    // expenses.forEach(expense =>{
    //     totalAmount += expense.expAmount;
    // })
//     total.textContent= totalAmount;
// })