'use client';

import { ResourceCard } from '@repo/ui/components/game/resource/card';
import { GameResourceType } from '@repo/types';
import { createGame } from './actions';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const initialState = { id: undefined, error: undefined };

export function NewGameForm({ type }: { type: GameResourceType }) {
  const [state, formAction] = useActionState(
    () => createGame(type),
    initialState,
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    } else if (state?.id) {
      router.push(`/game/${state.id}`);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <SubmitButton type={type} />
    </form>
  );
}

const SubmitButton = ({ type }: { type: GameResourceType }) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="cursor-pointer" disabled={pending}>
      <ResourceCard type={type} />
    </button>
  );
};
