class calculator {
    constructor(value) {
        this.value = value;
    }

    add(num) {
       this.value + num;
       return this;
    };

    getvalue() {
        return this.value;
    }
};

const calc = new calculator(10);
const addMethods = calc.add;
const getvaluemethod = calc.getvalue;

addMethods.call({ value:5 }, 3);
console.log(calc.getvalue());
console.log(getvaluemethod());
