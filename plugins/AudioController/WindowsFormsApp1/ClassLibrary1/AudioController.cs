
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Runtime;
using Windows.Media.Control;

namespace AudioController
{
    public class AudioController
    {

        public bool IsPlaying()
        {
            var sessionManager = GlobalSystemMediaTransportControlsSessionManager.RequestAsync().GetAwaiter().GetResult();
            var currentSession = sessionManager.GetCurrentSession();

            var playbackStatus = currentSession.GetPlaybackInfo().PlaybackStatus;

            return playbackStatus == GlobalSystemMediaTransportControlsSessionPlaybackStatus.Playing;
        }

        public async void Play()
        {
            try
            {
                var sessionManager = GlobalSystemMediaTransportControlsSessionManager.RequestAsync().GetAwaiter().GetResult();
                var currentSession = sessionManager.GetCurrentSession();
                if(currentSession != null)
                {
                    await currentSession.TryPlayAsync();
                    return;
                }
            }
            catch
            {

            }
            
        }
        public async void Pause()
        {
            try
            {
                var sessionManager = GlobalSystemMediaTransportControlsSessionManager.RequestAsync().GetAwaiter().GetResult();
                var currentSession = sessionManager.GetCurrentSession();
                if(currentSession != null)
                {
                    await currentSession.TryPauseAsync();
                    return;
                }
            }
            catch 
            {

            }
        }

        public void PlayITunes()
        {
            try
            {
                iTunesLib.iTunesAppClass iTunesApp = new iTunesLib.iTunesAppClass();
                iTunesApp.Play();
            }
            catch (Exception e) {
                Console.WriteLine(e.ToString());
            }

            return;
        }

        public void PauseITunes()
        {
            try
            {
                iTunesLib.iTunesAppClass iTunesApp = new iTunesLib.iTunesAppClass();
                iTunesApp.Pause();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return;
        }

    }
}