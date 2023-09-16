
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
        public bool isPlaying()
        {
            var sessionManager = GlobalSystemMediaTransportControlsSessionManager.RequestAsync().GetAwaiter().GetResult();
            var currentSession = sessionManager.GetCurrentSession();

            var playbackStatus = currentSession.GetPlaybackInfo().PlaybackStatus;

            return playbackStatus == GlobalSystemMediaTransportControlsSessionPlaybackStatus.Playing;
        }

        public async void play()
        {
            try
            {
                var sessionManager = GlobalSystemMediaTransportControlsSessionManager.RequestAsync().GetAwaiter().GetResult();
                var currentSession = sessionManager.GetCurrentSession();
                if(currentSession != null)
                {
                    await currentSession.TryPlayAsync();
                }
            }
            catch
            {

            }
            
        }
        public async void pause()
        {
            try
            {
                var sessionManager = GlobalSystemMediaTransportControlsSessionManager.RequestAsync().GetAwaiter().GetResult();
                var currentSession = sessionManager.GetCurrentSession();
                if(currentSession != null)
                {
                    await currentSession.TryPauseAsync();
                }
            }
            catch
            {

            }
        }

    }
}