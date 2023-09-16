import {
  OWGames,
  OWGamesEvents,
  OWHotkeys
} from "@overwolf/overwolf-api-ts";

import { AppWindow } from "../AppWindow";
import { kHotkeys, kWindowNames, kGamesFeatures } from "../consts";

import WindowState = overwolf.windows.WindowStateEx;

// The window displayed in-game while a game is running.
// It listens to all info events and to the game events listed in the consts.ts file
// and writes them to the relevant log using <pre> tags.
// The window also sets up Ctrl+F as the minimize/restore hotkey.
// Like the background window, it also implements the Singleton design pattern.
class InGame extends AppWindow {
  private static _instance: InGame;
  private _gameEventsListener: OWGamesEvents;
  // private _eventsLog: HTMLElement;
  // private _infoLog: HTMLElement;

  private constructor() {
    super(kWindowNames.inGame);

    // this._eventsLog = document.getElementById('eventsLog');
    // this._infoLog = document.getElementById('infoLog');

    this.setToggleHotkeyBehavior();
    this.setToggleHotkeyText();
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new InGame();
    }

    return this._instance;
  }

  public async run() {
    const gameClassId = await this.getCurrentGameClassId();

    const gameFeatures = kGamesFeatures.get(gameClassId);

    if (gameFeatures && gameFeatures.length) {
      this._gameEventsListener = new OWGamesEvents(
        {
          onInfoUpdates: this.onInfoUpdates.bind(this),
          onNewEvents: this.onNewEvents.bind(this)
        },
        gameFeatures
      );

      this._gameEventsListener.start();
    }


  }

  private onInfoUpdates(info) {
    this.logLine(info,);
  }

  // Special events will be highlighted in the event log
  private onNewEvents(e) {
    const shouldHighlight = e.events.some(event => {
      
      switch (event.name) {
        case 'kill':
        case 'death':
        case 'assist':
        case 'level':
        case 'matchStart':
        case 'match_start':
        case 'matchEnd':
        case 'match_end':
          return true;
      }

      return false
    });
    this.logLine( e);
  }

  // Displays the toggle minimize/restore hotkey in the window header
  private async setToggleHotkeyText() {
    const gameClassId = await this.getCurrentGameClassId();
    const hotkeyText = await OWHotkeys.getHotkeyText(kHotkeys.toggle, gameClassId);
    const hotkeyElem = document.getElementById('hotkey');
    hotkeyElem.textContent = hotkeyText;
  }

  // Sets toggleInGameWindow as the behavior for the Ctrl+F hotkey
  private async setToggleHotkeyBehavior() {
    const toggleInGameWindow = async (
      hotkeyResult: overwolf.settings.hotkeys.OnPressedEvent
    ): Promise<void> => {
      console.log(`pressed hotkey for ${hotkeyResult.name}`);
      const inGameState = await this.getWindowState();

      if (inGameState.window_state === WindowState.NORMAL ||
        inGameState.window_state === WindowState.MAXIMIZED) {
        this.currWindow.minimize();
      } else if (inGameState.window_state === WindowState.MINIMIZED ||
        inGameState.window_state === WindowState.CLOSED) {
        this.currWindow.restore();
      }
    }

    OWHotkeys.onHotkeyDown(kHotkeys.toggle, toggleInGameWindow);
  }

  private logLine(data) {
    this.detectPlayOrPause(data);
  }

  private async getCurrentGameClassId(): Promise<number | null> {
    const info = await OWGames.getRunningGameInfo();

    return (info && info.isRunning && info.classId) ? info.classId : null;
  }

  private detectPlayOrPause(data){
    try{

      console.log("DEBUG: "+ JSON.stringify(data));
      

      if(!muteActivated){
        return;
      }
      

      if(data.hasOwnProperty("events")){
        if(data.name == "death" && data.data != 0){
          console.log("DETECT: events.death");
          this.playMusic();
          return;
        }

        if(data.name == "match_start"){
          console.log("DETECT: events.match_start");
          this.playMusic();
          return;
        }

        if(data.name == "match_end"){
          console.log("DETECT: events.match_start");
          this.playMusic();
          return;
        }
      }

      if(data.hasOwnProperty("match_info")){
        if(data["match_info"].hasOwnProperty("round_phase")){
          const current = data["match_info"]["round_phase"];
          console.log('DETECT: match_info.round_phase=' + current);
          switch(current){
            case "shopping": this.playMusic(); return;
            case "combat": this.pauseMusic(); return;
            case "end":
            case "game_end":
              this.playMusic(); return;
          }
        }

        if(data["match_info"].hasOwnProperty("map")){
          const current = data["match_info"]["map"];
          console.log('DETECT: match_info.map=' + current);
          if(current == null){
            this.playMusic();
          }
        }
      }
    }catch(e){
      console.log("ERROR: " + e.toString());
    }
  }

  private playMusic() {
    try{
      var pluginInstance = null;
      overwolf.extensions.current.getExtraObject("audio-controller", (result) => {
        
          if (result.success) {
            pluginInstance = result.object;
            try{
              pluginInstance.play();
            }catch(e){
              console.log("ERROR: " + e.toString());
            }
          }
      });
    }catch(e){
      console.log("ERROR: " + e.toString());
    }
  }

  private pauseMusic() {
    try{
      var pluginInstance = null;
      overwolf.extensions.current.getExtraObject("audio-controller", (result) => {
      
        if (result.success) {
          pluginInstance = result.object;
          try{
            pluginInstance.pause();
          }catch(e){
            console.log("ERROR: " + e.toString());
          }
        }
      });
    }catch(e){
      console.log("ERROR: " + e.toString());
    }
  }
}

const switchOuter = document.querySelector(".switch_outer");
const toggleSwitch = document.querySelector(".toggle_switch");
var muteActivated = true;

function initMuteActive(){
  if(localStorage.getItem('activeMute') == null || localStorage.getItem('activeMute') == "true"){
      switchOuter.classList.toggle("active");
      toggleSwitch.classList.toggle("active");
      localStorage.setItem('activeMute', "true");
  }
}  

switchOuter.addEventListener("click", () => {
  var b = switchOuter.classList.toggle("active");
  toggleSwitch.classList.toggle("active");
  localStorage.setItem('activeMute', b.toString());
  muteActivated = b;
});


initMuteActive();
InGame.instance().run();
