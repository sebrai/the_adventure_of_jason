class enemy {
    constructor(type) {
        this.key = getkey()
        // body goes here
        this.hero = { ...type }
        this.jason = false
    }
}
class animation_que_item {
    constructor(func, target) {
        this.do = func
        this.target = target
    }
}
class ally {
    constructor(type) {
        this.key = getkey
        // body goes here
        this.hero = { ...type }
        this.jason = (this.hero.key == "jason")
    }
}







console.log("classes loaded")