const main_player1 = new ally(jason);
const main_player2 = new ally(jason);
const main_player3 = new ally(jason);
const main_player4 = new ally(jason);
const test_enemy1 = new enemy(jason)
const test_enemy2 = new enemy(jason)
const test_enemy3 = new enemy(jason)
const test_enemy4 = new enemy(jason)
console.log("battles loaded")

function aplly_effect(target,effectobjekt= null) {
    target.status = effectobjekt
}
function do_status(target) {
    const status_objekt = target.status
    switch (status_objekt.key) {
        case "bleed":
            
            break;
        case "poison":

            break
        case "burn":
            
            break
        case "blessed":
            
            break
        case "locked in":
            
            break
        case "stuned":
            
            break
        default:

            break;
    }
    status_objekt.duration -=1
    if (!status_objekt.duration) {
        aplly_effect(target)
    }
}