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

    setCount(count) {
        this.counter.value = count;
        this.socksPriceField.innerHTML = `${this.calculate()} руб.`;
    }

    getCount() {
        return this.counter.value;
    }

    set socksPrice(price) {
        this.productPrice = price;
        this.socksPriceField.innerHTML = `${this.calculate()} руб.`;
    }

    get socksPrice() {
        return this.productPrice;
    }

    calculate() {
        return this.productPrice * this.getCount();
    }

    constructor(wrapper) {
        const template = document.getElementById("productItemRow");
        const content = document.importNode(template.content, true);

        this.productImage = content.querySelector(".js-product-img");
        this.productNameField = content.querySelector(".js-product-name");
        this.socksSizeField = content.querySelector(".js-product-size");
        let counterFiled = content.querySelector(".js-product-quantity");
        this.counter = new Counter(counterFiled);
        this.socksPriceField = content.querySelector(".js-product-price");
        this.removeRowButton = content.querySelector(".js-remove-from-basket");

        wrapper.appendChild(content);
    }

    setRemoveHandler(removeRowFunction) {
        this.removeRowFuntion = removeRowFunction;
        this.removeRowButton.onclick = this.removeProvider.bind(this);
    }

    removeProvider() {
        this.removeRowFuntion(this);
    }
}