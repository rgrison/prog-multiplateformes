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
      
      // sorting sessions by beginning time + date in human readable format
      Object.keys(sessionsByDay).forEach(day => {
        this.sessionsByDay[this.getReadableDate(day)] = sessionsByDay[day].sort((session1, session2) => session1.startTime.localeCompare(session2.startTime));
      });
    });
    
  }
  
  months = {1: 'janvier', 2: 'février', 3: 'mars', 4: 'avril', 5: 'mai', 6: 'juin', 7: 'juillet', 8: 'août', 9: 'septembre', 10: 'octobre', 11: 'novembre', 12: 'décembre'};
  getReadableDate = (date: string) => {
    date = date.substr(5, date.length);
    let month = Number(date.substr(0, 2));
    let day   = date.substr(3, date.length);

    return day + ' ' + this.months[month]
  }
  days() {
    return Object.keys(this.sessionsByDay);
  }

  openSessionDescription(session: Session) {
    console.log("Opening session description");
    this.navCtrl.push(ConferencePage, { 'session' : session });
  }
}
