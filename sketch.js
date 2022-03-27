let glyphs = [];
let hoveredGlyphs = [];
let hoveredGlyphsIds = [];

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

    hoveredGlyphs = [];
    hoveredGlyphsIds = [];
    word = "";

    background("#BEE5BF");
    fill("#493657");
    rect(0, height-100, width, 100);
    fill("#BEE5BF");

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
            hoveredGlyphs.push(glyphs[i]);
            hoveredGlyphsIds.push(glyphs[i].id);
        }
    }

    hoveredGlyphs = hoveredGlyphs.sort();
    hoveredGlyphsIds = hoveredGlyphsIds.sort();

    let displayedString = "";
    word = getItem(hoveredGlyphsIds.join(" + "));

    if (hoveredGlyphs.length == 0) {
        displayedString = " ";
    } else if (word != null) {
        displayedString = word;
    } else {
        let translatedGlyphs = [];
        for (let i = 0; i < hoveredGlyphsIds.length; i++) {

            let translatedGlyph = getItem(hoveredGlyphsIds[i]);
            if (translatedGlyph == null) {
                translatedGlyph = "?";
            }
            translatedGlyphs.push(translatedGlyph);
        }
        displayedString = translatedGlyphs.join(" + ");

    }

    text(displayedString, width/2, height-50);
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

    if (getItem(hoveredGlyphsIds.join(" + ")) == null) {
        word = "";
    }

    if (keyCode == DELETE || keyCode == BACKSPACE) {
        word = word.slice(0, -1);
    } else if (/[a-zA-Z]/g.test(key) && key.length == 1) {
        word += key;
    }

    storeItem(hoveredGlyphsIds.join(" + "), word);
}
