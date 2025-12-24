// perms ---------------------------------------------


// temps ---------------------------------------------

 const healing_potion = {
    key: "heal_potion",
    name:"Healing potion",
    desc: "",
    holder: null,
    power: 40,
    // add a sprite
    do: function (target = this.holder) {
       heal(target,this.power) 
    }, 
    rm: function (){
       index = this.holder.hero.current.items.temps.indoxOf(this)
       this.holder.hero.current.items.temps.splice(index,1)
    } // untested
 }

// armor ---------------------------------------------

//  weapon slotts