import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Speaker } from '../../speaker';

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
export class SpeakerPage {

  public speaker: Speaker;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.speaker = navParams.get('speaker');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakerPage');
  }

}
