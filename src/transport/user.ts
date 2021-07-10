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

export interface Competitor {
    name: string;
    university: string;
    unikey: string;
    yeardeg: string;
}

export class TeamDetails {

    teamName: string;
    competitors: Competitor[];

    constructor(teamName: string, competitors: Competitor[]) {
        this.teamName = teamName;
        this.competitors = competitors;
    }
}

