import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnInit } from '@angular/core';
import * as Constants from "../../constants";
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  sessions = null;

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  ngOnInit(): void {
    this.storage.get(Constants.SESSIONS).then( sessionsStored => {
      this.sessions = sessionsStored;
    });

  }

}
