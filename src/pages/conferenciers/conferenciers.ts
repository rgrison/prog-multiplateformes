import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';
import * as Constants from "../../constants";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ConferenciersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conferenciers',
  templateUrl: 'conferenciers.html',
})
export class ConferenciersPage implements OnInit {

  speakers = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferenciersPage');
  }

  ngOnInit() {
    this.storage.get(Constants.SPEAKERS).then(speakersStored => {
      this.speakers = speakersStored;
    });
  }

}
