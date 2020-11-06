if (localStorage.getItem("countProducts") == null) {
    localStorage.setItem("countProducts", 0);
} else {
    let countProducts = localStorage.getItem("countProducts");
    $('.js-product-count').text(countProducts);
}

localStorage.setItem("products", new Map([
    [1, {
        name: "Носки. Устрицы",
        price: 299
    }],
    [2, {
        name: "Носки. Мартин",
        price: 299
    }],
    [3, {
        name: "Носки. Кальмары",
        price: 299
    }],
    [4, {
        name: "Носки. Голуби",
        price: 299
    }],
    [5, {
        name: "Носки. Геометрия",
        price: 299
    }],
    [6, {
        name: "носки. Суши",
        price: 299
    }],
    [7, {
        name: "Носки. Моллюски",
        price: 299
    }],
    [8, {
        name: "Носки. Зебра",
        price: 299
    }]
    ]));

$('.js-open-basket').click(function (event) {
    console.log("open basket");
    $('.js-basket').removeClass("js-hidden");
    $('.js-overlay').removeClass("js-hidden");
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

        let row = document.querySelector('#productItemRow');
        // $('.js-basket').appendChild(document.importNode(row.content, true));
        $('.js-basket').appendChild("<span>123</span>");
        // let productInfo = localStorage.getItem('products').get(productId);
        // $('.js-basket').append(productItemRow.content.cloneNode(true));
        console.log(newCount);
    }
})

$('.js-overlay').click(function (event){
    $('.js-basket, .js-notification, .js-overlay').addClass("js-hidden");
})