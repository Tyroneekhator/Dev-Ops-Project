export const recipes = [
  {
    title: "Pancakes",
    author_id: "Dave Davington",
    category: {
      course: "Desert",
      country: "America",
      diet: "Vegetarian",
    },
    ingredients: [
      {
        name: "Flour",
        amount: 100,
        unit: "g",
      },
      {
        name: "Eggs",
        amount: 2,
        unit: "Large",
      },
      {
        name: "milk",
        amount: 300,
        unit: "ml",
      },
      {
        name: "oil",
        amount: 1,
        unit: "tbsp",
      },
      {
        name: "caster_sugar",
        amount: 25,
        unit: "g",
      },
    ],

    steps:
      "STEP 1 - Put 100g plain flour, 2 large eggs, 300ml milk, 1 tbsp sunflower or vegetable oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter. STEP 2 - Set aside for 30 mins to rest if you have time, or start cooking straight away. STEP 3 - Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper. STEP 4 - When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go. STEP 5 - Serve with lemon wedges and caster sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months.",
    comments: [],
    visibility: "Public"
  },
  {
    title: "Creamy pesto & kale pasta",
    author_id: "Bob Bobington",
    category: {
      course: "Main",
      country: "Italy",
      diet: "Vegetarian",
    },
    ingredients: [
      {
        name: "onion",
        amount: 2,
        unit: "Whole",
      },
      {
        name: "kale",
        amount: 300,
        unit: "g",
      },
      {
        name: "pasta",
        amount: 300,
        unit: "g",
      },
      {
        name: "oil",
        amount: 1,
        unit: "tbsp",
      },
      {
        name: "soft cheese",
        amount: 4,
        unit: "tbsp",
      },
      {
        name: "pesto",
        amount: 4,
        unit: "tbsp",
      },
    ],
    steps:
      "STEP 1 - Heat the oil in a large pan over a medium heat. Fry the onions for 10 mins until softened and beginning to caramelise. Add the kale and 100ml water, then cover and cook for 5 mins more, or until the kale has wilted. STEP 2 - Cook the pasta following pack instructions. Drain, reserving a little of the cooking water. Toss the pasta with the onion mixture, soft cheese and pesto, adding a splash of the reserved cooking water to loosen, if needed. Season.",
    comments: [],
    visibility: "Public"
  },
  {
    title: "Butter bean & chorizo stew",
    author_id: "Alice Stevenson",
    category: {
      course: "Main",
      country: "Spain",
      diet: "None",
    },
    ingredients: [
      {
        name: "chorizo",
        amount: 200,
        unit: "g",
      },
      {
        name: "chopped tomatoes",
        amount: 2,
        unit: "Tins",
      },
      {
        name: "butter beans",
        amount: 2,
        unit: "Tins",
      },
      {
        name: "pesto",
        amount: 1,
        unit: "tbsp",
      },
    ],
    steps:
      "STEP 1 - Slice the chorizo and tip into a large saucepan over a medium heat. Fry gently for 5 mins or until starting to turn dark brown. Add the tomatoes and butter beans, bring to the boil, then simmer for 10 mins. Swirl through the pesto, season lightly and ladle into four bowls.",
    comments: [],
    visibility: "Public"
  },
  {
    title: "Garlic chicken parcels",
    author_id: "Alice Stevenson",
    category: {
      course: "Main",
      country: "France",
      diet: "None",
    },
    ingredients: [
      {
        name: "Chicken",
        amount: 400,
        unit: "g",
      },
      {
        name: "Puff pastry",
        amount: 2,
        unit: "g",
      },
      {
        name: "Cream cheese",
        amount: 150,
        unit: "g",
      },
      {
        name: "Lemon",
        amount: 1,
        unit: "Whole",
      },
      {
        name: "Oil",
        amount: 1,
        unit: "tbsp",
      },
      {
        name: "Green Beans",
        amount: 100,
        unit: "g",
      },
      {
        name: "Broccoli",
        amount: 100,
        unit: "g",
      },
    ],
    steps:
      "STEP 1 - Slice the chorizo and tip into a large saucepan over a medium heat. Fry gently for 5 mins or until starting to turn dark brown. Add the tomatoes and butter beans, bring to the boil, then simmer for 10 mins. Swirl through the pesto, season lightly and ladle into four bowls.",
    comments: [],
    visibility: "Public" 
  },
];

// let ingre;

// for (const [index] of recipes.entries()) {
//   console.log(index)
// }

export const seederRecipes = [
  ...recipes.map((r) => ({
    ...r,
    ...r.ingredients.values,
  })),
];
