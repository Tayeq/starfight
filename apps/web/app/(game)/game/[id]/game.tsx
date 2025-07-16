import { GameResourceType, GameRound } from '@repo/types';
import { getPeople } from '@/queries/people';
import { getStarships } from '@/queries/starships';
import { PeopleList } from '@repo/ui/components/game/resource/people/list';
import { StarshipsList } from '@repo/ui/components/game/resource/starships/list';
import { Person } from '@repo/types';
import { Starship } from '@repo/types';
import { Suspense } from 'react';
import { ResourceListSkeleton } from '@repo/ui/components/game/resource/list';

import { Game as GameEntity } from '@repo/types';
import { getGameRounds } from '@/queries/game';
import {
  EmptyRoundList,
  RoundList,
  RoundListSkeleton,
} from '@repo/ui/components/game/round/list';
import { PlayRound } from './_form/play-round';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

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
      <div className="flex justify-between gap-4 px-4">
        <Link href="/">
          <Button variant={'outline'}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
        </Link>
        <PlayRound gameId={game.id} />
      </div>

      <div className="flex flex-col md:flex-row gap-4 px-4">
        <Suspense fallback={<ResourceListSkeleton />}>
          <ListComponent type={game.resourceType} />
        </Suspense>

        <Suspense fallback={<RoundListSkeleton />}>
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
  if (rounds.length === 0) {
    return <EmptyRoundList />;
  }

  return (
    <div className="space-y-4 w-full">
      <WinCounter rounds={rounds} />
      <RoundList rounds={rounds} />
    </div>
  );
}

function WinCounter({ rounds }: { rounds: GameRound[] }) {
  const leftWins = rounds.filter(
    (round) => round.left.id === round.winner?.id,
  ).length;
  const rightWins = rounds.filter(
    (round) => round.right.id === round.winner?.id,
  ).length;
  return (
    <div className="flex justify-between gap-2">
      <Badge className="bg-blue-500">
        Left Wins: <span className="font-bold">{leftWins}</span>
      </Badge>
      <Badge className="bg-purple-500">
        Right Wins: <span className="font-bold">{rightWins}</span>
      </Badge>
    </div>
  );
}

export { ListComponent, WinCounter };
