let glyphs = [];
let hoveredGlyphs = [];
let hoveredGlyphsIds = [];

let word = "";

let interacted = false;

function setup() {

    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(40);
    textFont("Hubballi");

    glyphs.push(new Glyph("s0"));
    // glyphs.push(new Glyph("s1"));
    // glyphs.push(new Glyph("s2"));
    glyphs.push(new Glyph("s3"));
    glyphs.push(new Glyph("s4"));
    // glyphs.push(new Glyph("s5"));
    // glyphs.push(new Glyph("s6"));
    // glyphs.push(new Glyph("s7"));
    // glyphs.push(new Glyph("s8"));
    glyphs.push(new Glyph("s9"));
    // glyphs.push(new Glyph("s10"));
    // glyphs.push(new Glyph("s11"));
    glyphs.push(new Glyph("s12"));
    // glyphs.push(new Glyph("s13"));
    glyphs.push(new Glyph("s14"));
}

function draw() {

    hoveredGlyphs = [];
    hoveredGlyphsIds = [];
    word = "";

    background("#493657");
    fill("#493657");
    //rect(0, height-100, width, 100);
    fill("#BEE5BF");
    rect(15, 15, width-30, height-115, 5);

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
        if (interacted == false) {
            displayedString = "hover and type to change the meaning";
        }
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

    if (displayedString == "hover and type to change the meaning") {
        fill("#838E8B");
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

    if (getItem(hoveredGlyphsIds.join(" + ")) == null || word == "?") {
        word = "";
    }

    if (keyCode == DELETE || keyCode == BACKSPACE) {
        word = word.slice(0, -1);
    } else if (/[a-zA-Z]/g.test(key) && key.length == 1) {
        interacted = true;
        word += key;
    }

    if (word == "") {
        storeItem(hoveredGlyphsIds.join(" + "), "?");
    } else {
        storeItem(hoveredGlyphsIds.join(" + "), word);
    }
}
