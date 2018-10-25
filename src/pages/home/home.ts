import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { OnInit } from '@angular/core';
import * as Constants from "../../constants";
import { Storage } from '@ionic/storage'
import { ConferencesPage } from '../conferences/conferences';
import { ConferenciersPage } from '../conferenciers/conferenciers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  sessions = null;
  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.pages = [
      {title: "Consulter la liste des conférences"  , component: ConferencesPage},
      {title: "Consulter la liste des conférenciers", component: ConferenciersPage}
    ]
  }

  ngOnInit(): void {
    this.storage.get(Constants.SESSIONS).then(sessionsStored => {
      this.sessions = sessionsStored;
    });

  }

  openPage(page: {title: string, component: any}) {
    this.navCtrl.setRoot(page.component);
  }

}
