import { Person } from 'person/entities/person.entity';
import { Starship } from 'starship/entities/starship.entity';

import { CreatePersonDto } from 'person/dto/create-person.dto';
import { UpdatePersonDto } from 'person/dto/update-person.dto';

import { CreateStarshipDto } from 'starship/dto/create-starship.dto';
import { UpdateStarshipDto } from 'starship/dto/update-starship.dto';

export const links = {
  dto: {
    CreatePersonDto,
    UpdatePersonDto,
    CreateStarshipDto,
    UpdateStarshipDto,
  },
  entities: {
    Person,
    Starship,
  },
};
