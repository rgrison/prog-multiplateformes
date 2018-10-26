import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';
import * as Constants from "../../constants";
import { Storage } from '@ionic/storage';
import { ConferencePage } from '../conference/conference';
import { Session } from '../../session';


/**
 * Generated class for the ConferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conferences',
  templateUrl: 'conferences.html',
})
export class ConferencesPage implements OnInit {

  public sessions: Array<Session> = [];
  public sessionsByDay: { [day: string]: Session } = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferencesPage');
  }

  ngOnInit() {
    this.storage.get(Constants.SESSIONS).then(sessionsStored => {
      this.sessions = sessionsStored;

      // sorting sessions by day, then sorting by hour
      const dates = Array.from(new Set(this.sessions.map(session => session.date)));
      let sessionsByDay = {};
      dates.forEach(date => sessionsByDay[date] = []);
  
      this.sessions.forEach(session => sessionsByDay[session.date].push(session));

      // sorting sessions by beginning time
      Object.keys(sessionsByDay).forEach(day => {
        this.sessionsByDay[day] = sessionsByDay[day].sort((session1, session2) => session1.startTime.localeCompare(session2.startTime));
      });
    });

  }

  days() {
    return Object.keys(this.sessionsByDay);
  }

  openSessionDescription(session: Session) {
    console.log("Opening session description");
    this.navCtrl.push(ConferencePage, { 'session' : session });
  }
}
