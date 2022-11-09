class Offset extends UIElement {
  constructor(x, y, child) {
    super({}, child);

    this.child = child;

    this.x = x;
    this.y = y;

    this.width = this.children.reduce((p, c) => p + c.width + 1, 0) + x;
    this.height = this.children.reduce((p, c) => p + c.height + 1, 0) + y;
  }

  postLoad() {
    this.child.offset = { x: this.x, y: this.y };

    super.postLoad();

    this.width = this.x + this.child.boundsB.x;
    this.height = this.y + this.child.boundsB.y;

    this.setBounds();
  }

  getBounds() {
    return this.parent.getBounds();
  }

  draw() {
    push();
    translate(this.x, this.y);
    this.children[0].draw();
    pop();
  }
}
