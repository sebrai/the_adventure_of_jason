let pirate = {
    key: "pirate",
    name: "pirate",
    maxhp: 80,
    crit_chance: 5,
    crit_mult: 1.4,
    char_speed: 45,
    speed_base: null,
    current: { // describes anything that changes
        hp: 80,
        crit_chance: 5,
        speed: null,
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
    sprites: ["/temp/pirate.svg"],// add sprites when created
    attacks: [
        {
            dmg: 30,
            cost: 0,
            index: 0,
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
            index: 1,
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

    ],

}

let city_guard = {
    key: "city_guard",
    name: "city guard",
    maxhp: 90,
    crit_chance: 10,
    crit_mult: 1.2,
    char_speed: 35,
    speed_base: null,
    current: { // describes anything that changes
        hp: 90,
        crit_chance: 10,
        speed: null,
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
    sprites: ["/temp/guard.jpg"],// add sprites when created
    attacks: [
        {
            dmg: 20,
            index: 0,
            range: "melee",
            type: "peirce",
            custom_critt: 35,
            custom_critt_mult: 1.8,
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
            index: 1,
            range: "melee",
            type: "slash",
            status_eff: {
                apply: false,
                statusobjekt: {
                    power: null,
                    duration: null,
                    key: null
                }
            },
            func: function (target, self) {
                take_dmg(target, getdmg(this.dmg, self))
                if (this.status_eff.apply) {
                    apply_effect(target, this.status_eff.statusobjekt)
                }
            }
        }

    ],

}

console.log("enemies.js loaded")