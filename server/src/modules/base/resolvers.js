export default {
  Query: {
    greet: async () => greets[Math.floor(Math.random() * greets.length)],
  },
}

const greets = [
  'Hello, World!',
  'Just click and party!',
  '@VŠE',
  'Lorem ipsum...',
  'The future is here!',
  'Better than the other one!',
  'WOOP WOOP!!!',
]
