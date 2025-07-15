import { GameResourceType, GameRound } from '@repo/types';
import { getPeople } from '@/queries/people';
import { getStarships } from '@/queries/starships';
import { PeopleList } from '@repo/ui/components/game/resource/people/list';
import { StarshipsList } from '@repo/ui/components/game/resource/starships/list';
import { Person } from '@repo/types';
import { Starship } from '@repo/types';
import { Suspense } from 'react';
import { ResourceListSkeleton } from '@repo/ui/components/game/resource/list';
import { revalidatePath } from 'next/cache';

import { Button } from '@repo/ui/components/button';
import { Game as GameEntity } from '@repo/types';
import { playRound } from './actions';
import { getGameRounds } from '@/queries/game';

const getReourceMap = {
  [GameResourceType.PERSON]: getPeople,
  [GameResourceType.STARSHIP]: getStarships,
};

interface GameProps {
  game: GameEntity;
}

export default async function Game({ game }: GameProps) {
  return (
    <div className="space-y-4">
      <PlayRound gameId={game.id} />

      <div className="flex gap-4 ">
        <Suspense fallback={<ResourceListSkeleton />}>
          <ListComponent type={game.resourceType} />
        </Suspense>

        <Suspense>
          <GameRounds gameId={game.id} />
        </Suspense>
      </div>
    </div>
  );
}

async function ListComponent({ type }: { type: GameResourceType }) {
  const getResource = getReourceMap[type];
  const resource = await getResource();

  if (type === GameResourceType.PERSON) {
    return <PeopleList people={resource as Person[]} />;
  }
  if (type === GameResourceType.STARSHIP) {
    return <StarshipsList starships={resource as Starship[]} />;
  }
  return null;
}

async function GameRounds({ gameId }: { gameId: string }) {
  const rounds = await getGameRounds(gameId);
  return (
    <div className="flex flex-col items-center gap-4">
      <p>Game Result</p>
      {rounds?.map((round) => (
        <div key={round.id}>
          <p>Round {round.id}</p>
          <p>Winner: {round.winnerId}</p>
        </div>
      ))}
    </div>
  );
}

function PlayRound({ gameId }: { gameId: string }) {
  async function playRoundAction() {
    'use server';
    await playRound(gameId);
    revalidatePath(`/game/${gameId}`);
  }

  return (
    <form action={playRoundAction}>
      <Button type="submit">Play Round</Button>
    </form>
  );
}

export { ListComponent };
