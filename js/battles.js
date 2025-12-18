// test stuff
const main_player = new ally(jason);
const main_player2 = new ally(jason);
const main_player3 = new ally(jason);
const main_player4 = new ally(jason);
const test_enemy1 = new enemy(pirate)
const test_enemy2 = new enemy(pirate)
const test_enemy3 = new enemy(pirate)
const test_enemy4 = new enemy(pirate)

// general
function take_dmg(target, dmg) {
    target.hero.current.hp -= dmg
    animationQueue.add(new animation_que_item(() => {
       return sethp(target)
        
    }, target.body.hp_current))
}

// effects
function apply_effect(target, effectobjekt = null) {
    target.status = effectobjekt
    // animations for status being applied
}
function do_status(target) {
    const status_objekt = target.status
    console.log("status on:", target.hero.name, ":", status_objekt)
    switch (status_objekt.key) {
        case "bleed":
            take_dmg(target, status_objekt.power)
        target.hero.current.crit_chance = 0
            break;
        case "poison":
            take_dmg(target, status_objekt.power)
            status_objekt.power *= 1.5
            Math.round(status_objekt.power)
            break
        case "burn":

            break
        case "blessed":

            break
        case "locked in":
        target.hero.current.crit_chance += status_objekt.power
            break
        case "stuned":

            break
        case "enchanted":

            break
        case "invincible":

            break
        default:

            break;
    }

    status_objekt.duration -= 1
    if (!status_objekt.duration) {
        apply_effect(target)
    }
}

// game flow
function wave_reset(char) {
    char.hero.current.mana = char.hero.base_mana
    char.hero.current.crit_chance = char.hero.crit_chance
    apply_effect(char) // having no second parameter for apply sets the status to null
    // add more if needed
}
function end_turn() {
    for (let index = 0; index < allylist.length; index++) {
        const item = allylist[index];
        item.hero.current.mana += item.hero.current.mana_gain
        item.hero.current.crit_chance = item.hero.crit_chance
        if (item.status) {
            do_status(item)
        }
    }
}


console.log("battles loaded")