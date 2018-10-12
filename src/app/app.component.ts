import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ConferencesPage } from '../pages/conferences/conferences';
import { ConferenciersPage } from '../pages/conferenciers/conferenciers';
import { Storage } from '@ionic/storage';
import * as Constants from "../constants";

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
      { title: 'List', component: ListPage },
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

      // Load data in Cache if it's not set
      // TODO check cache
      this.loadData(Constants.SESSIONS);
      this.loadData(Constants.SPEAKERS);
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
   */
  private loadData = function(storeName) {
    fetch(Constants.API_URL + storeName)
      .then(resp => resp.json())
      .then(data => {
        this.storage.set(storeName, data);
      })
  };  
}
