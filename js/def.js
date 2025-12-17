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

// global functions
function getkey() {
    key_incrementor++
    return "key(" + (key_incrementor - 1) + ")"
}

function rng(max = 100, min = 0) {
    let r = Math.floor(Math.random() * (max + 1)) + min
    return r
}
console.log("def loaded")