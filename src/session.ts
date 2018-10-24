export class Session {
    
    public id: number;
    public title: string;
    public titleMobile: string;
    public description: string;
    public image: string;
    public type: string;
    public language: string;
    public category: string;
    public complexity: string;
    public track: string;
    public tags: Array<string> = [];
    public speakers: Array<number> = [];

    constructor(sessionJson) {
        this.id = sessionJson['id'];
        this.title = sessionJson['title'];
        this.titleMobile = sessionJson['titleMobile'];
        this.description = sessionJson['description'];
        this.image = sessionJson['image'];
        this.type = sessionJson['type'];
        this.language = sessionJson['language'];
        this.category = sessionJson['category'];
        this.complexity = sessionJson['complexity'];
        
        let trackJson = sessionJson['track']
        if (trackJson) {
            this.track = trackJson['title'];
        }

        let tagsJson = sessionJson['tags']        
        if (tagsJson) {
            tagsJson.forEach(tag => {
                this.tags.push(tag);
            });
        }

        let speakersJson = sessionJson['speakers'];
        if (speakersJson) {
            speakersJson.forEach(speakerId => {
                this.speakers.push(speakerId);
            });
        }
    }
}