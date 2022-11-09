class Reactive {
  constructor() {
    this.handlers = {};
  }

  setProperty(name, value) {
    this[name] = value;
    this.handlers[name]?.forEach((handler) => handler(value));
  }

  listen(name, listener) {
    if (name in this.handlers) {
      this.handlers[name].push(listener);
      return this.handlers[name].length - 1;
    } else {
      this.handlers[name] = [];
      return this.listen(name, listener);
    }
  }

  cease(name, index) {
    this.handlers[name]?.splice(index, 1);
  }
}
