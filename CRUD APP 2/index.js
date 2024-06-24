let nom = document.getElementById('name')
let age = document.getElementById('age')
let adresse = document.getElementById('adresse')
let email = document.getElementById('email')
let tbody = document.getElementById('tbody')
let addBtn = document.getElementById('add')

// create
function add() {
    if (nom.value == '' || age.value == ""|| adresse.value == "" || email.value == "" ) {
        handlError('alert-danger', 'write something')
    } else {
        if (addBtn.innerHTML == 'Add Data') {
            tbody.innerHTML += `
            <tr>
                <td>${nom.value}</td>
                <td>${age.value}</td>
                <td>${adresse.value}</td>
                <td>${email.value}</td>
                <td>
                <button class="delete btn btn-danger" onclick="del(this)">Delete</button>
                <button class="delete btn btn-warning" onclick="edit(this)">Edit</button>
                </td>
            </tr> `;
            handlError('alert-success', 'data added')
        } else {
            td[0].innerHTML = nom.value;
            td[1].innerHTML = age.value;
            td[2].innerHTML = adresse.value;
            td[3].innerHTML = email.value;
            addBtn.innerHTML = 'Add Data';
            handlError('alert-info', 'data updated')
        }
        clearData()
        saveData()
    }
}

// clear inputs
function clearData(){
    nom.value = '';
    age.value = '';
    adresse.value = '';
    email.value = '';
}

// delete data
function del(btn) {
    btn.parentElement.parentElement.remove()
    handlError('alert-warning', 'data deleted')
    saveData()
}

function edit(btn) {
    let tr = btn.parentElement.parentElement
    td = tr.children
    nom.value = td[0].innerHTML;
    age.value = td[1].innerHTML;
    adresse.value = td[2].innerHTML;
    email.value = td[3].innerHTML;
    addBtn.innerHTML = 'edit';
    // addBtn.classList.add('btn-warning')
    saveData()
}

function saveData() {
    localStorage.setItem('dataTable', tbody.innerHTML);
}

function showData() {
    tbody.innerHTML = localStorage.getItem('dataTable');
}
showData()


function handlError(color, errorMsg) {
    let firstDiv = document.getElementById('div1')
    let container = document.querySelector('.container');
    let div = document.createElement('div');
    div.innerHTML = errorMsg;
    div.classList.add('alert');
    div.classList.add(color);
    container.insertBefore(div, firstDiv)
    setTimeout( _=> div.style.display = 'none',5000)
}

