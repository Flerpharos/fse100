class Container extends UIElement {
  constructor(style, ...children) {
    super(style, ...children);

    this.style["background-color"] ??= "#f0f0f0";
    this.style["border-color"] ??= "#222222";
    this.style["border-width"] ??= 2;
    this.style["margin"] ??= 10;
    this.style["padding"] ??= 10;

    this.width =
      this.children.reduce((p, c) => p + c.width + 1, 0) +
      this.style["margin"] * 2 +
      this.style["padding"] * 2;
    this.height =
      this.children.reduce((p, c) => p + c.height + 1, 0) +
      this.style["margin"] * 2 +
      this.style["padding"] * 2;

    //TODO: Implement max-sizes
    // this.style["max-height"] ??= null;
    // this.style["max-width"] ??= null;
  }

  postLoad() {
    const { boundsA, boundsB } = this.parent.getBounds();

    this.width = boundsB.x - boundsA.x - this.offset.x;
    this.height = boundsB.y - boundsA.y - this.offset.y;
    this.setBounds();

    let offsetY = this.style["padding"] + this.style["margin"];
    for (const child of this.children) {
      child.offset.y = offsetY;
      child.offset.x = this.style["padding"] + this.style["margin"];
      offsetY += child.height + 1;
      child.setBounds();
    }

    super.postLoad();
  }

  getBounds() {
    return {
      boundsA: {
        x: this.boundsA.x + this.style["padding"],
        y: this.boundsA.y + this.style["padding"],
      },
      boundsB: {
        x: this.boundsB.x - this.style["padding"],
        y: this.boundsB.y - this.style["padding"],
      },
    };
  }

  draw() {
    if (
      this.style["background-color"] != "none" ||
      this.style["border-width"] != 0
    ) {
      push();
      fill(this.style["background-color"]);
      stroke(this.style["border-color"]);
      strokeWeight(this.style["border-width"]);
      rect(
        this.style["margin"],
        this.style["margin"],
        this.width - this.style["margin"] * 2,
        this.height - this.style["margin"] * 2
      );
      pop();
    }

    this.children.forEach((child) => {
      push();
      translate(child.offset.x, child.offset.y);
      child.draw();
      pop();
    });
  }
}
