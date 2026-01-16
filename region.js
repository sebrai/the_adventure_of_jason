const prolog_R = {
    key: "R_prolog",
    name: "the feilds of Iolcus",
    prefix: "feild:",
    done: false,

    path: {
        "start": new fight(["A"], [city_guard ]),
        "A": new fight(["B", "C"], [ city_guard, city_guard ]),
        "B": new fight(["D"], [ city_guard, city_guard ]),
        "C": new fight(["D","B"], [pirate]),
        "D": new story_event(["E"],async () => {
            switch (main_player.hero.key) {
                case "jason":
                    // play animation based on charachter
                    main_player.hero.boon.unlocked = true
                    await unlock_boon(main_player)
                    break;

                default:
                    break;
            }
        }),
        "E": new fight(["F","S"],[pirate],[()=>true,() => nodes_visited.includes("feild:B")|| nodes_visited.includes("feild:C")]),
        "F": new shop(["end"],[]),
        "S": new story_event(["F"],async () => {
            gold += 40
        })
        // "end": new fight,
    }
}
// const city_R = {
//     key: "R_city",
//     name: "the city of Iolcus",

// }
console.log("region.js loaded")