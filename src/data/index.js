import countries from "countries-list";

export const course = [
  { name: "Starter" },
  { name: "Main" },
  { name: "Dessert" },
];
export const diet = [
  { name: "General" },
  { name: "Vegitarian" },
  { name: "Vegan" },
  { name: "Gluten free" },
];
export const unit = [
  { name: "ml", type: "Volume" },
  { name: "l", type: "Volume" },
  { name: "tsp", type: "Volume" },
  { name: "tbsp", type: "Volume" },
  { name: "fl oz", type: "Volume" },
  { name: "cup", type: "Volume" },
  { name: "pint", type: "Volume" },
  { name: "g", type: "Weight" },
  { name: "kg", type: "Weight" },
  { name: "oz", type: "Weight" },
  { name: "lb", type: "Weight" },
];

export const setVisibility = [
  {name: "Private"},
  {name: "Public"}
]

export const countryCodes = Object.keys(countries.countries);
export const countryNames = countryCodes.map(
  (code) => countries.countries[code]
);
