let glyphs = [];

let word = "";

function setup() {

    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);

    fill("#493657");
    textSize(24);

    glyphs.push(new Glyph("arrow"));
    glyphs.push(new Glyph("circle"));
    glyphs.push(new Glyph("cluster"));
    glyphs.push(new Glyph("wave"));
}

function draw() {

    word = "";

    background("#BEE5BF");

    for (let i = 0; i < glyphs.length; i++) {

        glyphs[i].hovered = false;
        glyphs[i].update(0);
        glyphs[i].display();
    }

    for (let i = glyphs.length - 1; i >= 0; i--) {
        glyphs[i].update(0);
    }

    for (let i = 0; i < glyphs.length; i++) {
        if (glyphs[i].hovered) {
            word += glyphs[i].label + " + ";
        }
    }

    word = word.slice(0, -3);
    text(word, width/2, height-50);
}

function mousePressed() {

	for (let i = glyphs.length - 1; i >= 0; i--) {

		if (glyphs[i].intersect(mouseX, mouseY)) {
			glyphs[i].drag = true;
            glyphs.push(glyphs.splice(i, 1)[0]);
            break;
		} else {
			glyphs[i].drag = false;
		}
	}
}

function mouseReleased() {

	for (i in glyphs) {
		glyphs[i].drag = false;
	}
}

function mouseDragged() {

    for (i in glyphs) {
        if (glyphs[i].drag) {

            glyphs[i].x = mouseX;
            glyphs[i].y = mouseY;
        }
    }
}

function keyPressed() {

    for (i in glyphs) {

       if (glyphs[i].hovered) {

            if (glyphs[i].label == "?") {
                glyphs[i].label = "";
            }
            glyphs[i].label += key;
        }
    }
}
