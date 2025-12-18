function sethp(targ) {
    targ.body.hp_current.textContent =targ.hero.current.hp
     targ.body.hp_current.style.width = (2*targ.hero.current.hp) +"px"
}
console.log("anim loaded")