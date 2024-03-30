const productList = [
    {
        name: 'Гамбургер простой',
        price: 10000,
        kkal: 500,
        amount: 0,
        get Summa() {
            return this.price * this.amount;
        },
        get Kkal() {
            return this.kkal * this.amount;
        }
    },
    {
        name: 'Гамбургер FRESH',
        price: 20500,
        kkal: 700,
        amount: 0,
        get Summa() {
            return this.price * this.amount;
        },
        get Kkal() {
            return this.kkal * this.amount;
        }
    },
    {
        name: 'FRESH Combo',
        price: 31900,
        kkal: 1200,
        amount: 0,
        get Summa() {
            return this.price * this.amount;
        },
        get Kkal() {
            return this.kkal * this.amount;
        }
    }
]

const extraProduct = {
    doubleMayonnaise: {
        price: 2000,
        name: 'Двойной майонез',
        kkal: 300
    },
    lettuce: {
        price: 1000,
        name: 'Салатный лист',
        kkal: 30
    },
    cheese: {
        price: 3000,
        name: 'Сыр',
        kkal: 350
    }
}

const cards = document.querySelectorAll('.main__product')
cardBtns = document.querySelectorAll('.main__product-btn'),
    productSums = document.querySelectorAll('.main__product-price span'),
    productsKal = document.querySelectorAll('.main__product-call span');

for (let i = 0; i < productList.length; i++) {
    productList[i].nickname = cards[i].id;
}

cardBtns.forEach(btn => {
    btn.onclick = () => {
        plusOrMinus(btn);
    };
});

function plusOrMinus(btn) {
    let parent = btn.closest('.main__product'),
        parentId = parent.id;

    productList.forEach(product => {
        if (product.nickname != parentId) return;
        if (btn.classList.contains('plus')) {
            product.amount++;
        } else {
            if (product.amount > 0) {
                product.amount--;
            }
        }
    })

    displayResult();
}

function displayResult() {
    const productsArr = [];

    productList.forEach((product, i) => {
        const productCard = document.querySelector(`#${product.nickname}`),
            productCounter = productCard.querySelector('.main__product-num');

        if (product.amount) {
            productsArr.push(product);
            productCounter.innerHTML = product.amount;
        } else productCounter.innerHTML = 0;

        productSums[i].innerHTML = product.Summa.toLocaleString();
        productsKal[i].innerHTML = product.Kkal.toLocaleString();

    })


}