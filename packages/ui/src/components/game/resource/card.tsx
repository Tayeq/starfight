import { GameResourceType } from '@repo/types';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@repo/ui/components/card';
import { ComponentProps } from 'react';
import { ResourceIcon } from './icon';

interface ResourceCardProps extends ComponentProps<typeof Card> {
  type: GameResourceType;
}

export const ResourceCard = ({ type, ...props }: ResourceCardProps) => {
  return (
    <Card className="min-w-48" {...props}>
      <CardHeader>
        <CardTitle className="text-center">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ResourceIcon type={type} />
      </CardContent>
    </Card>
  );
};
