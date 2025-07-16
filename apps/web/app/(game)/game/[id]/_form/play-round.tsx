'use client';

import { Button } from '@repo/ui/components/button';
import { useTransition } from 'react';
import { playRound } from '../actions';

const PlayRound = ({ gameId }: { gameId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(() => playRound(gameId));
  };

  return (
    <form action={handleSubmit}>
      <Button
        size={'lg'}
        type="submit"
        className="cursor-pointer"
        disabled={isPending}
      >
        {isPending ? 'Fighting...' : 'Play Round'}
      </Button>
    </form>
  );
};

export { PlayRound };
