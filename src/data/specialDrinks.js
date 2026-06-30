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
        description: {
          de: "Benannt ist der Mokka Kaffee nach der kleinen Hafenstadt al-Mucha im Jemen, in welcher der Kaffeehandel seinen Ursprung hat. Für die Zubereitung werden kräftig geröstete Kaffeebohnen sehr fein gemahlen und anschließend mit warmem Wasser aufgegossen und zweimal aufgekocht. Ein Kaffee Mokka wird schwarz getrunken und zeichnet sich geschmacklich durch einen vollen und kräftigen Körper aus.",

          en: "Mocha coffee is named after the small port town of al-Mucha in Yemen, where the coffee trade originated. To prepare it, strongly roasted coffee beans are ground very finely, poured into warm water and boiled twice. Mocha is served black and is characterized by a full and strong body in terms of taste.",

          ar: "سُمّيت قهوة الموكا نسبةً إلى مدينة المخا اليمنية، حيث بدأ تاريخ تجارة القهوة. تُحضّر من حبوب قهوة محمصة بقوة ومطحونة ناعماً، ثم تُغلى مع الماء مرتين. تُشرب الموكا سوداء وتتميز بطعم قوي وقوام غني.",
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
        description: {
          de: "Yerba Mate ist eine Pflanze, die auf Feldern und Plantagen in großen Teilen Südamerikas wächst. Die Blätter der Yerba-Mate-Pflanze werden geerntet, getrocknet, gereift und in passende Stücke geschnitten, bevor daraus der Tee entsteht, den wir Mate nennen. Mate-Tee hat einen erdigen, rauchigen Geschmack und ist gleichzeitig ein wenig süßlich und leicht bitter.",

          en: "Yerba Mate is a plant that grows in fields and plantations across much of South America. The leaves are harvested, dried, cured and cut into suitable pieces before becoming the tea we call mate. Mate tea has an earthy, smoky taste, while also being slightly sweet and lightly bitter.",

          ar: "المتة نبات ينمو في مساحات واسعة من أمريكا الجنوبية. تُقطف أوراقه وتجفف وتُعتّق ثم تُقطع لتصبح الشاي المعروف باسم المتة. تتميز المتة بطعم ترابي ومدخن قليلاً، مع لمسة خفيفة من الحلاوة والمرارة.",
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

export default specialDrinks;