export class Ranking {

    name: string;
    displayName: string;
    elo: string;
    submissionDateNo: string; // - or iso

    constructor(name: string, displayName: string, elo: string, submissionDateNo: string) {
        this.name = name;
        this.displayName = displayName;
        this.elo = elo;
        this.submissionDateNo = submissionDateNo;
    }
}