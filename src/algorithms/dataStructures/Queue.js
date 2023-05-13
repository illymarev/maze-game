export default class Queue {
    constructor() {
        this.items = {}
        this.front = 0
        this.rear = 0
    }

    clear() {
        while (this.front < this.rear) {
            delete this.items[this.front]
            this.front++
        }
    }

    dequeue() {
        const value = this.items[this.front]
        delete this.items[this.front]
        this.front++
        return value
    }

    enqueue(value) {
        this.items[this.rear] = value
        this.rear++
    }

    get length() {
        return this.rear - this.front
    }
}