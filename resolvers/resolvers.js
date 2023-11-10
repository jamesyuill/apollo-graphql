import db from '../db/fakeData.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      const game = db.games.find((game) => args.id === game.id);
      if (game) {
        return game;
      } else {
        throw new GraphQLError(`There are no games with the ID: ${args.id}`, {
          extensions: {
            code: 'GAME_NOT_FOUND',
          },
        });
      }
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      const review = db.reviews.find((review) => args.id === review.id);
      if (review) {
        return review;
      } else {
        throw new GraphQLError(`There are no reviews with the ID: ${args.id}`, {
          extensions: {
            code: 'REVIEW_NOT_FOUND',
          },
        });
      }
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      const author = db.authors.find((author) => args.id === author.id);

      if (author) {
        return author;
      } else {
        throw new GraphQLError(`There are no authors with the ID: ${args.id}`, {
          extensions: {
            code: 'AUTHOR_NOT_FOUND',
          },
        });
      }
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => parent.author_id === author.id);
    },
    game(parent) {
      return db.games.find((game) => parent.game_id === game.id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      const gameIndex = db.games.find((game) => game.id === args.id);
      if (gameIndex) {
        return db.games.filter((game) => game.id !== args.id);
      } else {
        throw new GraphQLError(`There are no games with the ID: ${args.id}`, {
          extensions: {
            code: 'GAME_NOT_FOUND',
          },
        });
      }
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000),
      };
      db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      // find the game - if it exists edit it and return updated game
      // if it does not exist rthrow error
      const gameIndex = db.games.find((game) => game.id === args.id);

      if (gameIndex) {
        db.games = db.games.map((game) => {
          if (game.id === args.id) {
            return { ...game, ...args.edits };
          }
          return game;
        });

        return db.games.find((game) => game.id === args.id);
      } else {
        throw new GraphQLError(`There are no games with the ID: ${args.id}`, {
          extensions: {
            code: 'GAME_NOT_FOUND',
          },
        });
      }
    },
  },
};
