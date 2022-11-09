function setup() {
  new Root(
    createCanvas(400, 400).elt,
    new Button({}, 100, 50, "Hullo!"),
    new PText({}, "Hullo"),
    new Container(
      {},
      new PText({}, "Hullo, you give me the fercking heebie jeebies D: "),
      new PText({}, "You might see the issues")
    )
  );
}

function draw() {
  background(220);
  root.draw();
}
