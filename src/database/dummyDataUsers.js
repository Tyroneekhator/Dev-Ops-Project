export const users = [
  {
    username: "user_1",
    email: "user1@user.com",
    password: "test123",
    recipes_created: ["Carrot Cake", "papardelle with ragu"],
    recipes_liked: [],
  },
  {
    username: "user_2",
    email: "user2@user.com",
    password: "test1234",
    recipes_created: ["Scrambled Eggs", "Tomato Rissotto"],
    recipes_liked: ["Carrot Cake"],
  },
  {
    username: "user_3",
    email: "user3@user.com",
    password: "test1235",
    recipes_created: [],
    recipes_liked: ["Carrot Cake", "Scrambled Eggs", "Tomato Rissotto"],
  },
];

export const seederUsers = [
  ...users.map((user) => ({
    ...user,
  })),
];

console.log(seederUsers);
