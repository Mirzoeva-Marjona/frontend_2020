if (localStorage.getItem("countProducts") == null) {
    localStorage.setItem("countProducts", 0);
} else {
    let countProducts = localStorage.getItem("countProducts");
    $('.js-product-count').text(countProducts);
}

if (localStorage.getItem("basket") == null) {
    let map = new Map();
    localStorage.setItem("basket", JSON.stringify(Array.from(map.entries())));
}

let products = new Map([
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
        name: "носки. Суши",
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

$('.js-open-basket').click(function (event) {
    console.log("open basket");
    $('.js-basket').removeClass("js-hidden");
    $('.js-overlay').removeClass("js-hidden");

    let basketJson = localStorage.getItem("basket");
    let basketMap = new Map(JSON.parse(basketJson));
    $('.js-basket-items').empty();

    let pairs = Array.from(basketMap.entries());
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];
        let value = pair[1];

        let productInfo = products.get(value.productId);
        productInfo.count = value.quantity;
        productInfo.size = value.size;

        let row = createBasketRow(productInfo);
        $('.js-basket-items').append(row);
    }
});

$('.js-close-basket').click(function (event) {
    console.log("close basket");
    $('.js-basket').addClass("js-hidden");
    $('.js-overlay').addClass("js-hidden");
});

$('.js-add-to-basket').click(function (event) {
    console.log("add to basket");

    //TODO remove closest
    let productId = $(this).closest('table').parent('.product-item').data('product-id');
    console.log(productId);

    let socksSize = $(this).closest('table').parent('.product-item').find('select').val();
    console.log(socksSize);
    if (socksSize == 'Размер') {
        $('.js-notification, .js-overlay').removeClass('js-hidden');
    } else {
        let countProducts = localStorage.getItem("countProducts");
        let newCount = Number(countProducts) + 1;

        localStorage.setItem("countProducts", newCount);
        $('.js-product-count').text(newCount);

        console.log(newCount);

        let basketJson = localStorage.getItem("basket");
        let basketMap = new Map(JSON.parse(basketJson));

        let productId_size = productId + socksSize;
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

function createBasketRow (productInfo) {
    let clone = productItemRow.content.cloneNode(true);
    $(clone).find(".js-product-img").attr("src", productInfo.img);
    $(clone).find(".js-product-name").text(productInfo.name);
    $(clone).find(".js-product-size").text(productInfo.size);
    $(clone).find(".js-product-quantity").text(productInfo.count);
    $(clone).find(".js-product-price").text(productInfo.count*productInfo.price);
    return clone;
}

$('.js-overlay').click(function (event) {
    $('.js-basket, .js-notification, .js-overlay').addClass("js-hidden");
})