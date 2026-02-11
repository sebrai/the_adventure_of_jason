let jason = {
    key: "jason",
    name: "Jason",
    starter: true,
    maxhp: 100,
    base_mana: 20,
    mana_gain: 5,
    crit_chance: 15,
    crit_mult: 1.75,
    char_speed: 50,
    speed_base: null,
    current: { // describes anything that changes
        hp: 100,
        mana: 20,
        mana_gain: 5,
        crit_chance: 15,
        speed: null,
        dmg_buffs: [],
        sheild_buffs: [],
        items: {
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
        aspect: 0
    },
    sprites: ["/temp/funny dog.jpg"],// add sprites when created
    attacks: [
        {
            dmg: 40,
            cost: 0,
            index: 0,
            name: "slash",
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
                take_dmg(target, getdmg(this.dmg, self, this,target))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
        }, {
            dmg: 30,
            cost: 3,
            index: 1,
            name: "wounding slash",
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
                take_dmg(target, getdmg(this.dmg, self, this,target))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
        }, {
            dmg: 0,
            cost: 30,
            index: 2,
            name: "main charchter syndrome",
            range: "self",
            type: "magick",
            target: "self",
            status_eff: {
                apply: true,
                statusobjekt: {
                    power: 35,
                    duration: 4,
                    key: "locked in",
                }
            },
            func: function (target, self = undefined) {


                if (this.status_eff.apply) {
                    apply_effect(self ? self : target, this.status_eff.statusobjekt)
                }
            }
        }
    ],
    boon: {
        logo: "./assets/icons/bp/jason_hera.png",
        charge: 0,
        req: 150 ,
        unlocked: false,
        from: "Hera",
        func: function (target = null, user = null) {
            G.allylist.forEach(element => {
                element.hero.current.crit_chance += 15
            });
        },
    },

    ability: function (self, context = {}) {
        if (context.end_wave) {
            self.hero.crit_chance += 2
            self.hero.current.crit_chance += 2
        }
        // else if (context.on_status || context.get_hit){
        //     self.hero.crit_chance += 1
        //     self.hero.current.crit_chance += 1
        // }
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
    crit_mult: 1.4,
    char_speed: 40,
    speed_base: null,
    current: { // describes anything that changes
        hp: 80,
        mana: 50,
        mana_gain: 15,
        crit_chance: 5,
        speed: null,
        dmg_buffs: [],
        sheild_buffs: [],
        items: {
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
        aspect: 0
    },
    sprites: ["/temp/tomine.jpg"],// add sprites when created
    attacks: [
        {
            dmg: 30,
            cost: 5,
            index: 0,
            name: "magick shot",
            range: "long",
            type: "magick",
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
                take_dmg(target, getdmg(this.dmg, self, this,target))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
        }, {
            dmg: 50,
            index: 1,
            cost: 25,
            name: "bewitch",
            range: "long",
            type: "magick",
            target: "enemy",
            status_eff: {
                apply: true,
                statusobjekt: {
                    power: 10,
                    duration: 2,
                    key: "sleep"
                }
            },
            func: function (target, self) {
                take_dmg(target, getdmg(this.dmg, self, this,target))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
        }, {
            dmg: 9999,
            cost: 100,
            index: 2,
            name: "everlasting nightmare",
            range: "close",
            type: "magick",
            target: "enemy",
            status_eff: {
                apply: false,
                statusobjekt: {
                    power: null,
                    duration: null,
                    key: null,
                }
            },
            func: function (target, self) {
                if (target.status.key === "sleep" && !String(target.hero.key).startsWith('boss_')) {
                    take_dmg(target, getdmg(this.dmg, self, this,target))
                }

                // if (this.status_eff.apply) {
                //     apply_effect(target, this.status_eff.statusobjekt)
                // }
            }
        }
    ],
     boon: {
        logo: "",
        charge: 0,
        req: 200,
        unlocked: false,
        from:"Helios",
        dmg: 100,
        func: function (target = null, user = null) {
            take_dmg(target,this.dmg)
        },
    },
    ability: function (self, context = {}) {
        if (context.get_hit && 50 > rng()) {
            heal(self, 0.3 * context.dmg_dealt)
        }

    },

}

let test_charachter = {
    key: "jason",
    name: "test",
    starter: true,
    maxhp: 100,
    base_mana: 20,
    mana_gain: 5,
    crit_chance: 15,
    crit_mult: 1.75,
    char_speed: 50,
    speed_base: null,
    current: { // describes anything that changes
        hp: 100,
        mana: 20,
        mana_gain: 5,
        crit_chance: 15,
        speed: null,
        dmg_buffs: [],
        sheild_buffs: [],
        items: {
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
        aspect: 0
    },
    sprites: ["/temp/funny_test.jpg"],// add sprites when created
    attacks: [
        {
            dmg: 100,
            cost: 0,
            index: 0,
            name: "wild baby attack",
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
                take_dmg(target, getdmg(this.dmg, self, this,target))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
        }, {
            dmg: 45,
            cost: 3,
            index: 1,
            name: "spitt",
            cost: 5,
            range: "medium",
            type: "proj",
            target: "enemy",
            status_eff: {
                apply: false,
                statusobjekt: {
                    power: 10,
                    duration: 1,
                    key: "bleed"
                }
            },
            func: function (target, self) {
                take_dmg(target, getdmg(this.dmg, self, this,target))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
        }, {
            dmg: 30,
            cost: 10,
            index: 2,
            name: "crying baby",
            range: "self",
            type: "magick",
            target: "self",
            status_eff: {
                apply: false,
                statusobjekt: {
                    power: 35,
                    duration: 4,
                    key: "locked in",
                }
            },
            func: function (target, self = undefined) {

                heal(target,(this.dmg*target.hero.maxhp)/100)
                if (this.status_eff.apply) {
                    apply_effect(self ? self : target, this.status_eff.statusobjekt)
                }
            }
        }
    ],
    boon: {
        logo: "./assets/icons/bp/jason_hera.png",
        charge: 0,
        req: 150 ,
        unlocked: false,
        from: "Hera",
        func: function (target = null, user = null) {
            G.allylist.forEach(element => {
                element.hero.current.crit_chance += 15
            });
        },
    },

    ability: function (self, context = {}) {
        if (context.end_wave) {
            self.hero.crit_chance += 2
            self.hero.current.crit_chance += 2
        }
        // else if (context.on_status || context.get_hit){
        //     self.hero.crit_chance += 1
        //     self.hero.current.crit_chance += 1
        // }
    },

}
const charlist = [jason, medea,test_charachter]
console.log("char loaded")