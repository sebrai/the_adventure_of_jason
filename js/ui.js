//  general ---------------------------
const animationQueue = {
    items: [],
    running: false,
    auto_run: true,

    add(item) {
        this.items.push(item)
        if (!this.running && this.auto_run) this.run()
    },

    async run() {
        this.running = true

        while (this.items.length > 0) {
            const item = this.items.shift()
            await item.do()
            console.log("animation on item:", item.target)
        }

        this.running = false;
        control_lock = false
    }
};

// async function untangle_que(animation_que) {
//     for (const item of animation_que) {
//         await item.do()
//         console.log("animation on item:", item.target)
//     }
//     control_lock = false
// }
function waitForMotion(element, {
    transitionProperty = null,
    timeout = 1000
} = {}) {
    return new Promise(resolve => {
        let finished = false;

        const done = () => {
            if (finished) return;
            finished = true;
            cleanup();
            resolve();
        };

        const onTransitionEnd = (e) => {
            if (transitionProperty && e.propertyName !== transitionProperty) return;
            done();
        };

        const onAnimationEnd = () => {
            done();
        };

        const cleanup = () => {
            element.removeEventListener("transitionend", onTransitionEnd);
            element.removeEventListener("animationend", onAnimationEnd);
            clearTimeout(fallback);
        };

        element.addEventListener("transitionend", onTransitionEnd);
        element.addEventListener("animationend", onAnimationEnd);

        // Safety fallback (no transition / animation happened)
        const fallback = setTimeout(done, timeout);
    });
}



// char selection ---------------------

function start_header_animation() {
    const banner = document.querySelector('.selection_banner');
    const scrollWidthHalf = banner.scrollWidth / 2;

    let scrollPos = 0;
    console.log("start_header_animation triggered");

    function step() {
        scrollPos += 1.15;

        if (scrollPos >= scrollWidthHalf) {
            scrollPos = 0;
        }

        banner.scrollLeft = scrollPos;
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

async function first_selection() {
    return new Promise(resolve => {
        for (let index = 0; index < charlist.length; index++) {
            const element = charlist[index];
            if (element.starter) {
                const main = document.createElement("div")
                const tittle = document.createElement("h1")
                tittle.textContent = element.name
                const display = document.createElement("img")
                display.alt = element.name + ": picture"
                display.src = "../assets/char" + element.sprites[element.current.aspect]
                const btn = document.createElement("button")
                btn.textContent = "select"
                main.append(tittle, display, btn);
                // console.log(element,typeof(unlocked_chars))
                if (unlocked_chars.includes(element.key)) {
                    btn.addEventListener("click", () => {
                        resolve(new ally(element, "tf2 coconut"))
                        selection_overlay.style.top = -100 + "vh"
                    })
                }
                else{
                    display.style.filter = "grayscale(100%)"
                    
                }

                selection_chars.appendChild(main)
            }
        }
    })
}

console.log("ui loaded")