import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Speaker } from '../../speaker';
import { Storage } from '@ionic/storage';
import { Session } from '../../session';
import { ConferencePage } from '../conference/conference'
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
    // TODO: extract this piece of code in a method and call it
    this.storage.get(Constants.SESSIONS).then(sessionsStored => {
      let speakerSessions: Array<Session> = [];
      sessionsStored.forEach(session => {
        const found = session.speakers.indexOf(this.speaker.id) > -1;
        if (found) {
          speakerSessions.push(session);
        }
      });
      this.speakerSessions = speakerSessions;
    });
  }

  // TODO: same as ConferencePage.openSessionDescription, extract it and make it
  //       available to every class
  openSessionDescription(session:Session) {
    console.log("Opening session description from speaker's details page");
    this.navCtrl.push(ConferencePage, { 'session' : session });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakerPage');
  }
}
