'use strict';

var prductsName = ['banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair',
    'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors',
    'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can',
    'wine-glass'];

var productSection = document.querySelector('#allproducts');

var leftProduct = document.getElementById('leftProduct');
var middleProduct = document.getElementById('middletProduct');
var rightProduct = document.getElementById('rightProduct');

var votesArray = [];
var viewsArray = [];


Product.all = [];  // array of objects ..

function Product(pName, imgPath) {

    this.productName = pName;
    this.pImgPath = imgPath;
    this.views = 0;
    this.votes = 0;

    Product.all.push(this);
}



// instantiating new objects in a shot ...  instead of making 20 instance of the products ( object {product Name, product Path}) ^_-

for (var i = 0; i < prductsName.length; i++) {

    if (i == 13) {// editing indices (13 & 16 ) cause their different extenssions ... just as the following 

        new Product(prductsName[i], `imgs/${prductsName[i]}.png`);

    } else if (i == 16) {

        new Product(prductsName[i], `imgs/${prductsName[i]}.gif`);

    } else {

        new Product(prductsName[i], `imgs/${prductsName[i]}.jpg`);
    }

}

// another way to edit indices (13 & 16 ) .... but oustside the loop ...

// Product.all[13] = {productName: prductsName[13], pImgPath: "sweep.png"};
// Product.all[16] = {productName: prductsName[16], pImgPath: "usb.gif"};

console.log(Product.all);


function getRandom() {
var min =0;
var max = Product.all.length -1;
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

var leftIndex;
var middleIndex;
var rightIndex;

var arrayOfIndices = [];

function render() {

    leftIndex = Product.all[getRandom()];
    middleIndex = Product.all[getRandom()];
    rightIndex = Product.all[getRandom()];

    for (var i = 0; i < arrayOfIndices.length; i++) {

        do {
            leftIndex = Product.all[getRandom()];

        } while (arrayOfIndices[i] === leftIndex);
        do {
            middleIndex = Product.all[getRandom()];

        } while (middleIndex === leftIndex || arrayOfIndices[i] === middleIndex);
        do{
            rightIndex = Product.all[getRandom()];
    
        }while(rightIndex === leftIndex || rightIndex === middleIndex || arrayOfIndices[i] === rightIndex)
    }


    arrayOfIndices = [];
    arrayOfIndices.push(leftIndex, rightIndex, middleIndex);
    console.log(arrayOfIndices);

    leftProduct.setAttribute('src', leftIndex.pImgPath);
    leftProduct.setAttribute('alt', 'This Image is Not supported');
    leftProduct.setAttribute('title', leftIndex.productName);

    middleProduct.setAttribute('src', middleIndex.pImgPath);
    middleProduct.setAttribute('alt', 'This Image is Not supported');
    middleProduct.setAttribute('title', middleIndex.productName);

    rightProduct.setAttribute('src', rightIndex.pImgPath);
    rightProduct.setAttribute('alt', 'This Image is Not supported');
    rightProduct.setAttribute('title', rightIndex.productName);

}
render();


var totalClicks = 0;
productSection.addEventListener('click', handlingProductsVoting);

function handlingProductsVoting(e) {

    render();

    console.log(e.target.id);

    if (e.target.id == 'leftProduct') {

        totalClicks++;

        leftIndex.votes++;
        leftIndex.views++;

        // console.log(totalClicks);

    } else if (e.target.id == 'middletProduct') {

        totalClicks++;

        middleIndex.votes++;
        middleIndex.views++;

    } else if (e.target.id == 'rightProduct') {

        totalClicks++;
        rightIndex.votes++;
        rightIndex.views++;

    } else {
        totalClicks++;
        leftIndex.views++;
        middleIndex.views++;
        rightIndex.views++;

    }
    if (totalClicks === 25) {
        renderResult();
        chartRender();
    }
}


function renderResult() {

    productSection.innerHTML = '';

    var ulE = document.createElement('ul');
    productSection.appendChild(ulE);

    for (var i = 0; i < Product.all.length; i++) {

        var liE = document.createElement('li');
        ulE.appendChild(liE);

        liE.textContent = `${Product.all[i].productName} Has ${Product.all[i].votes} Votes, and it has seen ${Product.all[i].views} times`;
    }

    productSection.removeEventListener('click', handlingProductsVoting)
}

function chartRender() {


    for (var i = 0; i < Product.all.length; i++) {
        votesArray.push(Product.all[i].votes);
        viewsArray.push(Product.all[i].views);
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: prductsName,
            datasets: [{
                label: '# of Votes',
                data: votesArray,
                backgroundColor:
                    'rgba(255, 99, 132, 0.2)',
                borderColor:
                    'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: '# of views',
                data: viewsArray,
                backgroundColor:
                    'rgba(100, 99, 132, 0.2)',
                borderColor:
                    'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }],

        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}












































// this is what we do if we wanna--->  add attributes (src, alt, title) to the image tags in the html doc  but we still didnt render them randomly using this way..

// leftProduct.setAttribute('src',`imgs/${prductsName}.jpg`);
// leftProduct.setAttribute('src',`imgs/${prductsName[13]}.png`);
// leftProduct.setAttribute('src',`imgs/${prductsName[16]}.gif`); // we need to add alt and title here as well but we are illustrating this to have an idea ..


// middleProduct.src = `imgs/${prductsName[0]}.jpg`;
// middleProduct.src = `imgs/${prductsName[13]}.png`;
// middleProduct.src = `imgs/${prductsName[16]}.gif`;
// middleProduct.alt = `This Image not spported`;  // or 'prductsName[0]'
// middleProduct.title = prductsName[0];

// rightProduct.setAttribute('src',`imgs/${prductsName}.jpg`);
// rightProduct.setAttribute('src',`imgs/${prductsName[13]}.png`);
// rightProduct.setAttribute('src',`imgs/${prductsName[16]}.gif`);


// console.log(productSection);

// console.log(leftProduct);
// console.log(middleProduct);
// console.log(rightProduct);