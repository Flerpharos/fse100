class Offset extends UIElement {
  constructor(x, y, child) {
    super({}, child);

    this.child = child;

    this.x = x;
    this.y = y;
  }

  postLoad() {
    this.child.offset = { x, y };
    this.child.setBounds();

    this.width = this.x + this.child.boundsB.x;
    this.height = this.y + this.child.boundsB.y;

    this.setBounds();

    super.postLoad();
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
