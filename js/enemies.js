let pirate = {
    key: "pirate",
    name: "pirate",
    maxhp: 80,
    crit_chance: 5,
    current: { // describes anything that changes
        hp: 80,
        crit_chance: 5,
        dmg_buffs: [],
        sheild_buffs: [],
        items: {
            temps: [],
            perms: [],
            equipables: {
                armor: {
                    helmet: null,
                    chestplate: null,
                    leggings: null,
                    boots: null,
                    gloves: null
                },
                mainhand: null,
                sidearm: null,
                sheild: null
            },
        },
        aspect: 0
    },
    sprites: ["/temp/image.png"],// add sprites when created
    attacks: [
        {
            dmg: 10,
            cost: 0,
            index:0,
            range: "melee",
            type: "slash",
            status_eff: {
                apply: false,
                statusobjekt: {
                    power: 0,
                    duration: 0,
                    key: "none",
                }
            },
            func: function (target, self) {
                take_dmg(target, getdmg(this.dmg, self))
                if (this.status_eff.apply) {
                        apply_effect(target, this.status_eff.statusobjekt)
                    }
            }
        }, {
            dmg: 40,
            index:1,
            cost: 5,
            range: "melee",
            type: "slash",
            status_eff: {
                apply: true,
                statusobjekt: {
                    power: 10,
                    duration: 3,
                    key: "poison"
                }
            },
            func: function (target, self) {
                take_dmg(target, getdmg(this.dmg, self))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
         }
         //, {
        //     dmg: 0,
        //     cost: 30,
        //     index:2,
        //     range: "self",
        //     type: "magick",
        //     target: "self",
        //     status_eff: {
        //         apply: true,
        //         statusobjekt: {
        //             power: 35,
        //             duration: 4,
        //             key: "locked in",
        //         }
        //     },
        //     func: function (target, self) {
        //         // target.hero.current.hp -= getdmg(0, self)
                
        //         // if (this.status_eff.apply) {
        //         //     apply_effect(target, this.status_eff.statusobjekt)
        //         // }
        //     }
        //  }
    ],


    ability: function (self, context = {}) {
        if (context.end_wave) {
            self.hero.crit_chance += 2
            self.hero.current.crit_chance += 2
        }
        else if (context.on_status || context.get_hit){
            self.hero.crit_chance += 1
            self.hero.current.crit_chance += 1
        }
    },
        
}  
console.log("enemies.js loaded")