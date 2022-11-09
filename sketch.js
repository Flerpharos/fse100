let loginScreen;
let mainMenu;

function setup() {
  let canvas = createCanvas(800, 600).elt;

  loginScreen = new Root(
    canvas,
    new Offset(
      0,
      150,
      new Center(
        new PText({ "font-size": 40 }, "T O T A L L Y   T H E R A P Y")
      )
    ),
    new Offset(
      0,
      300,
      new Container(
        { "background-color": "none", "border-width": 0 },
        new Center(
          new Button(
            { "font-size": 15 },
            300,
            60,
            "L O G I N   O L D   P E O P L E"
          )
        )
      )
    )
  );

  loginScreen.children[1].child.children[0].child.addEventListener(
    "click",
    () => {
      loginScreen.setActive(false);
      mainMenu.setActive(true);
    }
  );

  mainMenu = new Root(
    canvas,
    new Offset(
      0,
      150,
      new Center(
        new PText({ "font-size": 40 }, "T O T A L L Y   T H E R A P Y")
      )
    ),
    new Offset(
      0,
      280,
      new Container(
        { "background-color": "none", "border-width": 0 },
        new Center(
          new Button({ "font-size": 15 }, 300, 60, "P U T T   P U T T")
        ),
        new Center(
          new Offset(
            0,
            20,
            new Button(
              { "font-size": 15 },
              300,
              60,
              "R O C K E T   B U I L D E R"
            )
          )
        ),
        new Center(
          new Offset(
            0,
            20,
            new Button({ "font-size": 15 }, 300, 60, "S H A P E   T R A C E R")
          )
        )
      )
    )
  );
  mainMenu.setActive(false);
}

function draw() {
  background(220);
  if (loginScreen.active) loginScreen.draw();
  if (mainMenu.active) mainMenu.draw();
}
