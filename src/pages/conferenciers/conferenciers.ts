import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';
import * as Constants from "../../constants";
import { Storage } from '@ionic/storage';
import { Speaker } from '../../speaker';

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

  public speakers: Array<Speaker> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }
  
  ngOnInit() {
    this.storage.get(Constants.SPEAKERS).then(speakersStored => {
      this.speakers = speakersStored;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferenciersPage');
  }

  // redirects to the page with the speaker details
  showSpeakerDetails(speakerName) {
    this.navCtrl.push('SpeakerPage', {'speaker': speakerName});
  }

}
