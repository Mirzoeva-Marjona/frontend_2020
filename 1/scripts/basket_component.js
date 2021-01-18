class BasketComponent {
    content;
    set purchaseMap(map) {
        this.basketMap = map;
        this.update();
    }

    get purchaseMap() {
        return this.basketMap;
    }

    constructor(wrapper) {
        const template = document.getElementById("basketComponent");
        const content = document.importNode(template.content, true);

        this.basketItemsFrame = content.querySelector(".js-basket-items");
        this.basketTotalField = content.querySelector(".js-basket-total");
        this.closeBasketButton = content.querySelector(".js-close-basket");
        this.totalCountField = document.querySelector(".js-product-count");

        this.closeBasketButton.onclick = () => this.closeFunction();
        wrapper.appendChild(content);
    }

    update() {
       this.basketItemsFrame.innerHTML = "";
        this.basketMap = storage.loadPurchase();
        const productEntries = this.basketMap.entries();
        for (const [id, purchase] of productEntries) {
            const product = storage.loadProducts().get(purchase.productId);
            const purchaseInfo = {
                count: purchase.quantity,
                size: purchase.size,
                idRow: id,
            }
            const productInfo = {...product, ...purchaseInfo}

            const productRow = new ProductRow(this.basketItemsFrame, productInfo);
            productRow.removeProduct = this.removeProduct;
            productRow.productRowAmountChanged = this.productRowAmountChanged;
        }

        this.updateTotalCounter();
        this.updateTotalPrice();
    }

    productRowAmountChanged = (productInfo) => {
        let oldPurchase = this.basketMap.get(productInfo.idRow);
        oldPurchase.quantity = productInfo.count;
        storage.savePurchase(this.basketMap);
        this.updateTotalCounter();
        this.updateTotalPrice();
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

    updateTotalPrice = () => {
        this.basketMap = storage.loadPurchase();
        const products = storage.loadProducts();
        let totalPrice = 0;
        for (let productInfo of this.purchaseMap.values()) {
            let productsPrice = products.get(productInfo.productId).price;
            totalPrice += productInfo.quantity * productsPrice;
        }
        this.basketTotalField.innerHTML = `Итого: ${totalPrice} руб.`;
    }

    removeProduct = (productId) => {
        this.basketMap.delete(productId);
        storage.savePurchase(this.basketMap);
        this.update();
    }
}