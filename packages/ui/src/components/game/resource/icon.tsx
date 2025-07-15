import { LucideIcon, LucideProps } from '@repo/ui/icons/lucide';
import { Rocket, Users } from '@repo/ui/icons/lucide';

import { GameResourceType } from '@repo/types';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@repo/ui/lib/utils';

const iconMap: Record<GameResourceType, LucideIcon> = {
  [GameResourceType.STARSHIP]: Rocket,
  [GameResourceType.PERSON]: Users,
};

const variants = cva('size-24', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-8',
      lg: 'size-12',
      xl: 'size-16',
    },
  },
});
interface ResourceIconProps
  extends Omit<LucideProps, 'size'>,
    VariantProps<typeof variants> {
  type: GameResourceType;
}

export const ResourceIcon = ({
  type,
  size = 'md',
  className,
  ...props
}: ResourceIconProps) => {
  const Icon = iconMap[type];

  return <Icon {...props} className={cn(variants({ size }), className)} />;
};
