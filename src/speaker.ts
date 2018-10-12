class Speaker {
    constructor(private id: number, public name: string, public bio: string, public company: string, public social: Array<{name: string, link: string}>) {

    }

    getSessions() {
        // TODO: get the sessions of the speaker
        //      (get the id and then the title + link to the session view when available)
    }

}