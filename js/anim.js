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
    await waitForMotion(user_el, { transitionProperty: "left", timeout: 100 })
        .then(() => {
            user_el.style.transition = "top 1s ease, left 1s ease, opacity 0.5s ease";
            user_el.style.left = "";
            user_el.style.top = "";
            user_el.style.postition = ""

        })

    return;
}

console.log("anim loaded")