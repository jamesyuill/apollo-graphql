let games = [
  {
    id: '1',
    title: 'Zelda, Tears of the Kingdom',
    platform: ['Switch'],
    rating: 10,
  },
  { id: '2', title: 'Final Fantasy', platform: ['PS5', 'Xbox'], rating: 2 },
  { id: '3', title: 'Elden Ring', platform: ['PS5', 'Xbox', 'PC'], rating: 6 },
  { id: '4', title: 'Mario Kart', platform: ['Switch'], rating: 3 },
];

let authors = [
  { id: '1', name: 'mario', verified: true },
  { id: '2', name: 'yoshi', verified: false },
  { id: '3', name: 'peach', verified: true },
];

let reviews = [
  { id: '1', rating: 9, content: 'lorem ipsum', author_id: '1', game_id: '2' },
  { id: '2', rating: 5, content: 'lorem ipsum', author_id: '2', game_id: '1' },
  { id: '3', rating: 6, content: 'lorem ipsum', author_id: '3', game_id: '3' },
  { id: '4', rating: 1, content: 'lorem ipsum', author_id: '2', game_id: '4' },
  { id: '5', rating: 4, content: 'lorem ipsum', author_id: '1', game_id: '1' },
];

export default { games, authors, reviews };
