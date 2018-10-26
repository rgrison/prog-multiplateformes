import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ConferencesPage } from '../pages/conferences/conferences';
import { ConferenciersPage } from '../pages/conferenciers/conferenciers';
import { Storage } from '@ionic/storage';
import * as Constants from "../constants";
import { Speaker } from '../speaker';
import { Session } from '../session';
import { stringify } from '@angular/compiler/src/util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Conférences', component: ConferencesPage},
      { title: 'Conférenciers', component: ConferenciersPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Create a store for Notes if it doesn't exist yet
      this.storage.get(Constants.NOTES).then(notesStoredList => {
        console.log("Notes storage exists :" + (!notesStoredList));
        if (!notesStoredList) {
          console.log("Notes storage was null, so creating an empty one...");
          this.storage.set(Constants.NOTES, {});
        }
      });

      // Load sessions and speakers data in local storage at each opening of the app
      this.loadData(Constants.SPEAKERS, json => { return new Speaker(json) });

      // needs a more complex instanciation function, because we need to retrieve the conference schedule
      // generating a sessionId -> date & time map
      fetch(Constants.API_URL + "schedule")
        .then(resp => resp.json())
        .then(schedule => {
          var times: { [sessionId: string]: {date: string, startTime: string, endTime: string} } = {};
          for (const day of schedule) {
            for (const timeslot of day['timeslots']) {
              for (const session of timeslot['sessions']) {
                times[session[0]] = {date: day['date'], startTime: timeslot['startTime'], endTime: timeslot['endTime']};
              }
            }
          }

          // loading session data in cache
          this.loadData(Constants.SESSIONS, json => {
            console.log('creating new session');
            return new Session(json, times);
          });
        });


      // TODO: get value for startTime and endTime
      // TODO: get json from /schedule
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  /**
   * To load data into cache if it's not done yet
   * @param storeName Name of data to load
   * @param createInstance function creating an instance of an object (e.g. Speaker) from a JSON document
   */
  private loadData = function(storeName, createInstance) {
    fetch(Constants.API_URL + storeName)
      .then(resp => resp.json())
      .then(data => {
        let dataToStore = [];
        for (let key in data) {
          dataToStore.push(createInstance(data[key]));
        }
        this.storage.set(storeName, dataToStore);
      })
  };
}
