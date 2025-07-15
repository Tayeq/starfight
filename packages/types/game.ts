export enum GameResourceType {
    PERSON = 'PERSON',
    STARSHIP = 'STARSHIP',
}

export interface GameRound {
    id: string;
    gameId: string;
    leftId: string;
    rightId: string;
    leftValue: number;
    rightValue: number;
    winnerId?: string;
    createdAt: Date;
}

export interface Game {
    id: string;
    resourceType: GameResourceType;
    createdAt: Date;
    rounds?: GameRound[];
}