class Button extends UIElement {
  constructor(width, height, text) {
    super();

    this.width = width;
    this.height = height;
    this.state = 0;

    this.setBounds();
    this.text = text;

    this.style["border-radius"] ??= 0;
    this.style["foreground-color"] ??= "#111111";
    this.style["background-color"] ??= "#f0f0f0";
    this.style["font-family"] ??= "Helvetica";
    this.style["font-size"] ??= 20;
    this.style["border-color"] ??= "#222222";
    this.style["border-width"] ??= 2;
    this.style["hover:background-color"] ??= "#eeeeee";
    this.style["hover:foreground-color"] ??= "#000000";
    this.style["active:background-color"] ??= "#ddeeff";
    this.style["active:foreground-color"] ??= "#333333";

    this.addEventListener("mousemove", (evt) => {
      if (this.inBounds(mouseX, mouseY) && this.state != 2) {
        this.state = 1;
      } else this.state = 0;
    });

    this.addEventListener("mousedown", (evt) => {
      if (this.inBounds(mouseX, mouseY) && evt.key == "left") {
        this.state == 2;
      }
    });

    this.addEventListener("mouseup", (evt) => {
      if (evt.key == "left") this.state = 1;
    });
  }

  draw() {
  }
}
