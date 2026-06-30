const shakshukaExtras = [
  {
    id: "vegan",
    name: { de: "Vegan", en: "Vegan", ar: "نباتي" },
    price: 0,
  },
  {
    id: "jalapenos",
    name: { de: "Jalapeños", en: "Jalapeños", ar: "هالبينو" },
    price: 2,
  },
  {
    id: "sucuk",
    name: { de: "Sucuk", en: "Sucuk", ar: "سجق" },
    price: 3.5,
  },
];

const scrambledEggExtras = [
  {
    id: "egg",
    name: { de: "Ei", en: "Egg", ar: "بيضة" },
    price: 2,
  },
  {
    id: "avocado",
    name: { de: "Avocado", en: "Avocado", ar: "أفوكادو" },
    price: 3,
  },
  {
    id: "sucuk",
    name: { de: "Sucuk", en: "Sucuk", ar: "سجق" },
    price: 3.5,
  },
  {
    id: "salmon",
    name: { de: "Lachs", en: "Salmon", ar: "سلمون" },
    price: 3.5,
  },
];

const magicLampExtras = [
  {
    id: "vegetarian",
    name: {
      de: "Vegetarisch ohne Sucuk",
      en: "Vegetarian without Sucuk",
      ar: "نباتي بدون سجق",
    },
    price: 0,
  },
];

const proteifullExtras = [
  {
    id: "avocado-only",
    name: {
      de: "Nur Avocado",
      en: "Only Avocado",
      ar: "أفوكادو فقط",
    },
    price: 0,
  },
  {
    id: "salmon-only",
    name: {
      de: "Nur Lachs",
      en: "Only Salmon",
      ar: "سلمون فقط",
    },
    price: 1,
  },
];

const breakfastExtraLabel = {
  de: "Extras",
  en: "Extras",
  ar: "إضافات",
};

const breakfast = [
  {
    category: "Frühstück",
    icon: "🍳",
    image: "/images/frühstück.png",

    description: {
      de: "Bis 14 Uhr",
      en: "Until 2 PM",
      ar: "حتى الساعة 2 ظهراً",
    },

    items: [
      {
        id: 38,
        name: {
          de: "Shakshuka",
          en: "Shakshuka",
          ar: "شكشوكة",
        },
        subtitle: {
          de: "Bio-Eier, Tomaten, Zwiebel und Paprika in der Pfanne. Auch vegan möglich.",
          en: "Organic eggs, tomatoes, onions and peppers in the pan. Also available vegan.",
          ar: "بيض عضوي مع الطماطم والبصل والفليفلة في المقلاة. يمكن طلبها نباتية أيضاً.",
        },
        price: 12.9,
        optionLabel: breakfastExtraLabel,
        extras: shakshukaExtras,
      },

      {
        id: 39,
        name: {
          de: "Rührei",
          en: "Scrambled Eggs",
          ar: "بيض مخفوق",
        },
        subtitle: {
          de: "2 Rühreier mit Brötchen und Salat.",
          en: "2 scrambled eggs with a bun and salad.",
          ar: "بيضتان مخفوقتان مع خبز وسلطة.",
        },
        price: 6.9,
        optionLabel: breakfastExtraLabel,
        extras: scrambledEggExtras,
      },

      {
        id: 40,
        name: {
          de: "Magic Lamp",
          en: "Magic Lamp",
          ar: "ماجيك لامب",
        },
        subtitle: {
          de: "Oliven, Rosenjam, Makdus, Käse, Falafel, Hummus und Sucuk mit Ei. Auch vegetarisch ohne Sucuk erhältlich.",
          en: "Olives, rose jam, Makdus, cheese, falafel, hummus and sucuk with eggs. Also available vegetarian without sucuk.",
          ar: "زيتون، مربى الورد، مكدوس، جبنة، فلافل، حمص وسجق مع البيض. يتوفر أيضاً نباتي بدون سجق.",
        },
        price: 15.9,
        optionLabel: breakfastExtraLabel,
        extras: magicLampExtras,
      },

      {
        id: 41,
        name: {
          de: "Proteifull",
          en: "Proteifull",
          ar: "بروتيفول",
        },
        subtitle: {
          de: "Lachs und Avocado auf 2 Bio-Spiegeleiern mit Roggenbrot, Kräuterfrischkäse, Gouda und Salat. Auch nur mit Avocado oder nur Lachs (+1,00€) möglich.",
          en: "Salmon and avocado on 2 organic fried eggs with rye bread, herb cream cheese, Gouda and salad. Also available with only avocado or only salmon (+1.00€).",
          ar: "سلمون وأفوكادو مع بيضتين مقليتين عضويتين، خبز الجاودار، جبنة كريمية بالأعشاب، غودا وسلطة. يمكن طلبه بأفوكادو فقط أو سلمون فقط (+1€).",
        },
        price: 14.9,
        optionLabel: breakfastExtraLabel,
        multipleExtras: false,
        extras: proteifullExtras,
      },

      {
        id: 42,
        name: {
          de: "Vegan Bowl",
          en: "Vegan Bowl",
          ar: "وعاء نباتي",
        },
        subtitle: {
          de: "Falafel, Avocado, Salat und Brot.",
          en: "Falafel, avocado, salad and bread.",
          ar: "فلافل، أفوكادو، سلطة وخبز.",
        },
        price: 11.9,
      },

      {
        id: 43,
        name: {
          de: "Baked Beans",
          en: "Baked Beans",
          ar: "فاصولياء مخبوزة",
        },
        subtitle: {
          de: "Roggenbrot, Gouda, Baked Beans, 2 Spiegeleier, Pilze und Ketchup.",
          en: "Rye bread, Gouda, baked beans, 2 fried eggs, mushrooms and ketchup.",
          ar: "خبز الجاودار، جبنة غودا، فاصولياء مخبوزة، بيضتان مقليتان، فطر وكاتشب.",
        },
        price: 14.5,
      },
    ],
  },
];

export default breakfast;