import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Session } from '../../session';
import { Speaker } from '../../speaker';
import { SpeakerPage } from '../speaker/speaker';
import { NotesPage } from '../notes/notes';
import * as Constants from "../../constants";

/**
 * Generated class for the ConferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conference',
  templateUrl: 'conference.html',
})
export class ConferencePage {

  public session: Session = null;
  public sessionSpeakers: Array<Speaker> = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.session = navParams.get('session');
    this.loadSessionSpeakers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferencePage');
  }

  loadSessionSpeakers() {
    fetch(Constants.API_URL + Constants.SPEAKERS)
      .then(resp => resp.json())
      .then(data => {

        for (let key in data) {

          if (this.session.speakers.indexOf(parseInt(key)) >= 0) {
            this.sessionSpeakers.push(new Speaker(data[key]));
          }
        }
      })
  }

  openSpeakerDescription(speaker: Speaker) {
    console.log("Opening speaker description");
    this.navCtrl.push(SpeakerPage, { 'speaker' : speaker });
  }

  openMyNotes() {
    this.navCtrl.push(NotesPage, { 'sessionId' : this.session.id, 'sessionTitle' : this.session.title });
  }
}
