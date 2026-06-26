const teaTypes = [
  {
    id: "black",
    name: {
      de: "Schwarz",
      en: "Black",
      ar: "شاي أسود",
    },
    price: 0,
  },
  {
    id: "green",
    name: {
      de: "Grün",
      en: "Green",
      ar: "شاي أخضر",
    },
    price: 0,
  },
  {
    id: "fruit",
    name: {
      de: "Früchte",
      en: "Fruit",
      ar: "شاي فواكه",
    },
    price: 0,
  },
  {
    id: "herbal",
    name: {
      de: "Kräuter",
      en: "Herbal",
      ar: "شاي أعشاب",
    },
    price: 0,
  },
  {
    id: "mint",
    name: {
      de: "Minze",
      en: "Mint",
      ar: "نعناع",
    },
    price: 0,
  },
  {
    id: "ginger",
    name: {
      de: "Ingwer Zitrone",
      en: "Ginger Lemon",
      ar: "زنجبيل وليمون",
    },
    price: 0,
  },
  {
    id: "elfenspuk",
    name: {
      de: "Elfenspuk",
      en: "Elfenspuk",
      ar: "إلفنسبوك",
    },
    price: 0,
  },
  {
    id: "honigwald",
    name: {
      de: "Honigwald",
      en: "Honey Forest",
      ar: "غابة العسل",
    },
    price: 0,
  },
  {
    id: "rooibos",
    name: {
      de: "Rooibos Vanille",
      en: "Rooibos Vanilla",
      ar: "رويبوس بالفانيليا",
    },
    price: 0,
  },
];

const teaOptionLabel = {
  de: "Teesorte",
  en: "Tea Type",
  ar: "نوع الشاي",
};

const tea = [
  {
    category: "Tea",
    icon: "🍵",
    image: "/images/coffee-menu.png",

    description: {
      de: "Bitte wählen Sie Ihre Teesorte.",
      en: "Please choose your tea.",
      ar: "يرجى اختيار نوع الشاي.",
    },

    items: [
      {
        id: 15,
        name: {
          de: "Tea Cup",
          en: "Tea Cup",
          ar: "كوب شاي",
        },
        price: 3.6,
        optionLabel: teaOptionLabel,
        extras: teaTypes,
      },

      {
        id: 16,
        name: {
          de: "Tea Pot",
          en: "Tea Pot",
          ar: "إبريق شاي",
        },
        price: 5.2,
        optionLabel: teaOptionLabel,
        extras: teaTypes,
      },
    ],
  },
];

export default tea;