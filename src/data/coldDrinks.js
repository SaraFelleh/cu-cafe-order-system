const waterTypes = [
  {
    id: "still",
    name: { de: "Still", en: "Still", ar: "عادية" },
    price: 0,
  },
  {
    id: "sparkling",
    name: { de: "Sprudel", en: "Sparkling", ar: "غازية" },
    price: 0,
  },
];

const fritzColaTypes = [
  {
    id: "cola",
    name: { de: "Fritz Cola", en: "Fritz Cola", ar: "فريتز كولا" },
    price: 0,
  },
  {
    id: "zero",
    name: { de: "Fritz Cola Zero", en: "Fritz Cola Zero", ar: "فريتز كولا زيرو" },
    price: 0,
  },
];

const fritzLemoTypes = [
  {
    id: "orange",
    name: { de: "Orange", en: "Orange", ar: "برتقال" },
    price: 0,
  },
  {
    id: "lemon",
    name: { de: "Zitrone", en: "Lemon", ar: "ليمون" },
    price: 0,
  },
  {
    id: "lime-mint",
    name: { de: "Lime-Mint", en: "Lime-Mint", ar: "لايم ونعناع" },
    price: 0,
  },
];

const schorleTypes = [
  {
    id: "apple",
    name: { de: "Apfel", en: "Apple", ar: "تفاح" },
    price: 0,
  },
  {
    id: "rhubarb",
    name: { de: "Rhabarber", en: "Rhubarb", ar: "راوند" },
    price: 0,
  },
  {
    id: "grape",
    name: { de: "Traube", en: "Grape", ar: "عنب" },
    price: 0,
  },
];

const icedTeaTypes = [
  {
    id: "peach",
    name: { de: "Pfirsich", en: "Peach", ar: "خوخ" },
    price: 0,
  },
  {
    id: "lemon",
    name: { de: "Zitrone", en: "Lemon", ar: "ليمون" },
    price: 0,
  },
];

const juiceTypes = [
  {
    id: "apple",
    name: { de: "Apfel", en: "Apple", ar: "تفاح" },
    price: 0,
  },
  {
    id: "grape",
    name: { de: "Traube", en: "Grape", ar: "عنب" },
    price: 0,
  },
  {
    id: "passionfruit",
    name: { de: "Maracuja", en: "Passionfruit", ar: "باشن فروت" },
    price: 0,
  },
];

const drinkTypeLabel = {
  de: "Sorte",
  en: "Type",
  ar: "النوع",
};

const coldDrinks = [
  {
    category: "Cold Drinks",
    icon: "🥤",
    image: "/images/cold-drinks.png",

    items: [
      {
        id: 17,
        name: {
          de: "Wasser",
          en: "Water",
          ar: "مياه",
        },
        subtitle: {
          de: "Bitte wählen Sie still oder sprudel.",
          en: "Please choose still or sparkling.",
          ar: "يرجى اختيار مياه عادية أو غازية.",
        },
        price: 2.7,
        optionLabel: drinkTypeLabel,
        multipleExtras: false,
        extras: waterTypes,
      },

      {
        id: 18,
        name: {
          de: "Fritz Cola",
          en: "Fritz Cola",
          ar: "فريتز كولا",
        },
        subtitle: {
          de: "Klassisches Erfrischungsgetränk.",
          en: "Classic soft drink.",
          ar: "مشروب غازي كلاسيكي.",
        },
        price: 3.3,
        optionLabel: drinkTypeLabel,
        multipleExtras: false,
        extras: fritzColaTypes,
      },

      {
        id: 19,
        name: {
          de: "Fritz Lemo",
          en: "Fritz Lemo",
          ar: "فريتز ليمو",
        },
        subtitle: {
          de: "Bitte wählen Sie eine Sorte.",
          en: "Please choose a flavor.",
          ar: "يرجى اختيار النكهة.",
        },
        price: 3.3,
        optionLabel: drinkTypeLabel,
        multipleExtras: false,
        extras: fritzLemoTypes,
      },

      {
        id: 20,
        name: {
          de: "Fritz Schorle",
          en: "Fritz Spritzer",
          ar: "فريتز شورله",
        },
        subtitle: {
          de: "Bitte wählen Sie eine Sorte.",
          en: "Please choose a flavor.",
          ar: "يرجى اختيار النكهة.",
        },
        price: 3.4,
        optionLabel: drinkTypeLabel,
        multipleExtras: false,
        extras: schorleTypes,
      },

      {
        id: 21,
        name: {
          de: "Iced Tea",
          en: "Iced Tea",
          ar: "شاي مثلج",
        },
        subtitle: {
          de: "Bitte wählen Sie eine Sorte.",
          en: "Please choose a flavor.",
          ar: "يرجى اختيار النكهة.",
        },
        price: 3.5,
        optionLabel: drinkTypeLabel,
        multipleExtras: false,
        extras: icedTeaTypes,
      },

      {
        id: 22,
        name: {
          de: "Orangensaft",
          en: "Orange Juice",
          ar: "عصير برتقال",
        },
        subtitle: {
          de: "Frisch gepresst.",
          en: "Freshly squeezed.",
          ar: "طازج ومعصور مباشرة.",
        },
        price: 5.2,
      },

      {
        id: 23,
        name: {
          de: "Saft",
          en: "Fruit Juice",
          ar: "عصير فواكه",
        },

        subtitle: {
          de: "Bitte wählen Sie eine Sorte.",
          en: "Please choose a flavor.",
          ar: "يرجى اختيار النكهة.",
        },
        price: 4.1,
        optionLabel: drinkTypeLabel,
        multipleExtras: false,
        extras: juiceTypes,
      },
    ],
  },
];

export default coldDrinks;