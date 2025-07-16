import { client } from '@/lib/apollo';
import { gql } from '@apollo/client';
import { GameResourceType, GameRound } from '@repo/types';

async function createGame(resourceType: GameResourceType) {
  const { data } = await client.mutate({
    mutation: gql`
    mutation CreateGame($resourceType: ResourceType!) {
      createGame(data: { resourceType: $resourceType }) {
        id
      }
    }
    `,
    variables: { resourceType },
    fetchPolicy: 'no-cache',
  });
  return data?.createGame?.id;
}

async function playRound(gameId: string) {
  const { data } = await client.mutate({
    mutation: gql`
    mutation PlayRound($gameId: ID!) {
      playRound(gameId: $gameId) {
        id
      }
    }
    `,
    variables: { gameId },
    context: {
      fetchOptions: {
        next: { tags: [`game-rounds-${gameId}`] },
      },
    },
  });
  return data?.playRound?.id;
}

async function getGameRounds(gameId: string): Promise<GameRound[]> {
  const { data } = await client.query({
    query: gql`
    query GetGameRounds($gameId: ID!) {
      game(id: $gameId) {
        rounds {
          id
          left {
            ... on Person {
              id
              name
              mass
            }
            ... on Starship {
              id
              name
              crew
            }
          }
          right {
            ... on Person {
              id
              name
              mass
            }
            ... on Starship {
              id
              name
              crew
            }
          }
          winner {
            ... on Person {
              id
              name
              mass
            }
            ... on Starship {
              id
              name
              crew
            }
          }
          createdAt
        }
      }
    }
    `,
    variables: { gameId },
    fetchPolicy: 'no-cache',
  });
  return data?.game?.rounds ?? [];
}

async function getGame(id: string) {
  const { data } = await client.query({
    query: gql`
    query GetGame($id: ID!) {
      game(id: $id) {
        id
        resourceType
        createdAt
      }
    }
  `,
    variables: { id },
  });

  return data?.game;
}

async function listGames() {
  const { data } = await client.query({
    query: gql`
    query ListGames {
      games {
        id
      }
    }
  `,
  });
  return data?.games;
}


export { createGame, playRound, getGame, listGames, getGameRounds };