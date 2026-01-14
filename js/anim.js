function sethp(target, amount = target.hero.current.hp) {
    target.body.hp_current.textContent = amount
    target.body.hp_current.style.width = (2 * amount) + "px"
    return waitForMotion(target.body.hp_current, { transitionProperty: "width", timeout: 1000 })
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
    return waitForMotion(objekt, { transitionProperty: "top", timeout: 1000 })
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
console.log("anim loaded")