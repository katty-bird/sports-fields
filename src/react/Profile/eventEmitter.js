// eventEmitter.js
const eventEmitter = {
  events: {},
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  },
  off(event, listener) {
    if (!this.events[event]) return

    this.events[event] = this.events[event].filter(l => l !== listener)
  },
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data))
    }
  }
}

export default eventEmitter
