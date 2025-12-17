// ui imputs ------------------------------------------------------------------
start_btn.addEventListener("click", () => {
   let que = [new animation_que_item(() => {
      menu_overlay.style.top = "100%";
      return waitForMotion(menu_overlay, {
         transitionProperty: "top",
         timeout: 600
      });
   }, menu_overlay)]
   untangle_que(que)
   start_header_animation()
})

// game logik inputs ----------------------------------------------------------

console.log("inputs loaded")