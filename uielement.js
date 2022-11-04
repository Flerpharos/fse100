class UIElement {
  constructor(/* noTab = true */ ...children) {
    this.children = children;
    // this.noTab = noTab;
    this.parent = null;

    for (const child of children) child.parent = this;

    this.boundsA = null;
    this.boundsB = null;
    this.position = null;
    this.isFocused = false;
  }

  focus(val = true) {
    this.isFocused = val;
  }

  setBounds(a, b) {
    this.boundsA = a;
    this.boundsB = b;
  }

  addEventListener(event, eventHandler) {
    if (event in this.handlers) {
      this.handlers[event].push(eventHandler);
    } else {
      this.handlers[event] = [];
      this.addEventListener(event, eventHandler);
    }
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
