const prolog_R = {
    key: "R_prolog",
    name: "the feilds of Iolcus",
    prefix: "feild:",
    end: async function () {
        // await boss fight
        // sett to next region
        // play animation
        // start next region

    },
    tree: [
        {
            type: new tree_item("fight"), // when choosing path display title and logo
            spawner: function () { // run spawner then run wave to lock player into combart
                // what to spawn
            },
            tree: [
                {
                    type: new tree_item("fight"), // when choosing path display title and logo
                    spawner: function () { // run spawner then run wave to lock player into combart
                        // what to spawn
                    },
                    tree: [
                        {
                            type: new tree_item("event"), // when choosing path displat title and logo
                            do: () => { }, // give the player, their boon power
                            tree: [
                                {
                                    type: new tree_item("fight"), // when choosing path displat title and logo
                                    spawner: function () { // run spawner then run wave to lock player into combart
                                        // what to spawn
                                    },
                                    tree: [
                                        {
                                            type: new tree_item("shop"), // when choosing path displat title and logo
                                            items:[], // put items in here
                                            tree: [
                                                {
                                                    type: new tree_item("fight"), // when choosing path displat title and logo
                                                    spawner: function () { // run spawner then run wave to lock player into combart
                                                        prolog_R.end()
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
// const city_R = {
//     key: "R_city",
//     name: "the city of Iolcus",

// }
console.log("region.js loaded")