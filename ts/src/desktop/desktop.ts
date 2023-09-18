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

const appTypeStandardBackground = document.getElementById("app_type_standard_background");
const appTypeITunesBackground = document.getElementById("app_type_itunes_background");

if(localStorage.getItem('activeITunes') != null && localStorage.getItem('activeITunes') == "true"){
    appTypeITunesBackground.classList.toggle("active");
    localStorage.setItem('activeITunes', "true");
}else{
    appTypeStandardBackground.classList.toggle("active");
    localStorage.setItem('activeITunes', "false");
}

appTypeStandardBackground.addEventListener("click", () => {
    if(localStorage.getItem('activeITunes') == null || localStorage.getItem('activeITunes') == "false"){
        return;
    }
    var b = appTypeStandardBackground.classList.toggle("active");
    appTypeITunesBackground.classList.toggle("active");
    localStorage.setItem('activeITunes', "false");
});

appTypeITunesBackground.addEventListener("click", () => {
    if(localStorage.getItem('activeITunes') != null && localStorage.getItem('activeITunes') == "true"){
        return;
    }
    var b = appTypeStandardBackground.classList.toggle("active");
    appTypeITunesBackground.classList.toggle("active");
    localStorage.setItem('activeITunes', "true");
});