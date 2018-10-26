import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConferencesPage } from '../pages/conferences/conferences';
import { ConferenciersPage } from '../pages/conferenciers/conferenciers';
import { ConferencePage } from '../pages/conference/conference';

import {IonicStorageModule } from '@ionic/storage'
import { SpeakerPage } from '../pages/speaker/speaker';
import { NotesPage } from '../pages/notes/notes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ConferencesPage,
    ConferencePage,
    ConferenciersPage,
    // SpeakerPage,
    NotesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ConferencesPage,
    ConferencePage,
    ConferenciersPage,
    // SpeakerPage,
    NotesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
