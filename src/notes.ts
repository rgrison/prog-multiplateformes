import { Session } from "./session";

export class Notes {
    
    public text: string;
    public sessionTitle: Session;
    public sessionId: number;

    constructor(notesJson) {
        this.text = notesJson['text'];
        this.sessionTitle = notesJson['sessionTitle'];
        this.sessionId = notesJson['sessionId'];
    }
}