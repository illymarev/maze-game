export default class Queue {
    constructor() {
        this.items = {}
        this.front = 0
        this.rear = 0
    }

    enqueue(value) {
        this.items[this.rear] = value
        this.rear++
    }

    dequeue() {
        const value = this.items[this.front]
        delete this.items[this.front]
        this.front++
        return value
    }

    get length() {
        return this.rear - this.front
    }
}