export class Ranking {

    name: string;
    displayName: string;
    elo: string;
    medianElo: string;
    submissionDateNo: string; // - or iso

    constructor(name: string, displayName: string, elo: string, medianElo:string, submissionDateNo: string) {
        this.name = name;
        this.displayName = displayName;
        this.elo = elo;
        this.medianElo = medianElo;
        this.submissionDateNo = submissionDateNo;
    }
}