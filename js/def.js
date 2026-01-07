// html elements
const start_btn = document.getElementById("start_btn")
const menu_overlay = document.getElementById("menu_over")
const play_area = document.getElementById("playarea")
const char_area = document.getElementById("chararea")
const ally_area = document.getElementById("allyarea")
const enemy_area = document.getElementById("enemyarea")
const controls_area = document.getElementById("controls")
const selection_chars = document.getElementById("selection_chars")
const selection_overlay = document.getElementById("char_over")
const item_over = document.getElementById("items_over")
const item_area = document.getElementById("item_content")
const turns = document.getElementById("turns")
const waves = document.getElementById("waves")
// globals (important)
let key_incrementor = 0
let control_lock = false
let wave_count = 1
let turn_count = 1
const allylist = []
const enemylist = []
// global functions
function getkey() {
    key_incrementor++
    return "key(" + (key_incrementor - 1) + ")"
}

function rng(max = 100, min = 0) {
    let r = Math.floor(Math.random() * (max + 1 - min)) + min
    return r
}
function try_critt(dmg,chance) {
       
    if (chance >= rng()) {
         // add animation for crit
        // text bubbles
        return dmg * 1.5
    }
    else {
        // non crit dmg effect
        return dmg
    }
       
}
function getdmg(dmg, user, attack) {

    for (let index = 0; index < user.hero.current.dmg_buffs.length; index++) {
        const element = user.hero.current.dmg_buffs[index];
        const atk_type_match =
            element.atk_type === "any" ||
            // attack.type === "any" ||
            element.atk_type.includes(attack.type);

        const atk_range_match =
            element.atk_range === "any" ||
            // attack.range === "any" ||
            element.atk_range(attack.range);
        
        const atk_target_match =
            element.atk_target === "any" ||
            attack.target(element.atk_target);
        
        if (atk_type_match && atk_range_match && atk_target_match) {
            if (element.order == 1) {
                dmg += element.value
            }
            else if (element.order == 2) {
                dmg *= element.value
            }
            else if (element.order == 3) {
                dmg ^= element.value
            }
        }
    }
     try_critt(dmg,user.hero.current.critt_chance)
    // console.log(dmg)
    return dmg;

}
console.log("def loaded")