'use strict';

var prductsName = ['banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair',
    'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors',
    'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can',
    'wine-glass'];

var productSection = document.querySelector('#allproducts');

var leftProduct = document.getElementById('leftProduct');
var middleProduct = document.getElementById('middletProduct');
var rightProduct = document.getElementById('rightProduct');




Product.all = [];  // array of objects ..

function Product(pName, imgPath) {

    this.productName = pName;
    this.pImgPath = imgPath;
    this.views = 0;
    this.votes = 0;
    Product.all.push(this);
}



// instantiating new objects in a shot ...  instead of making 20 instance for each product ( object {product Name, product Path}) ^_-

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

var leftIndex;
var middleIndex;
var rightIndex;

function render() {

    var min = 0; // (index 0 ) in the array of objects...
    var max = Product.all.length - 1;  // the length is 7 but we need 6 ....

    // Random Number between 0 and 6 ... 
    var leftRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    var middleRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    var rightRandom = Math.floor(Math.random() * (max - min + 1)) + min;

    leftIndex = Product.all[leftRandom];
    middleIndex = Product.all[middleRandom];
    rightIndex = Product.all[rightRandom];


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

    }
    if (totalClicks == 25) {
        renderResult();
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