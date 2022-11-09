class Root extends UIElement {
  constructor(element, ...children) {
    super({}, ...children);

    this.setElement(element);
    this.focused = this;
    window.root = this;

    this.postLoad();
  }

  postLoad() {
    let offsetY = 0;
    for (const child of this.children) {
      child.offset.y = offsetY;
      offsetY += child.height + 1;
      child.setBounds();
    }

    super.postLoad();
  }

  getTotalOffset() {
    return { x: 0, y: 0 };
  }

  setElement(element) {
    this.width = element.clientWidth;
    this.height = element.clientHeight;
    this.setBounds();

    element.addEventListener("mousemove", (evt) => {
      this.dispatchEvent(
        new MouseMoveEvent(mouseX, mouseY, evt.movementX, evt.movementY)
      );
    });

    element.addEventListener("mousedown", (evt) => {
      this.dispatchEvent(
        new MouseDownEvent(
          mouseX,
          mouseY,
          ["left", "middle", "right", "button4", "button5"][evt.button]
        )
      );
    });

    element.addEventListener("mouseup", (evt) => {
      this.dispatchEvent(
        new MouseUpEvent(
          mouseX,
          mouseY,
          ["left", "middle", "right", "button4", "button5"][evt.button]
        )
      );
    });

    element.addEventListener("click", (evt) => {
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
