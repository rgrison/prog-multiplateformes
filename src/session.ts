export class Session {
    
    private id: number;
    private title: string;
    private titleMobile: string;
    private image: string;
    private type: string;
    private speakers: Array<number> = []; // by default there's no speaker

    constructor(sessionJson) {
        this.id = sessionJson['id'];
        this.title = sessionJson['title'];
        this.titleMobile = sessionJson['titleMobile'];
        this.image = sessionJson['image'];
        this.type = sessionJson['type'];

        // check if there are speakers before getting them
        if (sessionJson.hasOwnProperty('speakers')) {
            this.speakers = sessionJson['speakers'];
        }
    }
}