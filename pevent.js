class PEvent {
  constructor(type, details = {}) {
    this.type = type;
    this.details = details;

    if (!("phase" in this.details)) this.details.phase = EventPhase.CAPTURE;
  }

  stopPropogation() {
    this.details.phase = EventPhase.STOPPED;
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
  constructor(x, y, key, details = {}) {
    super("click", { x, y, key, ...details });
  }

  /**
   * Describe me :)
   * @param {UIElement[]} children a list of children to capture from
   * @return {UIElement[]} returns a list of children that capture this event
   */
  doCapture(children) {
    return children.filter((child) =>
      child.inBounds(this.details.x, this.details.y)
    );
  }
}

class MouseDownEvent extends PEvent {
  constructor(x, y, key, details = {}) {
    super("mousedown", { x, y, key, ...details });
  }

  /**
   * Describe me :)
   * @param {UIElement[]} children a list of children to capture from
   * @return {UIElement[]} returns a list of children that capture this event
   */
  doCapture(children) {
    return children.filter((child) =>
      child.inBounds(this.details.x, this.details.y)
    );
  }
}

class MouseUpEvent extends PEvent {
  constructor(x, y, key, details = {}) {
    super("mouseup", { x, y, key, ...details });
  }

  /**
   * Describe me :)
   * @param {UIElement[]} children a list of children to capture from
   * @return {UIElement[]} returns a list of children that capture this event
   */
  doCapture(children) {
    return children.filter((child) =>
      child.inBounds(this.details.x, this.details.y)
    );
  }
}

class MouseMoveEvent extends PEvent {
  constructor(x, y, dx, dy, details = {}) {
    super("mousemove", { x, y, dx, dy, key, ...details });
  }

  /**
   * Describe me :)
   * @param {UIElement[]} children a list of children to capture from
   * @return {UIElement[]} returns a list of children that capture this event
   */
  doCapture(children) {
    const x = this.details.x;
    const y = this.details.y;
    const x2 = this.details.x + this.details.dx;
    const y2 = this.details.y + this.details.dy;

    return children.filter(
      //TODO: Change this to include more than just the nodes at the endpoints
      (child) => child.inBounds(x, y) || child.inBounds(x2, y2)
    );
  }
}

class DragEvent extends PEvent {
  constructor(x, y, dx, dy, key, details = {}) {
    super("drag", { x, y, dx, dy, key, ...details });
  }

  /**
   * Describe me :)
   * @param {UIElement[]} children a list of children to capture from
   * @return {UIElement[]} returns a list of children that capture this event
   */
  doCapture(children) {
    //TODO: Make this filter out any children not intersecting the drag for efficiency reasons
    return children;
    /* children.filter(
      (child) =>
        child.boundsA.x < this.details.x &&
        child.boundsA.y < this.details.y &&
        child.boundsB.x > this.details.x &&
        child.boundsB.y > this.details.y
    ); */
  }
}

class KeyEvent extends PEvent {
  constructor(keyinfo, details = {}) {
    super("key", { keyinfo, ...details });
  }

  /**
   * We capture nothing because this event is meant to be triggered to "focused" elements rather than the Root
   * @param {UIElement[]} children a list of children to capture from
   * @return {UIElement[]} returns a list of children that capture this event
   */
  doCapture(children) {
    return [];
  }
}

const EventPhase = {
  BUBBLING: 1,
  CAPTURE: 0,
  STOPPED: 2,
};
