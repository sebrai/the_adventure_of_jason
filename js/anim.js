function sethp(target, amount = target.hero.current.hp) {
    target.body.hp_current.textContent = amount
    target.body.hp_current.style.width = (2 * amount) + "px"
    return waitForMotion(target.body.hp_current, { transitionProperty: "width", timeout: 1000 })
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
    return waitForMotion(controls_area, { transitionProperty: "top", timeout: 500 })
}
async function count(objekt = turns ? turns : waves ? waves : null) {
    objekt.style.top = "5%"
    objekt.textContent = objekt === turns ? "turn: " + turn_count : "fight: " + fight_num
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
    b_unluck_img.src = target.hero.boon.logo
    b_unlock.style.top = 0
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            b_unluck_continue.addEventListener("click", () => {
                b_unlock.style.top = "100vh"
                resolve("")
            })
            b_unluck_continue.style.opacity = "100%"

        }, 2000)
    }).then(b_unluck_continue.removeEventListener("click", () => {
        b_unlock.style.top = "100vh"
        resolve("")
    }))
}
console.log("anim loaded")