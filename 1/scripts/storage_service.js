class StorageService {
    loadProducts() {
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
        return products;
    }

    loadPurchase() {
        if (localStorage.getItem("basket") == null) {
            const map = new Map();
            localStorage.setItem("basket", JSON.stringify(Array.from(map.entries())));
        }
        const basketJson = localStorage.getItem("basket");
        const basketMap = new Map(JSON.parse(basketJson));
        return basketMap;
    }

    savePurchase(basketMap) {
        localStorage.setItem("basket", JSON.stringify(Array.from(basketMap.entries())));
    }

}