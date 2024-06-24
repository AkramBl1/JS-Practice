let selectedRow = null;

// show alert
function showAlert(message, className) {
    let div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message))
    let container = document.querySelector('.container');
    let main = document.querySelector('.main');
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector('.alert').remove(), 3000)
}

let inp1 = document.querySelector('#fname')
let inp2 = document.querySelector('#lname')
let inp3 = document.querySelector('#no')
let add = document.querySelector('.add-btn')

// create
 add.addEventListener('click', () => {
    if (inp1.value === '' || inp2.value === '' || inp3.value === '') {
        showAlert('Please you most Write something' ,'danger');
    } else {
    if (selectedRow == null ) {
    let list = document.querySelector('#student-list');
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>${inp1.value}</td>
        <td>${inp2.value}</td>
        <td>${inp3.value}</td>
        <td>
        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        </td>
    `;
    list.appendChild(row);
    showAlert('Student added' ,'success');
    clearField();
    } else {
        collection[0].textContent = inp1.value 
        collection[1].textContent = inp2.value
        collection[2].textContent = inp3.value 
        showAlert('Student Info Edited' ,'info');
        clearField();
        selectedRow = null
    }
    savelocal()
 }
}) 

// delete
document.querySelector('#student-list').addEventListener('click', (e) => {
    target = e.target;
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
        showAlert('Student Data Deleted' ,'danger');
        savelocal()
    }
})

// Update
document.querySelector('#student-list').addEventListener('click', (e) => {
    target = e.target;
    if (target.classList.contains('edit')) {
    parent = target.parentElement.parentElement
    collection = parent.children
    inp1.value = collection[0].textContent
    inp2.value = collection[1].textContent
    inp3.value = collection[2].textContent
    selectedRow = 1
    savelocal()
    }
})

studentList = document.querySelector('#student-list')

function savelocal() {
    localStorage.setItem('datastudent', studentList.innerHTML);
}

function showlocal() {
    studentList.innerHTML = localStorage.getItem('datastudent');
}
showlocal()



function clearField(){
    inp1.value = '';
    inp2.value = '';
    inp3.value = '';
}

 // let tbody = document.querySelector('tbody')
    // let tr = document.createElement('tr');
    // let td1 = document.createElement('td');
    // let td2 = document.createElement('td');
    // let td3 = document.createElement('td');
    // let td4 = document.createElement('td');
    // td1.innerHTML = inp1.value;
    // td2.innerHTML = inp2.value;
    // td3.innerHTML = inp3.value;
    // let a1 = document.createElement('a') ;
    // let a2 = document.createElement('a');
    // a1.href = '#';
    // a1.classList.add('btn', 'btn-warning', 'btn-sm' ,'edit', 'me-2');
    // a1.innerHTML = 'Edit';
    // a2.href = '#';
    // a2.innerHTML = 'Delete';
    // a2.classList.add('btn', 'btn-danger', 'btn-sm' ,'delete');
    // td4.appendChild(a1);
    // td4.appendChild(a2);
    // tr.appendChild(td1);
    // tr.appendChild(td2);
    // tr.appendChild(td3);
    // tr.appendChild(td4);
    // tbody.appendChild(tr);