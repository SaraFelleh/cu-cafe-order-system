const sebastianSauces = [
  {
    id: "lotus",
    name: {
      de: "Lotus-Soße",
      en: "Lotus Sauce",
      ar: "صوص لوتس",
    },
    price: 1,
  },
  {
    id: "chocolate",
    name: {
      de: "Schokoladensoße",
      en: "Chocolate Sauce",
      ar: "صوص شوكولاتة",
    },
    price: 1,
  },
  {
    id: "caramel",
    name: {
      de: "Karamellsoße",
      en: "Caramel Sauce",
      ar: "صوص كراميل",
    },
    price: 1,
  },
  {
    id: "pistachio",
    name: {
      de: "Pistazien",
      en: "Pistachio",
      ar: "فستق",
    },
    price: 1.2,
  },
];

const sauceLabel = {
  de: "Soße / Topping",
  en: "Sauce / Topping",
  ar: "الصوص / الإضافة",
};

const specialDrinks = [
  {
    category: "Special Drinks & Cakes",
    icon: "🍰",
    image: "/images/special-drinks.png",

    items: [
      {
        id: 28,
        name: {
          de: "Arabic Mocha",
          en: "Arabic Mocha",
          ar: "موكا عربي",
        },
        subtitle: {
          de: "Traditioneller Mokka aus dem Jemen.",
          en: "Traditional Mocha coffee from Yemen.",
          ar: "قهوة موكا تقليدية من اليمن.",
        },
        price: 4.0,
      },

      {
        id: 29,
        name: {
          de: "Yerba Mate",
          en: "Yerba Mate",
          ar: "متة",
        },
        subtitle: {
          de: "Traditioneller Mate-Tee aus Südamerika.",
          en: "Traditional Yerba Mate from South America.",
          ar: "شاي يربا ماته التقليدي من أمريكا الجنوبية.",
        },
        price: 4.9,
      },

      {
        id: 30,
        name: {
          de: "San Sebastian Cheesecake",
          en: "San Sebastian Cheesecake",
          ar: "تشيزكيك سان سيباستيان",
        },
        subtitle: {
          de: "Mit Soße oder Pistazien-Topping nach Wahl.",
          en: "With sauce or pistachio topping of your choice.",
          ar: "مع صوص أو إضافة فستق حسب الاختيار.",
        },
        price: 4.7,
        optionLabel: sauceLabel,
        multipleExtras: false,
        extras: sebastianSauces,
      },

      {
        id: 31,
        name: {
          de: "Daily Cakes",
          en: "Daily Cakes",
          ar: "كيك اليوم",
        },
        subtitle: {
          de: "Wechselnde Kuchen und Torten – bitte fragen Sie unser Team.",
          en: "Selection of changing cakes – please ask our staff.",
          ar: "تشكيلة يومية من الكيك والحلويات، يرجى سؤال فريق العمل.",
        },
        price: null,
      },
    ],
  },
];

export default specialDrinks;