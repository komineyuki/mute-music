import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

const switchOuter = document.querySelector(".switch_outer");
const toggleSwitch = document.querySelector(".toggle_switch");

if(localStorage.getItem('activeMute') == null || localStorage.getItem('activeMute') == "true"){
    switchOuter.classList.toggle("active");
    toggleSwitch.classList.toggle("active");
    localStorage.setItem('activeMute', "true");
}

switchOuter.addEventListener("click", () => {
    var b = switchOuter.classList.toggle("active");
    toggleSwitch.classList.toggle("active");
    localStorage.setItem('activeMute', b.toString());
});