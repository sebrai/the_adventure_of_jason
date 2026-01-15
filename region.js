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
        // "D":,
        // "E":,

    }
}
// const city_R = {
//     key: "R_city",
//     name: "the city of Iolcus",

// }
console.log("region.js loaded")