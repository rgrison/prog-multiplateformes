class Session {
    
    private id: number;
    private title: string;
    private titleMobile: string;
    private image: string;
    private type: string;

    constructor(sessionJson) {
        this.id = sessionJson['id'];
        this.title = sessionJson['title'];
        this.titleMobile = sessionJson['titleMobile'];
        this.image = sessionJson['image'];
        this.type = sessionJson['type'];
    }
}