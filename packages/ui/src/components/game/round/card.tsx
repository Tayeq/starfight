import { GameResource, GameRound } from '@repo/types';
import { ComponentProps } from 'react';
import { Card, CardContent } from '@repo/ui/components/card';
import { Skeleton } from '../../skeleton';
import { Badge } from '@repo/ui/components/badge';
import { cn } from '@repo/ui/lib/utils';

interface RoundCardProps extends ComponentProps<typeof Card> {
  round: GameRound;
}

const RoundCard = ({ round, ...props }: RoundCardProps) => {
  return (
    <Card {...props}>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between relative items-center gap-12 md:gap-2">
          <GameResourceItem
            resource={round.left}
            position="left"
            isWinner={
              round.winner?.id === round.left.id || round.winner === null
            }
          />
          <span className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2">
            vs
          </span>
          <GameResourceItem
            resource={round.right}
            position="right"
            isWinner={
              round.winner?.id === round.right.id || round.winner === null
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

const RoundCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between relative items-center gap-2">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-6" />
        </div>
      </CardContent>
    </Card>
  );
};

const GameResourceItem = ({
  resource,
  position,
  isWinner,
}: {
  resource: GameResource;
  position: 'left' | 'right';
  isWinner?: boolean;
}) => {
  return (
    <div className="flex justify-between relative items-center gap-2">
      <p
        className={cn(
          position === 'left' ? 'order-2' : 'order-1',
          isWinner && 'text-green-500',
        )}
      >
        {resource.name}
      </p>
      <div className={position === 'left' ? 'order-1' : 'order-2'}>
        {'mass' in resource && (
          <Badge className={cn(isWinner && 'bg-green-500')}>
            {resource.mass}
          </Badge>
        )}
        {'crew' in resource && (
          <Badge className={cn(isWinner && 'bg-green-500')}>
            {resource.crew}
          </Badge>
        )}
      </div>
    </div>
  );
};

export { RoundCard, RoundCardSkeleton };
