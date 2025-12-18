function sethp(target) {
    target.body.hp_current.textContent =target.hero.current.hp
    target.body.hp_current.style.width = (2*target.hero.current.hp) +"px"
    return waitForMotion(target.body.hp_current, { transitionProperty: "width", timeout: 1000 })
}
console.log("anim loaded")