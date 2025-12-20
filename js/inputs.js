// ui imputs ------------------------------------------------------------------
start_btn.addEventListener("click", () => {
   animationQueue.add(new animation_que_item(() => {
      menu_overlay.style.top = "100%";
      return waitForMotion(menu_overlay, {
         transitionProperty: "top",
         timeout: 600
      });
   }, menu_overlay))
   animationQueue.run()
   start_header_animation()
   startGame();
})

// game logik inputs ----------------------------------------------------------

console.log("inputs loaded")