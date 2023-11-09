import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../schema/schema.js';
import { resolvers } from '../resolvers/resolvers.js';
const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});
describe('Tests the Game Endpoints', () => {
  test('returns an array', async () => {
    const response = await testServer.executeOperation({
      query: `query GetGames {
        games {
          title
        }
      }`,
    });
    const data = response.body.singleResult.data;

    expect(Array.isArray(data.games)).toBe(true);
  });

  test('returns an array with length 4', async () => {
    const response = await testServer.executeOperation({
      query: `query GetGames {
          games {
            title
          }
        }`,
    });
    const data = response.body.singleResult.data;

    expect(data.games).toHaveLength(4);
  });
  test('returns single game object with id, title, platform, rating properties', async () => {
    const response = await testServer.executeOperation({
      query: `query GetGames {
        games {
          id,
          title,
          platform,
          rating
        }
      }`,
    });
    const games = response.body.singleResult.data.games;

    expect(games[0]).toHaveProperty('id', expect.any(String));
    expect(games[0]).toHaveProperty('title', expect.any(String));
    expect(games[0]).toHaveProperty('platform', expect.any(Object));
    expect(games[0]).toHaveProperty('rating', expect.any(Number));
  });
});

describe('Tests the Review Endpoints', () => {
  test('returns an array of reviews', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetReviews {
        reviews {
           id,
           rating,
           content
         }
       }
        
        `,
    });
    const reviews = response.body.singleResult.data.reviews;
    expect(Array.isArray(reviews)).toBe(true);
  });
  test('returns an array of reviews with the length 5', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetReviews {
        reviews {
           id,
           rating,
           content
         }
       }
        `,
    });
    const reviews = response.body.singleResult.data.reviews;
    expect(reviews).toHaveLength(5);
  });
  test('returns single review object with the properties id, rating, content', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetReviews {
        reviews {
           id,
           rating,
           content
         }
       }
        
        `,
    });
    const reviews = response.body.singleResult.data.reviews;
    expect(reviews[0]).toHaveProperty('id', expect.any(String));
    expect(reviews[0]).toHaveProperty('rating', expect.any(Number));
    expect(reviews[0]).toHaveProperty('content', expect.any(String));
  });
});

describe('Tests the Author Endpoints', () => {
  test('returns an array of authors', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetAuthors {
          authors {
             id,
             name,
             verified
           }
         }
          
          `,
    });
    const authors = response.body.singleResult.data.authors;
    expect(Array.isArray(authors)).toBe(true);
  });
  test('returns an array of authors with the length 3', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetAuthors {
        authors {
           id,
           name,
           verified
         }
       }
          `,
    });
    const authors = response.body.singleResult.data.authors;
    expect(authors).toHaveLength(3);
  });
  test('returns single author object with the properties id, name, verified', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetAuthors {
        authors {
           id,
           name,
           verified
         }
       }
          
          `,
    });
    const authors = response.body.singleResult.data.authors;
    expect(authors[0]).toHaveProperty('id', expect.any(String));
    expect(authors[0]).toHaveProperty('name', expect.any(String));
    expect(authors[0]).toHaveProperty('verified', expect.any(Boolean));
  });
});

describe('Tests the single Review Endpoint', () => {
  test('returns a single review object', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetSingleReview($id:ID!) {
          review(id:$id) {
            id,
            content,
            rating,
          }
        } 
      
      `,
      variables: { id: '1' },
    });

    const review = response.body.singleResult.data.review;
    expect(typeof review).toBe('object');
  });
  test('returns a single review object with the properties id, content and rating', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetSingleReview($id:ID!) {
          review(id:$id) {
            id,
            content,
            rating,
          }
        } 
      
      `,
      variables: { id: '1' },
    });

    const review = response.body.singleResult.data.review;
    expect(review).toHaveProperty('id', expect.any(String));
    expect(review).toHaveProperty('content', expect.any(String));
    expect(review).toHaveProperty('rating', expect.any(Number));
  });
});

describe('Tests the single Game Endpoint', () => {
  test('returns a single game object', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetSingleGame($id:ID!) {
          game(id:$id) {
            id,
            title,
            platform,
            rating,
          }
        } 
      
      `,
      variables: { id: '1' },
    });

    const game = response.body.singleResult.data.game;
    expect(typeof game).toBe('object');
  });
  test('returns a single game object with the properties id, title, platform and rating', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetSingleGame($id:ID!) {
          game(id:$id) {
            id,
            title,
            platform,
            rating,
          }
        } 
      
      `,
      variables: { id: '1' },
    });

    const game = response.body.singleResult.data.game;
    expect(game).toHaveProperty('id', expect.any(String));
    expect(game).toHaveProperty('title', expect.any(String));
    expect(game).toHaveProperty('platform', expect.any(Object));
    expect(game).toHaveProperty('rating', expect.any(Number));
  });
});

describe('Tests the single Author Endpoint', () => {
  test('returns a single author object', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetSingleAuthor($id:ID!) {
          author(id:$id) {
            id,
            name,
            verified,
         
          }
        } 
      
      `,
      variables: { id: '1' },
    });

    const author = response.body.singleResult.data.author;
    expect(typeof author).toBe('object');
  });
  test('returns a single author object with the properties id, name and verified', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetSingleGame($id:ID!) {
          author(id:$id) {
            id,
            name,
            verified,
           
          }
        } 
      
      `,
      variables: { id: '1' },
    });

    const author = response.body.singleResult.data.author;
    expect(author).toHaveProperty('id', expect.any(String));
    expect(author).toHaveProperty('name', expect.any(String));
    expect(author).toHaveProperty('verified', expect.any(Boolean));
  });
});

describe('Tests the Game endpoint to return a relational Review', () => {
  test('Returns an array of review objects', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetGameReviewsById($id:ID!) {
          game(id:$id) {
            reviews{
              id,
              content,
              rating,
            }
          }
        }
      `,
      variables: { id: '1' },
    });

    const reviews = response.body.singleResult.data.game.reviews;
    expect(Array.isArray(reviews)).toBe(true);
  });
  test('Returns a single game reviews object with the properties id, content and rating', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetGameReviewsById($id:ID!) {
          game(id:$id) {
            reviews{
              id,
              content,
              rating,
            }
          }
        }
      `,
      variables: { id: '1' },
    });

    const reviews = response.body.singleResult.data.game.reviews;
    expect(reviews[0]).toHaveProperty('id', expect.any(String));
    expect(reviews[0]).toHaveProperty('content', expect.any(String));
    expect(reviews[0]).toHaveProperty('rating', expect.any(Number));
  });
});

describe('Tests the Author endpoint to return a relational Review', () => {
  test('Returns an array of review objects', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetAuthorReviewsById($id:ID!) {
          author(id:$id) {
            reviews{
              id,
              rating,
              content,
            }
          }
        }
      `,
      variables: { id: '1' },
    });

    const reviews = response.body.singleResult.data.author.reviews;
    expect(Array.isArray(reviews)).toBe(true);
  });
  test('Returns a single author review object with the properties id, content and rating', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetAuthorReviewsById($id:ID!) {
          author(id:$id) {
            reviews{
              id,
              content,
              rating,
            }
          }
        }
      `,
      variables: { id: '1' },
    });

    const reviews = response.body.singleResult.data.author.reviews;
    expect(reviews[0]).toHaveProperty('id', expect.any(String));
    expect(reviews[0]).toHaveProperty('content', expect.any(String));
    expect(reviews[0]).toHaveProperty('rating', expect.any(Number));
  });
});

describe('Tests the Review endpoint to return a relational Author', () => {
  test('Returns an author object', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetReviewAuthorById($id:ID!) {
          review(id:$id) {
            author{
              name,
            }
          }
        }
      `,
      variables: { id: '1' },
    });
    const author = response.body.singleResult.data.review.author;
    expect(typeof author).toBe('object');
  });
  test('Returns a single review author object with the properties id, name and verified', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetReviewAuthorById($id:ID!) {
          review(id:$id) {
            author{
              id,
              name,
              verified,
            }
          }
        }
      `,
      variables: { id: '1' },
    });

    const author = response.body.singleResult.data.review.author;
    expect(author).toHaveProperty('id', expect.any(String));
    expect(author).toHaveProperty('name', expect.any(String));
    expect(author).toHaveProperty('verified', expect.any(Boolean));
  });
});

describe('Tests the Review endpoint to return a relational Game', () => {
  test('Returns a Game object', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetReviewGameById($id:ID!) {
          review(id:$id) {
            game{
              id,
              title,
              platform,
              rating,
            }
          }
        }
      `,
      variables: { id: '1' },
    });
    const game = response.body.singleResult.data.review.game;
    expect(typeof game).toBe('object');
  });
  test('Returns a single review game object with the properties id, title, platform and rating', async () => {
    const response = await testServer.executeOperation({
      query: `
        query GetReviewGameById($id:ID!) {
          review(id:$id) {
            game{
              id,
              title,
              platform,
              rating,
            }
          }
        }
      `,
      variables: { id: '1' },
    });

    const game = response.body.singleResult.data.review.game;
    expect(game).toHaveProperty('id', expect.any(String));
    expect(game).toHaveProperty('title', expect.any(String));
    expect(game).toHaveProperty('platform', expect.any(Object));
    expect(game).toHaveProperty('rating', expect.any(Number));
  });
});

describe('Tests for Mutation', () => {
  test('should return an array', async () => {
    const response = await testServer.executeOperation({
      query: `
      mutation DeleteGame($id: ID!){
        deleteGame(id: $id) {
          id,
          title,
          platform,
        }
      }
      `,
      variables: { id: '2' },
    });

    const gamesLeft = response.body.singleResult.data.deleteGame;

    expect(Array.isArray(gamesLeft)).toBe(true);
  });
  test('should return an array of length 3', async () => {
    const response = await testServer.executeOperation({
      query: `
      mutation DeleteGame($id: ID!){
        deleteGame(id: $id) {
          id,
          title,
          platform,
        }
      }
      `,
      variables: { id: '2' },
    });

    const gamesLeft = response.body.singleResult.data.deleteGame;

    expect(gamesLeft).toHaveLength(3);
  });
});
