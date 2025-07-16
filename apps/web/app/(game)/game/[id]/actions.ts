'use server';

import { gql } from "@apollo/client";
import { client } from "@/lib/apollo";
import { revalidatePath, revalidateTag } from "next/cache";

export async function playRound(gameId: string) {
  const { data } = await client.mutate({
    mutation: gql`
          mutation PlayRound($data: PlayRoundDto!) {
            playRound(data: $data) {
              id
            }
          }
        `,
    variables: { data: { gameId } },
  });

  revalidatePath(`/game/${gameId}`);
  revalidateTag(`game-rounds-${gameId}`);
  return data?.playRound?.id;
}   