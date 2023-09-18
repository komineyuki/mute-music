import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

const switchOuter = document.getElementById("active-toggle-desktop");
const toggleSwitch = document.getElementById("toggle-switch-desktop");

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

const itunesSwitchOuter = document.getElementById("itunes-toggle-desktop");
const itunesToggleSwitch = document.getElementById("itunes-switch-desktop");

if(localStorage.getItem('activeITunes') != null && localStorage.getItem('activeITunes') == "true"){
    itunesSwitchOuter.classList.toggle("active");
    itunesToggleSwitch.classList.toggle("active");
    localStorage.setItem('activeITunes', "true");
}

itunesSwitchOuter.addEventListener("click", () => {
    var b = itunesSwitchOuter.classList.toggle("active");
    itunesToggleSwitch.classList.toggle("active");
    localStorage.setItem('activeITunes', b.toString());
});
