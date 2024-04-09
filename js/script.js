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

const cards = document.querySelectorAll('.main__product'),
    cardBtns = document.querySelectorAll('.main__product-btn'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    windowOut = document.querySelector('.receipt__window-out'),
    windowTotalPrice = document.querySelector('.receipt__window-total-price'),
    windowBtn = document.querySelector('.receipt__window-btn'),
    message = document.querySelector('.message');

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
        displayResult(product, parent);
    })
}

function displayResult(product, card) {
    let cardNum = card.querySelector('.main__product-num'),
        cardSumma = card.querySelector('.main__product-price'),
        cardCheckboxes = card.querySelectorAll('.main__product-checkbox'),
        cardKkal = card.querySelector('.main__product-call span');

    product.totalSumma = product.Summa;
    product.totalKkal = product.Kkal;

    if (product.amount) {
        cardCheckboxes.forEach(checkbox => {
            let attr = checkbox.getAttribute('data-extra');
            for (const key in extraProduct) {
                if (checkbox.checked && attr == key) {
                    product.totalSumma += extraProduct[key].price;
                    product.totalKkal += extraProduct[key].kkal;
                }
            }
            checkbox.onclick = () => {
                displayResult(product, card);
            }
        })
    }


    cardSumma.innerHTML = product.totalSumma.toLocaleString() + ' сум';
    cardKkal.innerHTML = product.totalKkal.toLocaleString();

    cardNum.innerHTML = product.amount;


}

addCart.onclick = () => {
    let exist = [];
    productList.forEach(product => {
        if (product.amount) exist.push('exist');
    })
    if (exist.length) {
        displayCartResult()
        receipt.classList.add('active');
    } else {
        message.style.top = '15px';
        setTimeout(() => message.style.top = '-100%', 3000);
    }
};

function displayCartResult() {
    let totalPrice = 0;
    productList.forEach(product => {
        if (!product.amount) return;
        windowOut.innerHTML += genProductInList(product);
        totalPrice += product.totalSumma;
    })
    windowTotalPrice.innerHTML = totalPrice.toLocaleString() + ' сум';
}

function genProductInList(product) {
    let { name: productName, amount, totalSumma } = product
    return `
    <div class="receipt__window-product">
        <h4 class="receipt__window-product-title">${productName}</h4>
        <div class="receipt__window-product-details">
            <span class="receipt__window-product-amount">${amount}</span>
            <span class="receipt__window-product-price">${totalSumma.toLocaleString()}</span>
        </div>
    </div>
    `
}


windowBtn.onclick = () => location.reload();