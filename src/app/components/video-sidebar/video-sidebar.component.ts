import { Component, OnInit } from '@angular/core';
import {TwilioService} from '../twilio/services/twilio.service';
import {connect, createLocalTracks, createLocalVideoTrack} from 'twilio-video';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzE0M2U4ZmMxOTdhYmIyNzViNGUxYzQ3YWRmYmU2YmFmLTE1ODIzMDYxODMiLCJpc3MiOiJTSzE0M2U4ZmMxOTdhYmIyNzViNGUxYzQ3YWRmYmU2YmFmIiwic3ViIjoiQUM4MzBlZjUzYjA1MWUyOGQ2M2ZjNTdlMjk4NzI1OTVmNCIsImV4cCI6MTU4MjMwOTc4MywiZ3JhbnRzIjp7ImlkZW50aXR5Ijoic2FtcGxlLWNsaWVudCIsInZpZGVvIjp7InJvb20iOiJzYW1wbGUtcm9vbSJ9fX0.dSjhJIuFfqevmlOdLSOnSuBg817Z6W3GzA8haY20nBI';


@Component({
  selector: 'video-sidebar',
  templateUrl: './video-sidebar.component.html',
  styleUrls: ['./video-sidebar.component.scss'],
})
export class VideoSidebarComponent implements OnInit {
  participants = [];

  constructor(private twilioService: TwilioService) { }

  ngOnInit() {
    this.connectToRoom();
  }

  connectToRoom(): void {
    createLocalVideoTrack().then(track => {
      const localMediaContainer = document.getElementById('local-media');
      localMediaContainer.appendChild(track.attach());
    });

    createLocalTracks({
      audio: true,
      video: { width: 200 }
    }).then(localTracks => {
      return connect(token, {
        name: 'my-room-name',
        tracks: localTracks
      });
    }).then(room => {
      console.log(`Connected to Room: ${room.name}`);
      room.on('participantConnected', participant => {
        console.log(`Participant "${participant.identity}" connected`);

        participant.tracks.forEach(publication => {
          if (publication.isSubscribed) {
            const track = publication.track;
            document.getElementById('remote-media-div').appendChild(track.attach());
          }
        });

        participant.on('trackSubscribed', track => {
          document.getElementById('remote-media-div').appendChild(track.attach());
        });
      });
    });
  }

}
