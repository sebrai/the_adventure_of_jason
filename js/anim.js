function sethp(target,amount = target.hero.current.hp) {
    target.body.hp_current.textContent =amount
    target.body.hp_current.style.width = (2*amount) +"px"
    return waitForMotion(target.body.hp_current, { transitionProperty: "width", timeout: 1000 })
}
console.log("anim loaded")