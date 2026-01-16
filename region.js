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
                    break;
            
                default:
                    break;
            }
        }),
        "E": new fight(["F"],[pirate]),
        "F": new shop(["end"],[]),
        "end": new fight,
    }
}
// const city_R = {
//     key: "R_city",
//     name: "the city of Iolcus",

// }
console.log("region.js loaded")