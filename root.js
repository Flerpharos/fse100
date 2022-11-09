class Root extends UIElement {
  constructor(element, ...children) {
    super({}, ...children);

    this.setElement(element);
    this.focused = this;
    this.setRoot(this);

    this.postLoad();
    this.setActive(true);

    //TODO: Redo space partitioning to be top-down
  }

  postLoad() {
    //Root does not perform basic spacing so that offset blocks can be placed here
    /* let offsetY = 0;
    for (const child of this.children) {
      child.offset.y = offsetY;
      offsetY += child.height + 1;
      child.setBounds();
    } */

    super.postLoad();
  }

  setActive(val) {
    this.active = val;
  }

  getTotalOffset() {
    return { x: 0, y: 0 };
  }

  setElement(element) {
    this.width = element.clientWidth;
    this.height = element.clientHeight;
    this.setBounds();

    //TODO: allow removal of root from element?
    element.addEventListener("mousemove", (evt) => {
      if (this.active)
        this.dispatchEvent(
          new MouseMoveEvent(mouseX, mouseY, evt.movementX, evt.movementY)
        );
    });

    element.addEventListener("mousedown", (evt) => {
      if (this.active)
        this.dispatchEvent(
          new MouseDownEvent(
            mouseX,
            mouseY,
            ["left", "middle", "right", "button4", "button5"][evt.button]
          )
        );
    });

    element.addEventListener("mouseup", (evt) => {
      if (this.active)
        this.dispatchEvent(
          new MouseUpEvent(
            mouseX,
            mouseY,
            ["left", "middle", "right", "button4", "button5"][evt.button]
          )
        );
    });

    element.addEventListener("click", (evt) => {
      if (this.active)
        this.dispatchEvent(
          new ClickEvent(
            mouseX,
            mouseY,
            ["left", "middle", "right", "button4", "button5"][evt.button]
          )
        );
    });
  }

  draw() {
    this.children.forEach((child) => {
      push();
      translate(child.offset.x, child.offset.y);
      child.draw();
      pop();
    });
  }
}
