import { type Starship } from '@repo/types';
import { ComponentProps } from 'react';
import { Badge } from '@repo/ui/components/badge';
import { ResourceList, ResourceListSkeleton } from '../list';

interface StarshipsListProps extends ComponentProps<'div'> {
  starships: Starship[];
}

function StarshipsList({ starships, ...props }: StarshipsListProps) {
  return (
    <ResourceList
      items={starships}
      renderItem={(starship) => (
        <div className="flex justify-between items-center gap-2">
          <p className="text-sm font-medium">{starship.name}</p>
          <Badge variant="outline">{starship.crew}</Badge>
        </div>
      )}
      {...props}
    />
  );
}

export { StarshipsList, ResourceListSkeleton as StarshipsListSkeleton };
