function sethp(target, amount = target.hero.current.hp) {
    // target.body.hp_current.textContent = amount
    let t_time = 1000
    numbers_roll(target.body.hp_current, amount, t_time / (Math.abs(Number(target.body.hp_current.textContent) - amount)))
    target.body.hp_current.style.width = (2 * amount) + "px"
    return waitForMotion(target.body.hp_current, { transitionProperty: "width", timeout: t_time })
}
async function anim_defeat(target) {
    target.body.whole.style.opacity = "0%"
    await waitForMotion(target.body.whole, { transitionProperty: "opacity", timeout: 500 })


    const bodies = target instanceof ally ? ally_area : enemy_area


    for (let i = 0; i < bodies.children.length; i++) {
        const element = bodies.children[i]
        if (element === target.body.whole) {
            animationQueue.add(
                new animation_que_item(() => {
                    bodies.removeChild(element)
                }, element)
            )
            break
        }
    }
}
function open_close_controls(open = false) {
    if (open) {
        controls_area.style.top = "70vh"
    }
    else {
        controls_area.style.top = "100vh"
    }
    // return waitForMotion(controls_area, { transitionProperty: "top", timeout: 500 })
}
async function count(objekt = turns ? turns : waves ? waves : null) {
    objekt.style.top = "5%"
    objekt.textContent = objekt === turns ? "turn: " + G.turn_count : "fight: " + G.fight_count
    waitForMotion(objekt, { transitionProperty: "top", timeout: 1000 })
        .then(() => {
            setTimeout(() => {
                objekt.style.opacity = 0 + "%"
                waitForMotion(objekt, { transitionProperty: "opacity", timeout: 500 }).then(() => {
                    objekt.style.top = "-15%"
                    waitForMotion(objekt, { transitionProperty: "top", timeout: 1000 }).then(() => {
                        objekt.style.opacity = "100%"
                    })
                });
            }, 1000)


        })
}
async function numbers_roll(changeing_el, end, speed = 50) {
    // console.log(Number(changeing_el.textContent),end)
    if (Number(changeing_el.textContent) == end) return
    else if (Number(changeing_el.textContent) > end) {
        while (Number(changeing_el.textContent) > end) {
            changeing_el.textContent = Math.floor(Number(changeing_el.textContent) - 1)
            await wait(speed)
            // console.log(changeing_el.textContent)
        }

    }
    else {
        while (Number(changeing_el.textContent) < end) {
            changeing_el.textContent = Math.floor(Number(changeing_el.textContent) - 1)
            await wait(speed)
        }
    }


}
async function set_paths_over(up = false) {
    if (up) {
        pathsover.style.top = "-100vh"
    }
    else {
        pathsover.style.top = 0
    }
    return waitForMotion(pathsover, { transitionProperty: "top", timeout: 1000 })
}
async function unlock_boon(target) {
    return unlock_item(target.hero.boon.logo)
}

async function unlock_item(src) {
    item_unlock_img.src = src
    b_unlock.style.top = 0
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            item_unlock_continue.addEventListener("click", () => {
                b_unlock.style.top = "100vh"
                resolve("")
            })
            item_unlock_continue.style.opacity = "100%"

        }, 2000)
    }).then(item_unlock_continue.removeEventListener("click", () => {
        b_unlock.style.top = "100vh"
        resolve("")
    }))
}
function splash_text(target, text, color = "white") {
    let box = document.createElement("h1")
    box.textContent = text
    box.className = "splash_text_cont"
    box.style.color = color

    let pos = target.getBoundingClientRect()

    box.style.top = pos.top + "px"
    box.style.left = pos.left + "px"

    document.body.appendChild(box)

    // Let browser render initial state first
    requestAnimationFrame(() => {
        box.style.opacity = "1"
        box.style.transform = "translateY(-50px)"
    })


    setTimeout(() => {
        box.remove()
    }, 1000)
}

async function dash_attack(user_el, target_el) {
    let t_box = target_el.getBoundingClientRect()
    user_el.style.postition = "fixed"
    user_el.style.transition = "top 0.2s ease, left 0.2s ease, opacity 0.5s ease"
    user_el.style.left = t_box.left - t_box.width + "px"
    user_el.style.top = t_box.top + "px "
    await waitForMotion(user_el, { transitionProperty: "left", timeout: 200 })
        .then(() => {
            user_el.style.transition = "top 1s ease, left 1s ease, opacity 0.5s ease";
            user_el.style.left = "";
            user_el.style.top = "";
            user_el.style.postition = ""

        })

    return;
}

function def_particle(sprite) { // dropps particle and returns its element
    const particle = document.createElement("img")

    particle.className = "particle"
    particle.src = sprite
    return particle
}
function dropp_particle(item, el, radians, r) {


    item.style.left = el.left+(el.width/2) + "px"
    item.style.top = el.top+(el.height/2) + "px"
    document.body.appendChild(item)
    item.style.transition = "top 0.5s ease-out, left 0.5s ease-out"
    item.style.left =  el.left+(el.width/2)  + Math.sin(radians) * r + "px"
    item.style.top =  el.top+(el.height/2)  + Math.cos(radians) * r + "px"
}
async function collect_particles(particles, end = { left: -5, top: -5 }, r_bar = null, counter = null) {// end is 2 cordinates, the deafult places them inside the corner of the screen
    for (let index = 0; index < particles.length; index++) {
        const p = particles[index];
        p.style.transition = "top 2s ease, left 2s ease"
        p.style.top = end.top
        p.style.left = end.left
        if (end.width) p.style.zIndex 
        waitForMotion(p, { transitionProperty: "left", timeout: 2000 })
            .then(() => {
                // code for bar filling up or counter counting
                document.body.removeChild(p)
            })

        await wait(rng(5, 25))
    }



}
async function particles(sprite, element, rmax = 150, rmin = 50, number_of = 100, collection_objekt = { end_el: null, r_bar: null, counter: null, }, timer = 500) {
    const list = []

    for (let i = 0; i < number_of; i++) {
        const particle = def_particle(sprite)
        list.push(particle)
        console.log(particle)
    }
    for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const c_box = element.getBoundingClientRect()
        
        const radians = rng(360, 0) * (Math.PI / 180)
        const r = rng(rmax, rmin)
        dropp_particle(item, c_box, radians, r)

    }
    await wait(timer)
    console.log(list);
    const end_loc = collection_objekt.end_el ? collection_objekt.end_el.getBoundingClientRect() : { left: 0, top: 0 }
    collect_particles(list, end_loc, collection_objekt.r_bar, collection_objekt.counter)
}
console.log("anim loaded")