class enemy {
    constructor(type) {
        this.key = "key("+key_incrementor+")"
        key_incrementor+= 1
        // body goes here
        this.hero = type
        this.jason = false
    }
}
class animation_que_item {
    constructor(func,target) {
        this.do = func
        this.target =target
    }
}
class ally {
    constructor(type,main=false) { // add if you add more make main the final one
       this.key = "key("+key_incrementor+")"
        key_incrementor+= 1
        // body goes here
        this.hero =  type
        this.jason = main
        if (main){

        }
        else{

        }
    }
}







console.log("classes loaded")