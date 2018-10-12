import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Speaker } from '../../speaker';
import { Storage } from '@ionic/storage';
import { Session } from '../../session';
import * as Constants from '../../constants';

/**
 * Generated class for the SpeakerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speaker',
  templateUrl: 'speaker.html',
})
export class SpeakerPage implements OnInit {

  public speaker: Speaker;
  public speakerSessions: Array<Session> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.speaker = navParams.get('speaker');
  }

  ngOnInit() {
    this.storage.get(Constants.SESSIONS).then(sessionsStored => {
      let speakerSessions: Array<Session> = [];

      sessionsStored.forEach(session => {
          console.log(`current session: ${session.id}`);
          if (this.speaker.id in session.speakers) {
              speakerSessions.push(session);
          }
      });

      console.log(`récupéré les sessions suivantes : ${speakerSessions}`);
      this.speakerSessions = speakerSessions;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakerPage');
  }

  getSessions() {
    this.storage.get(Constants.SESSIONS).then(sessionsStored => {
      let speakerSessions: Array<Session> = [];

      sessionsStored.array.forEach(session => {
          if (this.speaker.id in session.speakers) {
              speakerSessions.push(session);
          }
      });

      this.speakerSessions = speakerSessions;
    });

  }
}
