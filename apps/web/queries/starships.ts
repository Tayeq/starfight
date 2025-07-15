import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import { type Starship } from '@repo/types';

const getStarships = async (): Promise<Starship[]> => {
  const { data } = await client.query<{ starships: Starship[] }>({
    query: gql`
      query {
        starships {
          id, name, crew
        }
      }
    `,
  });
  return data.starships;
};

export { getStarships };