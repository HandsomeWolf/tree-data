/* eslint-disable unicorn/prefer-module */
module.exports = {
  id: 1,
  children: [
    { id: 2 },
    {
      id: 3,
      children: [
        {
          id: 4,
          children: [{ id: 5, children: [{ id: 6 }] }, { id: 7 }],
        },
      ],
    },
  ],
};
