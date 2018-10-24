import { Storage } from '@ionic/storage';
import * as Constants from "./constants";
import { Session } from './session';
import { Inject, OnInit } from '@angular/core';
import { ReflectiveInjector } from '@angular/core';


export class Speaker {
    public id: number;
    public name: string;
    public bio: string;
    public company: string;
    public photoUrl: string;
    public social: Array<{name: string, link: string}> = [];

    constructor(speaker: JSON) {
        this.id      = Number(speaker['id']);
        this.name    = speaker['name'   ];
        this.bio     = speaker['bio'    ];
        this.company = speaker['company'];
        this.photoUrl = 'https://devfest.gdgnantes.com/' + speaker['photoUrl'];
        
        this.social = [];
        let socials = speaker['socials'];
        for (let i in socials) {
            let socialNetwork = socials[i];
            this.social.push({name: socialNetwork['name'], link: socialNetwork['link']});
        }
    }

}