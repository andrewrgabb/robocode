export class Stat {

    hasSentValidCode: boolean;
    ranking: number;
    total: number;

    constructor(hasSentValidCode: boolean, ranking: number, total: number) {
        this.hasSentValidCode = hasSentValidCode;
        this.ranking = ranking;
        this.total = total;
    }
}