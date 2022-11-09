class Button extends UIElement {
  constructor(style, width, height, text) {
    super(style);

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
    this.style["hover:background-color"] ??= "#dddddd";
    this.style["hover:foreground-color"] ??= "#000000";
    this.style["active:background-color"] ??= "#ddeeff";
    this.style["active:foreground-color"] ??= "#333333";

    this.addEventListener("mousemove", (evt) => {
      
      if (this.inBounds(evt.details.x + evt.details.dx, evt.details.y + evt.details.dy) && this.state != 2) {
        this.state = 1;
      } else this.state = 0;
    });

    this.addEventListener("mousedown", (evt) => {
      if (this.inBounds(evt.details.x, evt.details.y) && evt.details.key == "left") {
        this.state = 2;
      }
    });

    this.addEventListener("mouseup", (evt) => {
      if (evt.details.key == "left") this.state = 1;
    });
  }

  draw() {
    
    stroke(this.style["border-color"]);
    strokeWeight(this.style["border-width"]);
    
    switch (this.state) {
      case 0: fill(this.style["background-color"]); break;
      case 1: fill(this.style["hover:background-color"]); break;
      case 2: fill(this.style["active:background-color"]); break;
    }
    
    rect(0, 0, this.width, this.height, this.style["border-radius"]);
    
    textFont(this.style["font-family"]);
    textSize(this.style["font-size"]);
    
    noStroke();
    
    switch (this.state) {
      case 0: fill(this.style["foreground-color"]); break;
      case 1: fill(this.style["hover:foreground-color"]); break;
      case 2: fill(this.style["active:foreground-color"]); break;
    }
    
    textAlign(CENTER, CENTER);
    
    text(this.text, this.width / 2, this.height / 2);
  }
}
