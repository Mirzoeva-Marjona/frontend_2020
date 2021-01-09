class Counter {
    set value(val) {
        this.valueInput.value = isNaN(val) ? 0 : val;
    }

    get value() {
        return +this.valueInput.value;
    }

    constructor(wrapper) {
        const template = document.getElementById("counterTemplate");
        const content = document.importNode(template.content, true);

        this.valueInput = content.querySelector(".js-value");
        this.decreaseButton = content.querySelector(".js-decrease");
        this.increaseButton = content.querySelector(".js-increase");

        this.valueInput.onblur = (event) => (this.value = event.target.value);
        this.increaseButton.onclick = () => this.increase();
        this.decreaseButton.onclick = () => this.decrease();

        wrapper.appendChild(content);
    }

    increase() {
        this.value++;
    }

    decrease() {
        this.value--;
    }
}