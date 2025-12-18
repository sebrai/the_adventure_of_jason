let jason = {
    key: "jason",
    name: "Jason",
    maxhp: 100,
    base_mana: 20,
    current: { // describes anything that changes
        hp: 100,
        mana: 20,
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
    sprites: ["../assets/temp/funny dog.jpg"],// add sprites when created
    attacks: [
        {
            dmg: 40,
            cost: 0,
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
            func: function (targ, self) {
                targ.hero.current.hp -= getdmg(0, self)
                animationQueue.add(new animation_que_item(() => {
                    sethp(targ)
                    waitForMotion(targ.body.hp_current, { transitionProperty: "width", timeout: 1000 })
                }, targ.body.hp_current))
            }
        }, {
            dmg: 30,
            cost: 5,
            range: "melee",
            type: "slash",
            target: "enemy",
            status_eff: {
                apply: true,
                statusobjekt: {
                    power: 20,
                    duration: 1,
                    key: "bleed"
                }
            },
            func: function (targ, self) {
                targ.hero.current.hp -= getdmg(0, self)
                animationQueue.add(new animation_que_item(() => {
                    sethp(targ)
                    waitForMotion(targ.body.hp_current, { transitionProperty: "width", timeout: 1000 })
                }, targ.body.hp_current))
                if (this.status_eff.apply){
                    aplly_effect(targ,this.status_eff.statusobjekt)
                }
            }
        }, {

        }
    ],


}
console.log("char loaded")