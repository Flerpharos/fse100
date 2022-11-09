class UIElement {
  constructor(/* noTab = true */ ...children) {
    this.children = children;
    // this.noTab = noTab;
    this.parent = null;

    for (const child of children) child.parent = this;

    this.width = 0;
    this.height = 0;
    this.offset = { x: 0, y: 0 };
    this.isFocused = false;
    this.style = new Proxy(new Reactive(), {
      set(target, prop, receiver) {
        target.setProperty(prop, receiver);
      },
    });
  }

  setStyle(parts) {
    this.style = { ...this.style, ...parts };
  }

  focus(val = true) {
    this.isFocused = val;
    //root.focused = this;
  }

  draw() {
    throw new Error("Unimplemented");
  }

  setBounds() {
    this.boundsA = { x: this.offset.x, y: this.offset.y };
    this.boundsB = {
      x: this.offset.x + this.width,
      y: this.offset.y + this.height,
    };
  }

  inBounds(x, y) {
    return (
      this.boundsA.x >= x &&
      this.boundsA.y >= y &&
      this.boundsB.x <= x &&
      this.boundsB.y <= y
    );
  }

  addEventListener(event, eventHandler) {
    if (event in this.handlers) {
      this.handlers[event].push(eventHandler);
      return this.handlers[event].length - 1;
    } else {
      this.handlers[event] = [];
      return this.addEventListener(event, eventHandler);
    }
  }

  removeEventListener(event, index) {
    this.handlers[event].splice(index, 1);
  }

  dispatchEvent(eventValue) {
    if (typeof eventValue == "string") {
      if (eventValue in this.handlers) {
        const evt = new PEvent(eventValue, {
          phase: EventPhase.BUBBLING,
          target: this,
        });
      }
    } else if (eventValue instanceof PEvent) {
      if (eventValue.details.phase == EventPhase.BUBBLING) {
        if (eventValue.type in this.handlers) {
          const handlers = this.handlers[eventValue.type];

          for (
            let i = 0;
            i < handlers.length &&
            eventValue.details.phase == EventPhase.BUBBLING;
            i++
          ) {
            handlers[i](eventValue);
          }
        }
      } else if (eventValue.details.phase == EventPhase.CAPTURE) {
        const captured = eventValue.doCapture(this.children);
        if (captured.length == 0) {
          const details = {
            ...eventValue.details,
            target: this,
          };
          details.phase = EventPhase.BUBBLING;

          this.dispatchEvent(new PEvent(eventValue.type, details));
        } else {
          for (const capture of captured) capture.dispatchEvent(eventValue);
        }
      }
    } else {
      throw new Error("Unknown Event Type");
    }
  }
}
