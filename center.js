class Center extends UIElement {
  constructor(child) {
    super({}, child);

    this.child = child;

    this.width = this.children.reduce((p, c) => p + c.width, 0);
    this.height = this.children.reduce((p, c) => p + c.height, 0);
  }

  postLoad() {
    const { boundsA, boundsB } = this.parent.getBounds();

    this.width = boundsB.x - boundsA.x - this.offset.x;
    /* this.height =
      boundsB.y -
      boundsA.y -
      this.offset.y -
      this.parent.children.reduce((p, c) => p + c.height + 1, 0);
    //this.height; */
    this.setBounds();

    super.postLoad();

    this.child.offset = {
      x: (this.width - this.child.width) / 2,
      y: 0, // (this.height - this.child.height) / 2,
    };
  }

  draw() {
    push();
    translate(this.child.offset.x, this.child.offset.y);
    this.children[0].draw();
    pop();
  }
}
