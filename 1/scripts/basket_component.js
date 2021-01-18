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
        this.totalCountField = document.querySelector(".js-product-count");

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

            const productRow = new ProductRow(this.basketItemsFrame, productInfo);
            total += productRow.calculate();
            productRow.setRemoveHandler(this.removeProduct);
            productRow.setIncreaseHandler(this.increaseRowCount);
            productRow.setDecreaseHandler(this.decreaseRowCount);
        }

        this.basketTotalField.innerHTML = `Итого: ${total} руб.`;
        this.updateTotalCounter();
    }

    addProductToBasket(productId, socksSize) {
        const productIdSize = productId + socksSize;
        if (this.basketMap.has(productIdSize)) {
            let productInBasket = this.basketMap.get(productIdSize);
            productInBasket.quantity++;
        } else {
            this.basketMap.set(productIdSize, {
                productId: productId,
                quantity: 1,
                size: socksSize
            })
        }
        storage.savePurchase(this.basketMap);
        basketComponent.updateTotalCounter();
    }

    updateTotalCounter = () => {
        this.basketMap = storage.loadPurchase();
        let count = 0;
        for (let countProduct of this.purchaseMap.values()) {
            count += Number(countProduct.quantity);
        }
        console.log(count);
        this.totalCountField.innerHTML = count;
    }

    removeProduct = (productRow) => {
        const productId = productRow.id;
        console.log(productId);
        this.basketMap.delete(productId);
        storage.savePurchase(this.basketMap);
        this.update();
    }

    decreaseRowCount = (productRow) => {
        const productId = productRow.id;
        console.log(productId);
        const purchase = this.basketMap.get(productId);
        if (purchase.quantity > 1) {
            purchase.quantity--;
        } else {
            this.basketMap.delete(productId);
        }
        productRow.setCount(purchase.quantity);
        storage.savePurchase(this.basketMap);
        this.update();
    }

    increaseRowCount = (productRow) => {
        const productId = productRow.id;
        console.log(productId);
        const purchase = this.basketMap.get(productId);
        purchase.quantity++;
        productRow.setCount(purchase.quantity);
        storage.savePurchase(this.basketMap);
        this.update();
    }
}