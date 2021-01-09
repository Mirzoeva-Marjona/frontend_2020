if (localStorage.getItem("countProducts") == null) {
    localStorage.setItem("countProducts", "0");
} else {
    const countProducts = localStorage.getItem("countProducts");
    $('.js-product-count').text(countProducts);
}

if (localStorage.getItem("basket") == null) {
    const map = new Map();
    localStorage.setItem("basket", JSON.stringify(Array.from(map.entries())));
}

const products = new Map([
    [1, {
        img: '../img/socks_1.png',
        name: "Носки. Устрицы",
        price: 299
    }],
    [2, {
        img: '../img/socks_2.png',
        name: "Носки. Мартин",
        price: 299
    }],
    [3, {
        img: '../img/socks_3.png',
        name: "Носки. Кальмары",
        price: 299
    }],
    [4, {
        img: '../img/socks_4.png',
        name: "Носки. Голуби",
        price: 299
    }],
    [5, {
        img: '../img/socks_5.png',
        name: "Носки. Геометрия",
        price: 299
    }],
    [6, {
        img: '../img/socks_6.png',
        name: "Носки. Суши",
        price: 299
    }],
    [7, {
        img: '../img/socks_7.png',
        name: "Носки. Моллюски",
        price: 299
    }],
    [8, {
        img: '../img/socks_8.png',
        name: "Носки. Зебра",
        price: 299
    }]
]);

localStorage.setItem("products", JSON.stringify(Array.from(products.entries())));

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const preloaderOpen = () => {
    $('.js-loader, .js-overlay').removeClass('js-hidden');
    $('.js-loader').slideUp(500).slideDown(500);
}

const preloaderClose = () => {
    $('.js-loader').slideUp(500).slideDown(500).delay(1000);
    $('.js-loader').addClass('js-hidden');
}

$('.js-open-basket').click(function (event) {
    preloaderOpen();
    sleep(2000).then(() => {
        preloaderClose();
        showBasket();
    });
});

const showBasket = () => {
    $('.js-basket').removeClass('js-hidden');

    console.log("open basket");

    const basketJson = localStorage.getItem("basket");
    const basketMap = new Map(JSON.parse(basketJson));
    $('.js-basket-items').empty();

    let total = 0;
    const productEntries = basketMap.entries()
    for (const [id, purchase] of productEntries) {
        const product = products.get(purchase.productId);
        const purchaseInfo = {
            count: purchase.quantity,
            size: purchase.size,
            idRow: id,
        }
        const productInfo = {...product, ...purchaseInfo}

        total += productInfo.count * productInfo.price;

        //const row = createBasketRow(productInfo);
        //$('.js-basket-items').append(row);
        const basketItems= document.querySelector(".js-basket-items");
        const productRow = new ProductRow(basketItems);
        productRow.setCount(productInfo.count);
        productRow.socksSize = productInfo.size;
        productRow.productImageSource = productInfo.img;
        productRow.productName = productInfo.name;
        productRow.socksPrice = productInfo.price;

    }
    $('.js-basket-total').text(`Итого: ${total} руб.`);
    $('.js-remove-from-basket').click(function (event) {
        const productId = $(this).parent(".js-product-row").data('full-product-id');
        console.log(productId);
        const productRow = basketMap.get(productId);
        if (productRow.quantity > 1) {
            productRow.quantity--;
        } else {
            basketMap.delete(productId);
        }
        const countProducts = localStorage.getItem("countProducts");
        const newCount = Number(countProducts) - 1;

        localStorage.setItem("countProducts", newCount);
        $('.js-product-count').text(newCount);
        localStorage.setItem("basket", JSON.stringify(Array.from(basketMap.entries())));
        showBasket();
    })
}

$('.js-close-basket').click(function (event) {
    console.log("close basket");
    $('.js-basket, .js-overlay, .js-loader').addClass("js-hidden");
});

const initProductCards = () => {
    $('.js-add-to-basket').click(function (event) {
        console.log("add to basket");

        const productId = $(this).parent('.js-product-card').data('product-id');
        console.log(productId);

        const socksSize = $(this).parent('.js-product-card').find('select').val();
        console.log(socksSize);
        if (socksSize === 'Размер') {
            $('.js-notification, .js-overlay').removeClass('js-hidden');
        } else {
            const countProducts = localStorage.getItem("countProducts");
            const newCount = Number(countProducts) + 1;

            localStorage.setItem("countProducts", newCount);
            $('.js-product-count').text(newCount);

            console.log(newCount);

            const basketJson = localStorage.getItem("basket");
            const basketMap = new Map(JSON.parse(basketJson));

            const productId_size = productId + socksSize;
            if (basketMap.has(productId_size)) {
                let productInBasket = basketMap.get(productId_size);
                productInBasket.quantity++;
            } else {
                basketMap.set(productId_size, {
                    productId: productId,
                    quantity: 1,
                    size: socksSize
                })
            }
            localStorage.setItem("basket", JSON.stringify(Array.from(basketMap.entries())));
        }
    })
}

const createBasketRow = (productInfo) => {
    const clone = productItemRow.content.cloneNode(true);
    $(clone).find(".js-product-row").data('full-product-id', productInfo.idRow);
    $(clone).find(".js-product-img").attr("src", productInfo.img);
    $(clone).find(".js-product-name").text(productInfo.name);
    $(clone).find(".js-product-size").text(productInfo.size);
    $(clone).find(".js-product-quantity").text(`${productInfo.count} шт.`);
    $(clone).find(".js-product-price").text(`${productInfo.count * productInfo.price} руб.`);
    const counter = new Counter(clone);
    counter.value = productInfo.count;
    return clone;
}

$('.js-overlay').click(function (event) {
    $('.js-basket, .js-notification, .js-overlay, .js-loader').addClass("js-hidden");
})

const creatProductCard = (product) => {
    const clone = productCard.content.cloneNode(true);
    $(clone).find(".js-product-card").data('product-id', product.id);
    $(clone).find(".js-product-img").attr("src", product.img);
    $(clone).find(".js-product-name").text(product.name);
    $(clone).find(".js-product-price").text(product.price);
    return clone;
}

const showProductCards = () => {
    const productEntries = products.entries();
    for (const [id, product] of productEntries) {

        product.id = id;
        const card = creatProductCard(product);
        $(".js-product-cards-container").append(card);
    }
}

showProductCards();
initProductCards();