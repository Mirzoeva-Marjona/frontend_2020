class ProductRow {
    id;
    set productImageSource(src) {
        this.productImage.src = src;
    }

    get productImageSource() {
        return this.productImage.src;
    }

    set productName(name) {
        this.productNameField.innerHTML = name;
    }

    get productName() {
        return this.productNameField.innerHTML;
    }

    set socksSize(size) {
        this.socksSizeField.innerHTML = size;
    }

    get socksSize() {
        return this.socksSizeField.innerHTML;
    }

    set socksPrice(price) {
        this.productPrice = price;
        this.socksPriceField.innerHTML = `${this.calculate()} руб.`;
    }

    get socksPrice() {
        return this.productPrice;
    }

    calculate(productPrice, count) {
        return Math.ceil(productPrice * count);
    }

    constructor(wrapper, productInfo) {
        const template = document.getElementById("productItemRow");
        const content = document.importNode(template.content, true);

        this.productImage = content.querySelector(".js-product-img");
        this.productNameField = content.querySelector(".js-product-name");
        this.socksSizeField = content.querySelector(".js-product-size");
        let counterFiled = content.querySelector(".js-product-quantity");
        this.counter = new Counter(counterFiled);
        this.counter.productCountChanged = this.productCountChanged;
        this.socksPriceField = content.querySelector(".js-product-price");
        this.removeRowButton = content.querySelector(".js-remove-from-basket");

        this.productInfo = productInfo;
        this.id = productInfo.idRow;
        this.counter.value = productInfo.count;
        this.socksSize = productInfo.size;
        this.productImageSource = productInfo.img;
        this.productName = productInfo.name;
        this.socksPrice = productInfo.price;
        this.socksPriceField.innerHTML = `${this.calculate(this.productPrice, this.counter.value)} руб.`;

        this.removeRowButton.onclick = () => this.removeProduct(this.id);
        wrapper.appendChild(content);
    }

    productCountChanged = (value) => {
        if (value === 0) {
            this.removeProduct(this.id);
            return;
        }
        this.socksPriceField.innerHTML = `${this.calculate(this.productPrice, value)} руб.`;
        this.productInfo.count = value;
        this.productRowAmountChanged(this.productInfo);
    }
}
