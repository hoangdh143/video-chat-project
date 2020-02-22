import { Component, ViewEncapsulation } from '@angular/core';

import { PopoverController } from '@ionic/angular';
import {connect, createLocalTracks, createLocalVideoTrack} from 'twilio-video';
import { PopoverPage } from '../about-popover/about-popover';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzE0M2U4ZmMxOTdhYmIyNzViNGUxYzQ3YWRmYmU2YmFmLTE1ODIzMDYxODMiLCJpc3MiOiJTSzE0M2U4ZmMxOTdhYmIyNzViNGUxYzQ3YWRmYmU2YmFmIiwic3ViIjoiQUM4MzBlZjUzYjA1MWUyOGQ2M2ZjNTdlMjk4NzI1OTVmNCIsImV4cCI6MTU4MjMwOTc4MywiZ3JhbnRzIjp7ImlkZW50aXR5Ijoic2FtcGxlLWNsaWVudCIsInZpZGVvIjp7InJvb20iOiJzYW1wbGUtcm9vbSJ9fX0.dSjhJIuFfqevmlOdLSOnSuBg817Z6W3GzA8haY20nBI';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  constructor(public popoverCtrl: PopoverController) { }
  connectToRoom() {
    createLocalVideoTrack().then(track => {
      const localMediaContainer = document.getElementById('local-media');
      localMediaContainer.appendChild(track.attach());
    });
    createLocalTracks({
      audio: true,
      video: { width: 640 }
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

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }
}
