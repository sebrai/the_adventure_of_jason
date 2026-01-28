// base stuff
let main_player;
let ally1;
let ally2;
let ally3;
let enemy1;
let enemy2;
let enemy3;
let enemy4;
const base_enemies = [enemy1, enemy2, enemy3, enemy4]
let starting_region = prolog_R
async function startGame() {
    main_player = await first_selection();

    // continue game setup
    cur_region = starting_region
    cur_fight = { next: [{ to: "start", condition: () => true }] }
    while (allylist.length) {
        await encounter()
    }
}







// general
function take_dmg(target, dmg) {
    target.hero.current.hp -= dmg
    // passive abillity logik
    if (target.hero.current.hp < 0) {
        target.hero.current.hp = 0

    }
    animationQueue.add(new animation_que_item(() => {
        return sethp(target, target.hero.current.hp)

    }, target.body.hp_current))

    if (target.hero.current.hp == 0) kill(target)
}
function heal(target, hp_to_heal = 10) {
    target.hero.current.hp += hp_to_heal
    if (target.hero.current.hp > target.hero.maxhp) {
        target.hero.current.hp = target.hero.maxhp
    }
    // passive abillity logik

    animationQueue.add(new animation_que_item(() => {
        return sethp(target, target.hero.current.hp)

    }, target.body.hp_current))
}
function kill(target) {
    if (target.dead) return
    target.dead = true

    const list = target instanceof ally ? allylist : enemylist

    const idx = list.indexOf(target)
    if (idx !== -1) {
        list.splice(idx, 1)
    }
    animationQueue.add(new animation_que_item(() => {
        return anim_defeat(target)


    }, target.body.whole))
}

// effects
function apply_effect(target, effectobjekt = null) {
    target.status = { ...effectobjekt }
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
async function first_selection() {
    return new Promise(resolve => {
        for (let index = 0; index < charlist.length; index++) {
            const element = charlist[index];
            if (element.starter) {
                const main = document.createElement("div")
                const tittle = document.createElement("h1")
                tittle.textContent = element.name
                const display = document.createElement("img")
                display.alt = element.name + ": picture"
                display.src = "../assets/char" + element.sprites[element.current.aspect]
                const btn = document.createElement("button")
                btn.textContent = "select"
                main.append(tittle, display, btn);
                // console.log(element,typeof(unlocked_chars))
                if (unlocked_chars.includes(element.key)) {
                    btn.addEventListener("click", () => {
                        resolve(new ally(element, "tf2 coconut"))
                        selection_overlay.style.top = -100 + "vh"
                    })
                }
                else {
                    display.style.filter = "grayscale(100%)"

                }

                selection_chars.appendChild(main)
            }
        }
    })
}
async function decide_path() {
    return new Promise((resolve) => {
        animationQueue.add(new animation_que_item(() => {
            return set_paths_over(false)
        }, pathsover))
        paths_container.innerHTML = ""
        // console.log(cur_fight)
        cur_fight.next.forEach(element => {
            // console.log(element)
            if (!element.condition()) return
            let btn = document.createElement("button")
            let pic = document.createElement("img")
            pic.src = cur_region.path[element.to].logo
            btn.appendChild(pic)
            btn.addEventListener("click", () => {
                animationQueue.add(new animation_que_item(() => {
                    return set_paths_over(true)
                }, pathsover))
                paths_container.innerHTML = ""
                resolve([cur_region.path[element.to], element.to])

            })

            paths_container.appendChild(btn)


        });
    })
}
async function encounter() {
    enc = await decide_path()
    cur_fight = enc[0]
    nodes_visited.push(cur_region.prefix + enc[1])
    switch (cur_fight.type) {
        case "fight":
            await do_fight()
            if (cur_fight.end_animation) await cur_fight.end_animation()
            break;
        case "event":
            await cur_fight.start()
            break
        default:
            break;
    }
}
async function do_fight(battle = fight_num) {
    // console.log("wave:",number)
    const enemy_types = await cur_fight.start()
    spawn_enemies(enemy_types)
    animationQueue.add(new animation_que_item(() => {
        return count(waves)
    }, waves))
    while (enemylist.length) { // while wave not deafeated
        await do_turn()

    }
    allylist.forEach(element => {
        wave_reset(element)
    })
    fight_num++
}
async function do_turn() {
    animationQueue.add(new animation_que_item(() => {
        return count(turns)
    }, turns))
    let order = turn_order(true)
    for (let index = 0; index < order.length; index++) {
        const element = order[index];
        if (!element || !element.dead) {
            if (element instanceof ally) {
                await player_action(element)
            }
            else {
                console.log("enemy turn")
            }
        }
    }
    turn_count++
}



function spawn_enemies(list) {
    for (let index = 0; index < list.length; index++) {
        const item = list[index];

        const slotIndex = base_enemies.findIndex(
            element => !element || element.dead
        );

        if (slotIndex !== -1) {
            base_enemies[slotIndex] = new enemy(item);
        }
    }

    console.log("enemy list:", enemylist);
}


function wave_reset(char) {
    char.hero.current.mana = char.hero.base_mana
    char.hero.current.crit_chance = char.hero.crit_chance
    char.hero.current.hp = char.hero.maxhp
    char.hero.current.speed = char.hero.speed_base
    apply_effect(char) // having no second parameter for apply sets the status to null
    turn_count = 1
}
function end_turn() {
    for (let index = 0; index < allylist.length; index++) {
        const item = allylist[index];
        item.hero.current.mana += item.hero.current.mana_gain
        item.hero.current.crit_chance = item.hero.crit_chance
        item.hero.current.speed = item.hero.speed_base
        if (item.status) {
            do_status(item)
        }
    }
}
function turn_order(show = false) {
    const all = [...allylist, ...enemylist]
        .filter(unit => unit && !unit.dead)
        .sort((a, b) => b.hero.current.speed - a.hero.current.speed)
    if (show) {
        for (let index = 0; index < all.length; index++) {
            const element = all[index];
            // console.log(element, element.hero.current.speed)
        }
    }
    return all
}
async function getattack(attacker) {
    return new Promise(resolve => {
        while (controls_area.firstChild) {
            controls_area.removeChild(controls_area.firstChild)
        }
        for (let index = 0; index < attacker.hero.attacks.length; index++) {
            const element = attacker.hero.attacks[index];
            let btn = document.createElement("button")
            btn.textContent = element.name // add more details if nececeary
            btn.addEventListener("click", () => {
                animationQueue.add(new animation_que_item(() => {
                    return open_close_controls(false)
                }, controls_area))
                resolve(element)
            })
            controls_area.appendChild(btn)
        }
        let itembtn = document.createElement("button")
        itembtn.textContent = "use items"
        itembtn.addEventListener("click", () => {
            item_over.style.display = "block"
            item_area.innerHTML = ""
            if (attacker.hero.current.items.temps.length > 0) {
                item_area.className = "yesitem"
                // code to add item btns with logik
                console.log("yes items")
            } else {
                item_area.className = "noitem"
                item_area.appendChild(document.createTextNode(attacker.hero.name + " has no items"))
                console.log("no item")
            }
        })
        controls_area.appendChild(itembtn)
        animationQueue.add(new animation_que_item(() => {
            return open_close_controls(true)
        }, controls_area))
    })
}

async function get_target(string, user = main_player) { // string is the attacks target attribute
    switch (string) { // function is only called for allies
        case "self":
            return {
                fail: false,
                target: user
            }
            break;
        case "enemy":
            if (!enemylist.length) {
                console.error("no enemy to target")
                return {
                    fail: true,
                    target: null
                }
            }
            return new Promise(resolve => {
                for (let index = 0; index < enemylist.length; index++) {
                    const enemyitem = enemylist[index];
                    enemyitem.body.whole.style.backgroundColor = "red" // replace with a better indicator latter
                    enemyitem.body.sprite.addEventListener("click", () => {
                        for (let jindex = 0; jindex < enemylist.length; jindex++) {
                            const element = enemylist[jindex];
                            element.body.whole.style.backgroundColor = "beige"
                        }
                        resolve({
                            fail: false,
                            target: enemyitem
                        })
                    })
                }
            })
            break
        case "ally":
            if (allylist.length <= 1) { // function should be turned into a variable
                console.error("no allies attack failed")
                return {
                    fail: true,
                    target: null,
                }
            } // after return ask if (target.fail)
            return new Promise(resolve => {
                for (let index = 0; index < allylist.length; index++) {
                    const allyitem = allylist[index];
                    if (allyitem != user) {
                        allyitem.body.whole.style.backgroundColor = "green" // replace with a better indicator latter
                        allyitem.body.sprite.addEventListener("click", () => {
                            for (let jindex = 0; jindex < allylist.length; jindex++) {
                                const element = allylist[jindex];
                                element.body.whole.style.backgroundColor = "beige"
                            }
                            resolve({
                                fail: false,
                                target: allyitem
                            })
                        })
                    }
                }
            })
            break
        default:
            console.error("attack used has", '"' + string + '"', "as its target attribute")
            return {
                fail: true,
                target: null
            }
            break;
    }
}
async function player_action(user = main_player, fails = 0) {
    const attack = await getattack(user)
    const targ_obj = await get_target(attack.target, user)
    const target = targ_obj.target
    if (targ_obj.fail) {
        // should tell the player that the attack failed
        // then try again
        if (fails < 3) {
            player_action(user, fails + 1)
        }
        else {
            // end their turn and tell player
            return;
        }
    }
    else {
        attack.func(target, user)
    }


}
function atk_influence(e, target) {
    let influence = []
    for (let index = 0; index < e.hero.attacks.length; index++) {
        const atk = e.hero.attacks[index];
        let inf = rng(rng(70, 40), rng(5, rng(-5, -15)))
        inf += atk.dmg
        if (atk.status_eff.apply) {
            inf += atk.status_eff.status_objekt.power * atk.status_eff.status_objekt.duration
        }
        inf *= 1 + (atk.dmg / 100)
        if (atk.dmg > target.hero.current.hp) {
            inf *= 2
        }
        if (atk.target === "self") {
            inf += 5
            if (e.hero.current.hp < e.hero.maxhp * 0.2) {
                inf *= atk.dmg / 10
            }
        }
        inf -= atk.index * 20
        inf = Math.round(inf)
        influence.push(inf)
    }
    console.log(influence)
    return influence
}
function e_decide_atk(e, target) {
    let influence = atk_influence(e, target)
    let num = rng(Math.max(...influence) + Math.min(...influence) - 1)
    console.log(num)
    let atk_index = Math.min(...influence) > num ? influence.indexOf(Math.min(...influence)) : influence.indexOf(Math.max(...influence))
    let atk = e.hero.attacks[atk_index]
    return atk
}
console.log("battles loaded")