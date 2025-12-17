let jason = {
    key: "jason",
    name: "Jason",
    maxhp: 100,
    base_mana:20,
    current: { // describes anything that changes
        hp: 100,
        mana:20,
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


}
console.log("char loaded")