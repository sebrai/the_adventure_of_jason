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
        this.status = {
            power: null,
            duration: null,
            key: null
        }
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
        this.hero = { ...type, current: {...type.current} }
        this.body = new html_body(this, true)
        this.main = Boolean(main)
        this.status = {
            power: null,
            duration: null,
            key: null
        }
        allylist.push(this)
    }
}







console.log("classes loaded")