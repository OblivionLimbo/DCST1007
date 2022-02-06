        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", mouseclick, false)
        canvas.addEventListener("mousemove", moveMouse, false);

        class Bubble {
            constructor(x, y, r) {
                this.x = x;
                this.y = y;
                this.r = r;
                this.colour = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
                this.chosen = false;
            }
            move() {
                this.previousX = this.x;
                this.previousY = this.y;
                this.x = this.x + Math.floor(Math.random() * 11 - 5);
                this.y = this.y + Math.floor(Math.random() * 11 - 5);
                if(!this.isInside()){
                    this.x = this.previousX
                    this.y = this.previousY
                }
            }
            show() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
                if(this.chosen){
                    ctx.fillStyle = "red";
                }else{
                    ctx.fillStyle = this.colour;
                }
                ctx.fill();
                ctx.strokeStyle = "white";
                ctx.stroke();
            }
            contains(x, y) {
                let d = Math.sqrt((this.x - x)**2 + (this.y - y)**2)
                if (d < this.r) {
                    return true;
                } else {
                    return false;
                }
            }
            isInside(){
                return this.x > 0 && this.x < canvas.width && this.y > 0 && this.y < canvas.height;
            }
        }

        class Rect {
            constructor(x,y,w,h){
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                this.colour = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
                this.chosen = false;
            }
            move() {
                this.previousX = this.x;
                this.previousY = this.y;
                this.x = this.x + Math.floor(Math.random() * 11 - 5);
                this.y = this.y + Math.floor(Math.random() * 11 - 5);
                if(!this.isInside()){
                    this.x = this.previousX
                    this.y = this.previousY
                }
            }
            contains(x, y) {
                if (x > this.x && x < this.x+this.w && y > this.y && y < this.y+this.h) {
                    return true;
                } else {
                    return false;
                }
            }
            show(){
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.w, this.h);
                if(this.chosen){
                    ctx.fillStyle = "red";
                }else{
                    ctx.fillStyle = this.colour;
                }
                ctx.fill();
                ctx.strokeStyle = "white";
                ctx.stroke();
            }
            isInside(){
                return this.x > 0 && this.x < canvas.width && this.y > 0 && this.y < canvas.height;
            }
        }

        let rect = []
        let bubbles = []

        let rectangle = false;
        let bubble = true;

        window.onkeydown = (event) => {
            switch (event.keyCode) {
                case 82:
                        rectangle = true;
                        bubble = false;
                        document.getElementById("drawInfo").innerText = "Press 'B' to start drawing bubbles"
                    break;
                case 66:
                    rectangle = false;
                    bubble = true;
                    document.getElementById("drawInfo").innerText = "Press 'R' to start drawing rectangles"
                    break;
            
                default:
                    break;
            }
        }

        for (let i = 0; i < 10; i++) {
            let x = Math.floor(Math.random() * canvas.width);
            let y = Math.floor(Math.random() * canvas.height);
            let r = Math.floor(Math.random() * 40 + 10);
            bubbles[i] = new Bubble(x, y, r);
        }

        function reset() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        function draw() {
            reset();
            for (i = 0; i < bubbles.length; i++) {
                bubbles[i].move()
                bubbles[i].show()
            }
            for(i=0; i<rect.length; i++){
                rect[i].move()
                rect[i].show()
            }
        }

        setInterval(() => {
            draw()
        }, 100);

        function moveMouse(event) {
            for (let i = 0; i < bubbles.length; i++) {
                bubbles[i].chosen = bubbles[i].contains(event.x, event.y)
            }
            for (let i = 0; i < rect.length; i++) {
                rect[i].chosen = rect[i].contains(event.x, event.y)
            }
        }

        function mouseclick(event) {
            let chosenBubble = false;
            let chosenRect = false;
            for (let i = 0; i < bubbles.length; i++) {
                if (bubbles[i].contains(event.clientX, event.clientY)) {
                    bubbles.splice(i, 1)
                    chosenBubble = true;
                }
            }
            for (let i = 0; i < rect.length; i++) {
                if (rect[i].contains(event.clientX, event.clientY)) {
                    rect.splice(i, 1)
                    chosenRect = true;
                }
            }
            if(chosenBubble == false && chosenRect == false){
                if (bubble) {
                    let r = Math.floor(Math.random() * 40 + 10)
                    let b = new Bubble(event.clientX, event.clientY, r)
                    bubbles.push(b)
                }
                else if (rectangle) {
                    let w = Math.floor(Math.random() * 60 + 20);
                    let h = Math.floor(Math.random() * 60 + 20);
                    let b = new Rect(event.clientX, event.clientY, w,h)
                    rect.push(b)
                }
            }
        }   

        function createCircle(){
            let x = Math.floor(Math.random() * canvas.width);
            let y = Math.floor(Math.random() * canvas.height);
            let r = Math.floor(Math.random() * 40 + 10);
            bubbles.push(new Bubble(x, y, r));
        }

        function createRect(){
            let x = Math.floor(Math.random() * canvas.width);
            let y = Math.floor(Math.random() * canvas.height);
            let w = Math.floor(Math.random() * 60 + 20);
            let h = Math.floor(Math.random() * 60 + 20);
            rect.push(new Rect(x, y, w, h));
        }

        setInterval(() => {
            if(bubble){
                createCircle();
            }else if(rectangle){
                createRect();
            }
        }, 1000);

        
