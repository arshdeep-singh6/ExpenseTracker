let submitBtn = document.getElementById("btn");
let expenseForm = document.getElementById("expenseForm");
const table = document.getElementById("expTable");
const tableBody = document.querySelector("tbody");


expenseForm.addEventListener("submit", function(event){

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

        const row = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdAmount = document.createElement("td");
        const tdCategory = document.createElement("td");
        const tdDate = document.createElement("td");
        const tdAction = document.createElement("td");
        const delBtn = document.createElement("button");
        delBtn.classList.add("delete");
        delBtn.textContent = "Delete";

        tdName.textContent=expName;
        tdAmount.textContent=amount;
        tdCategory.textContent=category;
        tdDate.textContent=date;
        tdAction.appendChild(delBtn);

        row.appendChild(tdName);
        row.appendChild(tdAmount);
        row.appendChild(tdCategory);
        row.appendChild(tdDate);
        row.appendChild(delBtn);

        tableBody.appendChild(row);
    }
    else
    {
        console.log("All fields are mandatory");
    }
})

tableBody.addEventListener("click", function(event){
    console.log("clicked");

    if(event.target.classList.contains("delete"))
    {
        const row = event.target.closest("tr");
        if(row)
        {
            tableBody.removeChild(row);
            console.log("deleted");
        }
    }
    
})

