const summerMilkOptions = [
  {
    id: "oat",
    name: {
      de: "Hafermilch",
      en: "Oat Milk",
      ar: "حليب الشوفان",
    },
    price: 0,
  },
  {
    id: "soy",
    name: {
      de: "Sojamilch",
      en: "Soy Milk",
      ar: "حليب الصويا",
    },
    price: 0,
  },
];

const milkLabel = {
  de: "Milch",
  en: "Milk",
  ar: "الحليب",
};

const summerDrinks = [
  {
    category: "Summer Drinks",
    icon: "🧋",
    image: "/images/summer-drinks.png",

    items: [
      {
        id: 57,
        name: {
          de: "Mango Matcha Latte",
          en: "Mango Matcha Latte",
          ar: "ماتشا لاتيه بالمانجو",
        },
        subtitle: {
          de: "Sommerlicher Matcha Latte mit Mango.",
          en: "Summer matcha latte with mango.",
          ar: "ماتشا لاتيه صيفي مع المانجو.",
        },
        price: 6.2,
        optionLabel: milkLabel,
        optionType: "milk",
        multipleExtras: false,
        extras: summerMilkOptions,
      },

      {
        id: 58,
        name: {
          de: "Strawberry Matcha Latte",
          en: "Strawberry Matcha Latte",
          ar: "ماتشا لاتيه بالفراولة",
        },
        subtitle: {
          de: "Matcha Latte mit Erdbeere.",
          en: "Matcha latte with strawberry.",
          ar: "ماتشا لاتيه مع الفراولة.",
        },
        price: 6.2,
        optionLabel: milkLabel,
        optionType: "milk",
        multipleExtras: false,
        extras: summerMilkOptions,
      },

      {
        id: 59,
        name: {
          de: "Blueberry Matcha Latte",
          en: "Blueberry Matcha Latte",
          ar: "ماتشا لاتيه بالتوت الأزرق",
        },
        subtitle: {
          de: "Matcha Latte mit Heidelbeere.",
          en: "Matcha latte with blueberry.",
          ar: "ماتشا لاتيه مع التوت الأزرق.",
        },
        price: 6.2,
        optionLabel: milkLabel,
        optionType: "milk",
        multipleExtras: false,
        extras: summerMilkOptions,
      },

      {
        id: 60,
        name: {
          de: "Match Mango Latte",
          en: "Match Mango Latte",
          ar: "ماتش مانجو لاتيه",
        },
        subtitle: {
          de: "Cremiger Sommerdrink mit Mango.",
          en: "Creamy summer drink with mango.",
          ar: "مشروب صيفي كريمي مع المانجو.",
        },
        price: 6.2,
        optionLabel: milkLabel,
        optionType: "milk",
        multipleExtras: false,
        extras: summerMilkOptions,
      },

      {
        id: 61,
        name: {
          de: "Lime-Mint Matcha",
          en: "Lime-Mint Matcha",
          ar: "ماتشا لايم ونعناع",
        },
        subtitle: {
          de: "Erfrischender Matcha mit Limette und Minze.",
          en: "Refreshing matcha with lime and mint.",
          ar: "ماتشا منعشة مع اللايم والنعناع.",
        },
        price: 5.9,
        optionLabel: milkLabel,
        optionType: "milk",
        multipleExtras: false,
        extras: summerMilkOptions,
      },

      {
        id: 62,
        name: {
          de: "Vietnamese Iced Coffee",
          en: "Vietnamese Iced Coffee",
          ar: "قهوة فيتنامية مثلجة",
        },
        subtitle: {
          de: "Kräftiger Eiskaffee nach vietnamesischer Art.",
          en: "Strong Vietnamese-style iced coffee.",
          ar: "قهوة مثلجة قوية على الطريقة الفيتنامية.",
        },
        price: 5.2,
      },

      {
        id: 63,
        name: {
          de: "Spanish Latte",
          en: "Spanish Latte",
          ar: "سبانش لاتيه",
        },
        subtitle: {
          de: "Süßer, cremiger Eiskaffee.",
          en: "Sweet and creamy iced coffee.",
          ar: "قهوة مثلجة حلوة وكريمية.",
        },
        price: 5.5,
      },

      {
        id: 64,
        name: {
          de: "Brazilian Lemonade",
          en: "Brazilian Lemonade",
          ar: "ليمونادة برازيلية",
        },
        subtitle: {
          de: "Erfrischende cremige Limettenlimonade.",
          en: "Refreshing creamy lime lemonade.",
          ar: "ليمونادة لايم كريمية ومنعشة.",
        },
        price: 5.5,
      },

      {
        id: 65,
        name: {
          de: "Ginger Lemon Mojito",
          en: "Ginger Lemon Mojito",
          ar: "موهيتو زنجبيل وليمون",
        },
        subtitle: {
          de: "Erfrischender Mojito mit Ingwer und Zitrone.",
          en: "Refreshing mojito with ginger and lemon.",
          ar: "موهيتو منعش مع الزنجبيل والليمون.",
        },
        price: 5.9,
      },

      {
        id: 66,
        name: {
          de: "Pomegranate Lemon Fizz",
          en: "Pomegranate Lemon Fizz",
          ar: "رمان وليمون فوار",
        },
        subtitle: {
          de: "Spritziger Sommerdrink mit Granatapfel und Zitrone.",
          en: "Sparkling summer drink with pomegranate and lemon.",
          ar: "مشروب صيفي فوار مع الرمان والليمون.",
        },
        price: 5.9,
      },
    ],
  },
];

export default summerDrinks;