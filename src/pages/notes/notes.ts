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

  public notes: Notes = new Notes({});

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    var sessionId = navParams.get('sessionId');
    var sessionTitle = navParams.get('sessionTitle');
    this.loadNotes(sessionId, sessionTitle);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  private loadNotes(sessionId, sessionTitle) {
    console.log("Loading notes...")
    
    this.storage.get(Constants.NOTES).then(notesStoredList => {
      var notesJson = {
        'text' : "",
        'sessionTitle': sessionTitle,
        'sessionId' : sessionId
      };
      console.log("Checkpoint");
      console.log(notesStoredList);
      if (notesStoredList) {
        var notesStored = notesStoredList['' + sessionId];

        if (notesStored) {
          notesJson['text'] = notesStored.text;
        }
      }
      console.log("Text loaded : '" + notesJson['text'] + "'");
      this.notes = new Notes(notesJson);
    });
  }

  private saveNotes() {
    console.log("Saving notes...")

    this.storage.get(Constants.NOTES).then(notesStored => {
      console.log("Notes saved : '" + this.notes.text + "' ; " + this.notes.sessionTitle + " ; " + this.notes.sessionId);
      notesStored[this.notes.sessionId] = this.notes;
      this.storage.set(Constants.NOTES, notesStored);
      if (this.navCtrl.canGoBack) {
        this.navCtrl.pop();
      }
    });
  }
}
