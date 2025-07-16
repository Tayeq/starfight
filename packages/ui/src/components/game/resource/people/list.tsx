import { type Person } from '@repo/types';
import { ComponentProps } from 'react';
import { Badge } from '@repo/ui/components/badge';
import { ResourceList, ResourceListSkeleton } from '../list';

interface PeopleListProps extends ComponentProps<'div'> {
  people: Person[];
}

function PeopleList({ people, ...props }: PeopleListProps) {
  return (
    <ResourceList
      items={people}
      renderItem={(person) => (
        <div className="flex justify-between items-center gap-2 max-h-[20vh] overflow-y-auto">
          <p className="text-sm font-medium">{person.name}</p>
          <Badge className="min-w-12" variant="outline">
            {person.mass}
          </Badge>
        </div>
      )}
      {...props}
    />
  );
}

export { PeopleList, ResourceListSkeleton as PeopleListSkeleton };
