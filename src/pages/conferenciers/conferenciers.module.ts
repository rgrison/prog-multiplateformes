import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferenciersPage } from './conferenciers';

@NgModule({
  declarations: [
    ConferenciersPage,
  ],
  imports: [
    IonicPageModule.forChild(ConferenciersPage),
  ],
})
export class ConferenciersPageModule {}
