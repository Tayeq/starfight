import { ComponentProps } from 'react';
import { Skeleton } from '../../skeleton';

export interface ResourceListProps<T> extends ComponentProps<'div'> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function ResourceList<T>({
  items,
  renderItem,
  ...props
}: ResourceListProps<T>) {
  return (
    <div {...props}>
      {items.map((item, idx) => (
        <div key={idx}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

export function ResourceListItemSkeleton(props: ComponentProps<'div'>) {
  return (
    <div className="flex justify-between items-center gap-2" {...props}>
      <Skeleton className="rounded w-48 h-4" />
      <Skeleton className="rounded w-16 h-4" />
    </div>
  );
}

export function ResourceListSkeleton({
  count = 10,
  ...props
}: ComponentProps<'div'> & { count?: number }) {
  return (
    <div className="flex flex-col gap-2" {...props}>
      {[...Array(count)].map((_, idx) => (
        <ResourceListItemSkeleton key={idx} />
      ))}
    </div>
  );
}
