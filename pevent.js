class PEvent {
  constructor(type, details = {}) {
    this.type = type;
    this.details = details;

    if (!("phase" in this.details)) this.details.phase = EventPhase.CAPTURE;
  }

  stopPropogation() {
    this.details.phase = STOPPED;
  }

  /**
   * Describe me :)
   * @param {UIElement[]} children a list of children to capture from
   * @return {UIElement[]} returns a list of children that capture this event
   */
  doCapture(children) {
    throw new Error("Unimplemented");
  }
}

class ClickEvent extends PEvent {
  contructor(x, y, details = {}) {
    super("click", { x, y, ...details });
  }

  /**
   * Describe me :)
   * @param {UIElement[]} children a list of children to capture from
   * @return {UIElement[]} returns a list of children that capture this event
   */
  doCapture(children) {
    return children.filter(
      (child) =>
        child.boundsA.x < this.details.x &&
        child.boundsA.y < this.details.y &&
        child.boundsB.x > this.details.x &&
        child.boundsB.y > this.details.y
    );
  }
}

class KeyEvent extends PEvent {
  contructor(keyinfo, details = {}) {
    super("key", { keyinfo, ...details });
  }

  /**
   * Describe me :)
   * @param {UIElement[]} children a list of children to capture from
   * @return {UIElement[]} returns a list of children that capture this event
   */
  doCapture(children) {
    return children;
  }
}

const EventPhase = {
  BUBBLING: 1,
  CAPTURE: 0,
  STOPPED: 2,
};
