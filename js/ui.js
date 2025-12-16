//  general ---------------------------
async function untangle_que(animation_que) {
    for (const item of animation_que) {
        await item.do()
    }
    control_lock = false
}



// char selection ---------------------

function start_header_animation() {
    const banner = document.querySelector('.selection_banner');
    const scrollWidthHalf = banner.scrollWidth / 2;

    let scrollPos = 0;
    console.log("start_header_animation triggered");

    function step() {
        scrollPos += 1.15;

        if (scrollPos >= scrollWidthHalf) {
            scrollPos = 0;
        }

        banner.scrollLeft = scrollPos;
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

    console.log("ui loaded")