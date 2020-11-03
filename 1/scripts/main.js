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