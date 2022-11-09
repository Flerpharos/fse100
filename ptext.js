class PText extends UIElement {
  constructor(style, text) {
    super(style);

    this.text = text;

    this.style.listen("font-size", (val) => {
      this.height = val;

      push();
      textFont(this.style["font-family"]);
      textSize(this.style["font-size"]);
      this.width = textWidth(text);
      pop();
      this.setBounds();
    });

    this.style["foreground-color"] ??= "#111111";
    this.style["font-family"] ??= "Helvetica";
    this.style["font-size"] ??= 20;
  }

  draw() {
    textFont(this.style["font-family"]);
    textSize(this.style["font-size"]);
    fill(this.style["foreground-color"]);

    textAlign(LEFT, TOP);
    // textWrap(WORD); //TODO: Find a way to redo bounds so that multi-line support can be added

    text(
      this.text,
      0,
      0
      // this.parent.getBounds().boundsB.x - this.parent.getBounds().boundsA.x
    );
  }
}
