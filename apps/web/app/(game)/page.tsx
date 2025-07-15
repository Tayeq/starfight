import { GameResourceType } from '@repo/types';
import { NewGameForm } from './form';

export default function GamePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mx-auto text-center">
        Choose your side
      </h1>

      <div className="flex justify-center items-center gap-4 flex-wrap">
        {Object.values(GameResourceType).map((type: GameResourceType) => (
          <NewGameForm type={type} key={type} />
        ))}
      </div>
    </div>
  );
}
