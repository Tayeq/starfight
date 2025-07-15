"use server";
import { GameResourceType } from '@repo/types';
import { createGame as createGameAction } from "@/queries/game";

export async function createGame(type: GameResourceType) {
    try {
        const id = await createGameAction(type);
        return { id };
    } catch (error: any) {
        return { error: error?.message || "Unknown error" };
    }
} 