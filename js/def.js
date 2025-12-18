// html elements
const start_btn = document.getElementById("start_btn")
const menu_overlay = document.getElementById("menu_over")
const play_area = document.getElementById("playarea")
const char_area = document.getElementById("chararea")
const ally_area = document.getElementById("allyarea")
const enemy_area = document.getElementById("enemyarea")
const controls_area = document.getElementById("controls")

// globals (important)
let key_incrementor = 0
let control_lock = false
const allylist = []
const enemylist = []
// global functions
function getkey() {
    key_incrementor++
    return "key(" + (key_incrementor - 1) + ")"
}

function rng(max = 100, min = 0) {
    let r = Math.floor(Math.random() * (max + 1)) + min
    return r
}
function getdmg(attack_num,user) {
    let dmg = user.hero.attacks[attack_num].dmg
    for (let index = 0; index < user.hero.current.dmg_buffs.length; index++) {
        const element = user.hero.current.dmg_buffs[index];
        if (element.order == 1){
            dmg += element.value
        }
        else if (element.order == 2) {
            dmg *= element.value
        }
        else if (element.order == 3){
            dmg ^= element.value
        }
    }
    if (user.hero.current.crit_chance >= rng()){
        dmg *= 1.5
        // add animation for crit
    }
    else{
        // non crit dmg effect
    }
    return dmg;

}
console.log("def loaded")