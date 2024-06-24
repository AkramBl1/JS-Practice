let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// get total
function getTotal(){
    if (price.value !== '') {
        let result = ( +price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// create product
let dataPro ;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function () {
    if (title.value.trim() == '' || price.value == '' || category.value == '' || count.value >= 100) {
        let inputs = document.getElementById('inputs');
        let crud = document.getElementById('crud');
        let div = document.createElement('div');
        div.className = `alert alert-danger`;
        div.innerHTML = 'You must write title & price & category of product and count must be less than 100';
        setTimeout(() => div.style.display = 'none', 5000);
        crud.insertBefore(div, inputs);
    } else {
    if (submit.innerHTML == "Update") {
        dataPro[inedx].title = title.value ;
        dataPro[inedx].price = price.value ;
        dataPro[inedx].taxes = taxes.value ;
        dataPro[inedx].ads = ads.value ;
        dataPro[inedx].discount = discount.value ;
        dataPro[inedx].category = category.value ;
        count.style.display = 'block';
        submit.innerHTML = "Create";
        submit.style.backgroundColor = 'rgb(0, 90, 0)';
        
    } else {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }

    // count
    if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
    } else {
        dataPro.push(newPro);
    }
}
    // save localstorage
    localStorage.setItem('product',  JSON.stringify(dataPro));

    clearData();
    showData();
    getTotal()
    
}
}

// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

// read 
function showData(){
    table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML =`
        <button onclick="deleteAll()">delete All ${dataPro.length}</button>
        `
        document.createElement('button')
    } else {
        btnDelete.innerHTML = '';
    }
}
showData();

// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// deleteAll
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.value = 1
    count.style.display = 'none';
    submit.innerHTML = "Update";
    submit.style.backgroundColor = 'rgb(82, 82, 199)';
    inedx = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })

}

// search
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let search = document.getElementById('search');

searchTitle.addEventListener('click', tit)
searchCategory.addEventListener('click', cat)

function tit() {
    let x = ''
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].title.includes(search.value)) {
            x +=` <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `;
        }

        document.getElementById('tbody').innerHTML = x
    }
}
function cat() {
    let x = ''
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].category.includes(search.value)) {
            x +=` <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `;
        }

        document.getElementById('tbody').innerHTML = x
    }
}



// clean data

