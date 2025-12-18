function sethp(target) {
    target.body.hp_current.textContent =target.hero.current.hp
    target.body.hp_current.style.width = (2*target.hero.current.hp) +"px"
}
console.log("anim loaded")