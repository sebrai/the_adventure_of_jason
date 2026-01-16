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
const pathsover = document.getElementById("pathsover")
const paths_container = document.getElementById("paths_bx")
const b_unlock = document.getElementById("boon_unlock")
const b_unluck_img = document.getElementById("boon_unlock_img") 
const b_unluck_continue = document.getElementById("b_unlock_continue") 
// globals (important)
let key_incrementor = 0
let control_lock = false
let turn_count = 1
let cur_region;
let cur_fight;
let fight_num = 1
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
function try_critt(chance) {
    result = chance >= rng(100, 1)
    return result
}
function getdmg(dmg, user, attack) {
    const critt = try_critt(attack.custom_critt ? attack.custom_critt : user.hero.current.crit_chance)
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
    if (critt) {
        // critt dmg effect
        dmg *= attack.custom_critt_mult ? attack.custom_critt_mult : user.hero.crit_mult ? user.hero.crit_mult : 1.5
    }
    for (let index = 0; index < user.hero.current.sheild_buffs.length; index++) {
        const element = user.hero.current.sheild_buffs_buffs[index];
        const block_type_match =
            element.block_type === "any" ||
            // attack.type === "any" ||
            element.block_type.includes(attack.type);

        const block_range_match =
            element.block_range === "any" ||
            // attack.range === "any" ||
            element.block_range(attack.range);

        const block_target_match =
            element.block_target === "any" ||
            attack.target(element.block_target);

        if (block_type_match && block_range_match && block_target_match) {
            if (element.order == 1) {
                dmg -= element.value
            }
            else if (element.order == 2) {
                dmg /= element.value
            }
        }
    }
    // normal dmg effects
    return dmg

}
console.log("def loaded")