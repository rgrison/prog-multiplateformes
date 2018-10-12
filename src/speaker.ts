export class Speaker {
    private id: number;
    public name: string;
    public bio: string;
    public company: string;
    public social: Array<{name: string, link: string}>;

    constructor(speaker: JSON) {
        this.id      = speaker['id'];
        this.name    = speaker['name'];
        this.bio     = speaker['bio'];
        this.company = speaker['company'];
        
        this.social = [];
        let socials = speaker['socials'];
        for (let i in socials) {
            let socialNetwork = socials[i];
            this.social.push({name: socialNetwork['name'], link: socialNetwork['link']});
        }
    }

    getSessions() {
        // TODO: get the sessions of the speaker
        //      (get the id and then the title + link to the session view when available)
    }

}