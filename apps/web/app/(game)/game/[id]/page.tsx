import { getGame } from '@/queries/game';
import Game from './game';
import { notFound } from 'next/navigation';

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  try {
    const game = await getGame(id);
    if (!game) {
      return notFound();
    }
    return <Game game={game} />;
  } catch (error) {
    console.error(error);
    return notFound();
  } 
}
