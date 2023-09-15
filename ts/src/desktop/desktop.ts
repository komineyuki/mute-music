import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

const pauseButton = document.getElementById("pauseButton");

pauseButton.addEventListener('click', () => {
  var pluginInstance = null;
  overwolf.extensions.current.getExtraObject("audio-controller", (result) => {
    try{
      if (result.success) {
        // result.object.pause();
        pluginInstance = result.object;
        pluginInstance.play();
        document.getElementById('eid_date').innerHTML = pluginInstance;
      }else{
        document.getElementById('eid_date').innerHTML = "failed";
      }
    }catch(e){
    document.getElementById('eid_date').innerHTML ="ERROR: " +e;
    }
  });
});