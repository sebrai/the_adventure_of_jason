// perms ---------------------------------------------


// temps ---------------------------------------------

 const healing_potion = {
    key: "heal_potion",
    name:"Healing potion",
    desc: "",
    holder: null,
    power: 40,
    cost:20,
   sprite:"../assets/icons/h_potion.png",
    do: async function (target = this.holder) {
       heal(target,this.power) 
    }, 
    rm: function (){
       index = this.holder.hero.current.items.temps.indoxOf(this)
       this.holder.hero.current.items.temps.splice(index,1)
    } // untested
}

 const speed_potion = {
    key: "speed_potion",
    name:"speed potion",
    desc: "",
    holder: null,
    power: 40,
    cost:15,
    sprite:"../assets/icons/s_potion.png",
    do: async function (target = this.holder) {
      apply_effect(target,{
                    power: 40,
                    duration: 3,
                    key: "swift",
                })
    }, 
    rm: function (){
       index = this.holder.hero.current.items.temps.indoxOf(this)
       this.holder.hero.current.items.temps.splice(index,1)
    } // untested
}

 const pocket_fireball = {
    key: "pfb",
    name:"pocket fireball",
    desc: "",
    holder: null,
    power: 60,
    cost:60,
    sprite:"../assets/icons/pfb.png",
    do: async function (target = this.holder) {
      let t = get_target("enemy",target)
      // fireball aniamtion
      take_dmg(t,this.power)
    }, 
    rm: function (){
       index = this.holder.hero.current.items.temps.indoxOf(this)
       this.holder.hero.current.items.temps.splice(index,1)
    } // untested
}
// armor ---------------------------------------------

//  weapon slotts ------------------------------------
