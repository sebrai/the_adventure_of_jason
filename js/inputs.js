// ui imputs ------------------------------------------------------------------
start_btn.addEventListener("click",()=>{
   let que = [ new animation_que_item(()=>{
    menu_overlay.style.top = "100%"
   },"none")]
   untangle_que(que)
})

// game logik inputs ----------------------------------------------------------

console.log("inputs loaded")