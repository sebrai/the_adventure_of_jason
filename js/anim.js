function sethp(target,amount = target.hero.current.hp) {
    target.body.hp_current.textContent =amount
    target.body.hp_current.style.width = (2*amount) +"px"
    return waitForMotion(target.body.hp_current, { transitionProperty: "width", timeout: 1000 })
}
function open_close_controls(open = false) {
    if (open){
       controls_area.style.top = "70vh"
    }
    else {
        controls_area.style.top = "100vh"
    }
    return waitForMotion(controls_area,{transitionProperty:"top",timeout:500 })
}
function turn_count() {
    
}
console.log("anim loaded")