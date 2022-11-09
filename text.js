class Text extends UIElement {
  constructor(text) {
    super();

    this.setBounds();
    this.text = text;

    this.style.listen("font-size", (val) => {
      this.height = val;
      // TODO: Find text width (for bounds purposes) from processing
      this.setBounds();
    });

    this.style["foreground-color"] ??= "#111111";
    this.style["font-family"] ??= "Helvetica";
    this.style["font-size"] ??= 20;
  }

  draw() {}
}
