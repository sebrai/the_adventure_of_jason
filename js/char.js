let jason = {
    maxhp:100,
    current:{ // describes anything that changes
        hp:100,
        dmg_buffs:[],
        sheild_buffs:[],
        items:{
            potions:[],
            perms:[],
            equipables:{
                armor:{
                    helmet: null,
                    chestplate: null,
                    leggings: null,
                    boots:null,
                    gloves: null
                },
                mainhand:null,
                sidearm:null,
                sheild: null
            },
        },
        aspect:0
    },
    sprites:[],// add sprites when created


}
console.log("char loaded")