import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import { type Person } from '@repo/types';

const getPeople = async (): Promise<Person[]> => {
    const { data } = await client.query<{ people: Person[] }>({
        query: gql`
        query {
          people {
            id, name, mass
          }
        }
      `,
    });
    return data.people;
};

export { getPeople };