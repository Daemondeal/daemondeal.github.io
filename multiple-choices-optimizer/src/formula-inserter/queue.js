export default class Queue {
    constructor(array) {
        this.array = array;
        this.position = 0;
    }

    peek() {
        return this.array[this.position];
    }

    consume() {
        this.position++;
        return this.array[this.position - 1];
    }

    isEmpty() {
        return this.position >= this.array.length;
    }
}