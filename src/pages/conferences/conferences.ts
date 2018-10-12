import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';
import * as Constants from "../../constants";
import { Storage } from '@ionic/storage';
import { ConferencePage } from '../conference/conference';


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

  sessions = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferencesPage');
  }

  ngOnInit() {
    this.storage.get(Constants.SESSIONS).then(sessionsStored => {
      this.sessions = sessionsStored;
    });
  }

  openSessionDescription(session) {
    this.navCtrl.push(ConferencePage, session);
  }
}
