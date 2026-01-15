class html_body {
    constructor(base, ally) {
        this.whole = document.createElement("div")
        this.hp_bar = document.createElement("div")
        this.hp_current = document.createElement("div")
        this.hp_current.textContent = base.hero.current.hp
        this.hp_bar.style.width = 2 * base.hero.maxhp + "px"
        this.hp_current.style.width = (base.hero.current.hp * 2) + "px"
        this.hp_bar.appendChild(this.hp_current)
        this.whole.appendChild(this.hp_bar)

        this.sprite = document.createElement("img")
        this.sprite.src = "../assets/char" + base.hero.sprites[base.hero.current.aspect]
        this.whole.appendChild(this.sprite)
        this.whole.className = "char_indiv"
        if (ally) {
            ally_area.appendChild(this.whole)
        } else {
            enemy_area.appendChild(this.whole)

        }
        // console.log("whole element:",this.hp_bar.style.width)
    }
}



class enemy {
    constructor(type) {
        this.key = getkey()
        this.hero = { ...type, current: { ...type.current } }
        this.body = new html_body(this, false)
        this.main = false
        this.ally = false
        this.hero.speed_base = this.hero.char_speed + rng(4, -8)
        this.hero.current.speed = this.hero.speed_base
        this.status = {
            power: null,
            duration: null,
            key: null
        }
        this.dead = false
        enemylist.push(this)
    }
}
class animation_que_item {
    constructor(func, target) {
        this.do = func
        this.target = target
    }
}

class ally {
    constructor(type, main = false) {
        this.key = getkey()
        this.hero = { ...type, current: { ...type.current } }
        this.body = new html_body(this, true)
        this.main = Boolean(main)
        this.ally = true
        this.hero.speed_base = this.hero.char_speed + rng(10, -10)
        this.hero.current.speed = this.hero.speed_base
        this.status = {
            power: null,
            duration: null,
            key: null
        }
        this.dead = false
        allylist.push(this)
    }
}
class fight {
    constructor(next, enemies,  bossfight= false, startanim, endanim) {
        this.type = !bossfight ? "fight" : "bossfight"
        this.logo = "./assets/icons/" + (!bossfight ? "fight" : "boss_fight" )+ ".png"
        this.start = async () => {
            if (startanim) {
                await startanim()
            }
            for (let index = 0; index < enemies.length; index++) {
                const element = enemies[index];
                base_enemies[index] =new enemy(element)
            }
            console.log("spwned: ", enemies, "enemy list: ", enemylist)
        }
        this.end_animation = endanim
        this.next = next
    }
}

class shop {
    constructor(next, items) {
        this.type = "shop"
        this.logo = "./assets/icons/shop.png"
        this.items = items
        this.next = next
    }
}

class event {
    constructor(next, afunc= async function () {}) {
        this.type = "event"
        this.logo = "./assets/icons/event.png"
        this. start = afunc 
        this.next = next
    }
}

console.log("classes loaded")