import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../schema/schema.js';
import { resolvers } from '../resolvers/resolvers.js';

let testServer;

beforeAll(() => {
  testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
});

afterAll(() => {
  testServer.stop();
});
describe('Tests Error Handling: GetGameById', () => {
  test('If given a non-existant ID returns error message and code', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetGameById($id:ID!) {
        game(id:$id) {
          title,
        }
      }
        `,
      variables: { id: '20' },
    });
    const message = response.body.singleResult.errors[0].message;
    const errorCode = response.body.singleResult.errors[0].extensions.code;
    expect(message).toBe('There are no games with the ID: 20');
    expect(errorCode).toBe('GAME_NOT_FOUND');
  });
});

describe('Tests Error Handling: GetReviewById', () => {
  test('If given a non-existant ID returns error message and code', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetReviewById($id:ID!) {
          review(id:$id) {
            content,
          }
        }
          `,
      variables: { id: '20' },
    });
    const message = response.body.singleResult.errors[0].message;
    const errorCode = response.body.singleResult.errors[0].extensions.code;
    expect(message).toBe('There are no reviews with the ID: 20');
    expect(errorCode).toBe('REVIEW_NOT_FOUND');
  });
});

describe('Tests Error Handling: GetAuthorById', () => {
  test('If given a non-existant ID returns error message and code', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetAuthorById($id:ID!) {
          author(id:$id) {
            name,
          }
        }
          `,
      variables: { id: '20' },
    });
    const message = response.body.singleResult.errors[0].message;
    const errorCode = response.body.singleResult.errors[0].extensions.code;
    expect(message).toBe('There are no authors with the ID: 20');
    expect(errorCode).toBe('AUTHOR_NOT_FOUND');
  });
});

describe('Tests Error Handling: DeleteGameById', () => {
  test('If given a non-existant ID returns error message and code', async () => {
    const response = await testServer.executeOperation({
      query: `
          mutation DeleteGameById($id:ID!) {
            deleteGame(id:$id) {
              title,
            }
          }
            `,
      variables: { id: '20' },
    });
    const message = response.body.singleResult.errors[0].message;
    const errorCode = response.body.singleResult.errors[0].extensions.code;
    expect(message).toBe('There are no games with the ID: 20');
    expect(errorCode).toBe('GAME_NOT_FOUND');
  });
});

describe('Tests Error Handling: UpdateGameById', () => {
  test('If given a non-existant ID returns error message and code', async () => {
    const response = await testServer.executeOperation({
      query: `
            mutation UpdateGameById($id:ID!, $edits: EditGameInput!) {
              updateGame(id:$id, edits: $edits) {
                id,
                title,
                platform,
                rating,
              }
            }
              `,
      variables: {
        edits: {
          title: 'Edited Game Input',
        },
        id: '20',
      },
    });
    const message = response.body.singleResult.errors[0].message;
    const errorCode = response.body.singleResult.errors[0].extensions.code;
    expect(message).toBe('There are no games with the ID: 20');
    expect(errorCode).toBe('GAME_NOT_FOUND');
  });
});
