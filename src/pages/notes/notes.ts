import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Notes } from '../../notes';
import * as Constants from "../../constants";

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  public notes: Notes;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    var sessionId = navParams.get('sessionId');
    var sessionTitle = navParams.get('sessionTitle');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  private loadNotes(sessionId, sessionTitle) {
    this.storage.get(Constants.NOTES).then(notesStored => {
      var notesList = notesStored;
      var notesJson = {
        'text' : "",
        'sessionTitle': sessionTitle,
        'sessionId' : sessionId
      };

      if (notesList) {
        notesList.forEach(notesInstance => {
          
          if (notesInstance.sessionId == sessionId) {
            notesJson['text'] = notesInstance.text;
          }
        });
      }
      this.notes = new Notes(notesJson);
    });
  }

}
