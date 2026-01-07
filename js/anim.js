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
async function count_turn() {
    turns.style.top = "5%"
    turns.textContent = "turn: " + turn_count
    return waitForMotion(turns, { transitionProperty: "top", timeout: 1000 })
        .then(() => {
            setTimeout(() => {
                turns.style.opacity = 0 + "%"
                waitForMotion(turns, { transitionProperty: "opacity", timeout: 500 }).then(() => {
                    turns.style.top = "-15%"
                    waitForMotion(turns, { transitionProperty: "top", timeout: 1000 }).then(() => {
                        turns.style.opacity = "100%"
                    })
                });
            }, 1000)


        })
}
console.log("anim loaded")