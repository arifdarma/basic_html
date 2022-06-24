let total=0;
let total_income = 0;
let total_expense = 0;
let history = [];

let formatter = new Intl.NumberFormat('id-ID', {
    style:'currency',
    currency:'IDR',
})

function submit() {
    let detail = document.getElementById('transaction_details').value;
    document.getElementById('transaction_details').value='';

    let amount = document.getElementById('amount').value;
    document.getElementById('amount').value='';
    amount=parseInt(amount);

    let items ={
        detail,
        amount
    }

    if(amount>0){
        total_income+=amount;
        document.getElementById('income_total').innerHTML='+'+formatter.format(total_income);
    }else{
        total_expense-=amount;
        document.getElementById('expense_total').innerHTML='-'+formatter.format(total_expense);
    }

    let historyFill = '';
    history.push(items);
    for (let i = 0; i < history.length; i++) {
        historyFill += `<div class="d-flex justify-content-between"><button class="btn btn-danger" value="${i}" onclick="deleteRow(${i})">x</button><div>`+history[i].detail+`</div><div>`+ history[i].amount +`</div></div>`
    }

    total+=amount;
    document.getElementById('historyList').innerHTML = historyFill;
    document.getElementById('balance__tracker').innerHTML=''+formatter.format(total);
}

function deleteRow(i) {
    let historyFill = '';

    if(history[i].amount>0){
        total_income-=history[i].amount;
        document.getElementById('income_total').innerHTML='+'+formatter.format(total_income);
    }else{
        total_expense += history[i].amount;
        document.getElementById('expense_total').innerHTML='-'+formatter.format(total_expense);
    }
    total -= history[i].amount;

    document.getElementById('balance__tracker').innerHTML=''+formatter.format(total);

    history.splice(i,1)
    for (let i = 0; i < history.length; i++) {
        historyFill += `<div class="d-flex justify-content-between"><button class="btn btn-danger" value="${i}" onclick="deleteRow(${i})">x</button><div>`+history[i].detail+`</div><div>`+ history[i].amount +`</div></div>`
    }

    document.getElementById('historyList').innerHTML = historyFill;
}