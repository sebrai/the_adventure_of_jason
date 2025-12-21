let jason = {
    key: "jason",
    name: "Jason",
    starter: true,
    maxhp: 100,
    base_mana: 20,
    mana_gain: 5,
    crit_chance: 15,
    current: { // describes anything that changes
        hp: 100,
        mana: 20,
        mana_gain: 5,
        crit_chance: 15,
        dmg_buffs: [],
        sheild_buffs: [],
        items: {
            potions: [],
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
    sprites: ["/temp/funny dog.jpg"],// add sprites when created
    attacks: [
        {
            dmg: 40,
            cost: 0,
            index:0,
            range: "melee",
            type: "slash",
            target: "enemy",
            status_eff: {
                apply: false,
                statusobjekt: {
                    power: 0,
                    duration: 0,
                    key: "none",
                }
            },
            func: function (target, self) {
                take_dmg(target, getdmg(this.dmg, self,this))
                if (this.status_eff.apply) {
                        apply_effect(target, this.status_eff.statusobjekt)
                    }
            }
        }, {
            dmg: 30,
            index:1,
            cost: 5,
            range: "melee",
            type: "slash",
            target: "enemy",
            status_eff: {
                apply: true,
                statusobjekt: {
                    power: 10,
                    duration: 1,
                    key: "bleed"
                }
            },
            func: function (target, self) {
                take_dmg(target, getdmg(this.dmg, self,this))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
        }, {
            dmg: 0,
            cost: 30,
            index:2,
            range: "self",
            type: "magic",
            target: "self",
            status_eff: {
                apply: true,
                statusobjekt: {
                    power: 35,
                    duration: 4,
                    key: "locked in",
                }
            },
            func: function (target, self) {
                // target.hero.current.hp -= getdmg(0, self)
                
                // if (this.status_eff.apply) {
                //     apply_effect(target, this.status_eff.statusobjekt)
                // }
            }
        }
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




let medea = {
    key: "medea",
    name: "Medea",
    starter: true,
    maxhp: 80,
    base_mana: 50,
    mana_gain: 15,
    crit_chance: 5,
    current: { // describes anything that changes
        hp: 80,
        mana: 50,
        mana_gain: 15,
        crit_chance: 5,
        dmg_buffs: [],
        sheild_buffs: [],
        items: {
            potions: [],
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
    sprites: ["/temp/funny dog.jpg"],// add sprites when created
    attacks: [
        {
            dmg: 40,
            cost: 0,
            index:0,
            range: "melee",
            type: "slash",
            target: "enemy",
            status_eff: {
                apply: false,
                statusobjekt: {
                    power: 0,
                    duration: 0,
                    key: "none",
                }
            },
            func: function (target, self) {
                take_dmg(target, getdmg(this.dmg, self, this))
                if (this.status_eff.apply) {
                        apply_effect(target, this.status_eff.statusobjekt)
                    }
            }
        }, {
            dmg: 30,
            index:1,
            cost: 5,
            range: "melee",
            type: "slash",
            target: "enemy",
            status_eff: {
                apply: true,
                statusobjekt: {
                    power: 10,
                    duration: 1,
                    key: "bleed"
                }
            },
            func: function (target, self) {
                take_dmg(target, getdmg(this.dmg, self, this))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
        }, {
            dmg: 0,
            cost: 30,
            index:2,
            range: "self",
            type: "magic",
            target: "self",
            status_eff: {
                apply: true,
                statusobjekt: {
                    power: 35,
                    duration: 4,
                    key: "locked in",
                }
            },
            func: function (target, self) {
                // target.hero.current.hp -= getdmg(0, self)
                
                // if (this.status_eff.apply) {
                //     apply_effect(target, this.status_eff.statusobjekt)
                // }
            }
        }
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
const charlist = [jason]
console.log("char loaded")