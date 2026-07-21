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
    id: "brulee",
    name: {
      de: "Brûlée-Soße",
      en: "Brûlée Sauce",
      ar: "صوص كريم بروليه",
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

const cakes = [
  {
    category: "Cakes",
    icon: "🍰",
    image: "/images/cakes.png",

    items: [
      {
        id: 30,
        name: {
          de: "San Sebastian Cheesecake",
          en: "San Sebastian Cheesecake",
          ar: "تشيزكيك سان سيباستيان",
        },
        subtitle: {
          de: "Unser beliebter San Sebastian Cheesecake mit Soße oder Pistazien-Topping nach Wahl.",
          en: "Our popular San Sebastian Cheesecake with sauce or pistachio topping of your choice.",
          ar: "تشيزكيك سان سيباستيان الشهير مع صوص أو إضافة فستق حسب الاختيار.",
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
        description: {
          de: "Zusätzlich bieten wir wechselnde Kuchen und Torten an. Ein Blick in die Kuchentheke oder eine kurze Frage an unser Team lohnt sich.",

          en: "In addition, we offer a changing selection of cakes and desserts. Please take a look at our cake display or feel free to ask our team.",

          ar: "نقدم أيضاً تشكيلة متغيرة من الكيك والحلويات. يمكنكم إلقاء نظرة على واجهة الكيك أو سؤال فريق العمل.",
        },
        price: null,
      },
    ],
  },
];

export default cakes;