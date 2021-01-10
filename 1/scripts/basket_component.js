class BasketComponent {
    content;
    set purchaseMap(map) {
        this.basketMap = map;
        this.update();
    }

    get purchaseMap() {
        return this.basketMap;
    }

    closeBasket() {
        this.closeFunction();
    }

    constructor(wrapper, closeFunction) {
        const template = document.getElementById("basketComponent");
        const content = document.importNode(template.content, true);

        this.closeFunction = closeFunction;

        this.basketItemsFrame = content.querySelector(".js-basket-items");
        this.basketTotalField = content.querySelector(".js-basket-total");
        this.closeBasketButton = content.querySelector(".js-close-basket");

        this.closeBasketButton.addEventListener("click", this.closeFunction);
        wrapper.appendChild(content);
    }

    update() {
       this.basketItemsFrame.innerHTML = "";
        this.basketMap = storage.loadPurchase();
        let total = 0;
        const productEntries = this.basketMap.entries()
        for (const [id, purchase] of productEntries) {
            const product = storage.loadProducts().get(purchase.productId);
            const purchaseInfo = {
                count: purchase.quantity,
                size: purchase.size,
                idRow: id,
            }
            const productInfo = {...product, ...purchaseInfo}

            const productRow = new ProductRow(this.basketItemsFrame);
            productRow.id = productInfo.idRow;
            productRow.setCount(productInfo.count);
            productRow.socksSize = productInfo.size;
            productRow.productImageSource = productInfo.img;
            productRow.productName = productInfo.name;
            productRow.socksPrice = productInfo.price;
            total += productRow.calculate();
            productRow.setRemoveHandler(this.removeProduct);
        }

        this.basketTotalField.innerHTML = `Итого: ${total} руб.`;
    }

    removeProduct = (productRow) => {
        const productId = productRow.id;
        console.log(productId);
        const purchase = this.basketMap.get(productId);
        if (purchase.quantity > 1) {
            purchase.quantity--;
        } else {
            this.basketMap.delete(productId);
        }
        const countProducts = 0;
        const newCount = Number(countProducts) - 1;

        productRow.setCount(newCount);
        storage.savePurchase(this.basketMap);
        this.update();
    }
}