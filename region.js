const prolog_R = {
    key: "R_prolog",
    name: "the feilds of Iolcus",
    prefix: "feild:",
    done: false,

    path: {
        "start": new fight(["A"], [city_guard ]),
        "A": new fight(["B", "C"], [ city_guard, city_guard ]),
        "B": new fight(["D"], [ city_guard, city_guard ]),
        "C": new fight(["B","D"], [pirate]),
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
        "E": new fight(["F","S"],[pirate],[()=>true,() => G.nodes_visited.includes("feild:B") &&  G.nodes_visited.includes("feild:C")],false,()=>{
            document.body.style.backgroundImage = "url(./assets/backgrounds/temp/distance.jpg)"
            document.body.style.backgroundSize = "auto 100vh"
            // console.log(G.nodes_visited)
        }),
        "F": new shop(["end"],[]),
        "S": new story_event(["F"],async () => {
            G.gold += 40
            document.body.style.backgroundImage = "url(./assets/backgrounds/temp/secret_cave.jpg)"
        }),
        "end": new fight(["start"],[head_city_guard,city_guard],null,true,()=>{
            document.body.style.backgroundImage = "url(./assets/backgrounds/temp/city_walls_infront.jpg)"
        },async ()=>{
            G.region = prolog_R //  should change to city
        })
    }
}
// const city_R = {
//     key: "R_city",
//     name: "the city of Iolcus",

// }
console.log("region.js loaded")