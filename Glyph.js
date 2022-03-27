class Glyph {

    constructor(image) {

        this.id = image;
        this.label = "?";
        this.image = loadImage("images/" + image + ".svg");
        this.x = random(width);
        this.y = random(height);
        this.radius = 50;
        this.drag = false;
        this.hovered = false;
    }

    update(n) {

        if (n > glyphs.length+1) {
            return;
        }

        if (this.intersect(mouseX, mouseY)) {
            this.hovered = true;
        }

        if (this.hovered) {

            for (let i = 0; i < glyphs.length; i++) {
                if (glyphs[i] == this) {
                    continue;
                } else if (glyphs[i].neighbour(this.x, this.y)) {
                    glyphs[i].hovered = true;
                    glyphs[i].update(n+1);
                }
            }
        }
    }

    display() {
        image(this.image, this.x, this.y, this.radius*2, this.radius*2);
    }

    intersect(x, y) {

        let radius = this.radius;

        let xIntersect = x > this.x - radius && x < this.x + radius;
        let yIntersect = y > this.y - radius && y < this.y + radius;

        if (xIntersect && yIntersect) {
            return true;
        }
    }

    neighbour(x, y) {

        let radius = this.radius*2;

        let xIntersect = x > this.x - radius && x < this.x + radius;
        let yIntersect = y > this.y - radius && y < this.y + radius;

        if (xIntersect && yIntersect) {
            return true;
        }
    }
}
