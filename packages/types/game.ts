import { Person } from "./person";
import { Starship } from "./starship";

export type GameResource = Person | Starship;

export enum GameResourceType {
    PERSON = 'PERSON',
    STARSHIP = 'STARSHIP',
}

export interface GameRound {
    id: string;
    left: GameResource;
    right: GameResource;
    winner: GameResource | null;
    createdAt: Date;
}

export interface Game {
    id: string;
    resourceType: GameResourceType;
    createdAt: Date;
}