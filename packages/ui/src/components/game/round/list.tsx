import { GameRound } from '@repo/types';
import { ComponentProps } from 'react';
import { RoundCard, RoundCardSkeleton } from './card';
import { cn } from '@repo/ui/lib/utils';
import { Card, CardContent } from '../../card';

interface RoundListProps extends ComponentProps<'div'> {
  rounds: GameRound[];
}

const EmptyRoundList = () => {
  return (
    <Card className="text-center text-sm text-gray-500 w-full flex items-center justify-center">
      <CardContent>No rounds yet</CardContent>
    </Card>
  );
};

const RoundList = ({ rounds, className, ...props }: RoundListProps) => {
  return (
    <div className={cn('space-y-4 w-full', className)} {...props}>
      {rounds.map((round) => (
        <RoundCard className="w-full" key={round.id} round={round} />
      ))}
    </div>
  );
};

const RoundListSkeleton = ({
  count = 10,
  ...props
}: ComponentProps<'div'> & { count?: number }) => {
  return (
    <div className="space-y-4 w-full" {...props}>
      {[...Array(count)].map((_, idx) => (
        <RoundCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export { RoundList, RoundListSkeleton, EmptyRoundList };
