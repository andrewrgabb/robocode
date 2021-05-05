export class Stat {

    hasSentValidCode: boolean;
    ranking: number;
    total: number;
    hasLog: boolean;

    constructor(hasSentValidCode: boolean, ranking: number, total: number, hasLog: boolean) {
        this.hasSentValidCode = hasSentValidCode;
        this.ranking = ranking;
        this.total = total;
        this.hasLog = hasLog;
    }
}