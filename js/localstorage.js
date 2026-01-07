let unlocked_chars = localStorage.getItem("unlocked")
if (unlocked_chars) {
     unlocked_chars = JSON.parse(unlocked_chars)
    // console.log(unlocked_chars)
}
else {
    console.log("first time no chars loaded")
    unlocked_chars = ["jason"]
    localStorage.setItem("unlocked",JSON.stringify(unlocked_chars))
}
console.log("starage loaded")