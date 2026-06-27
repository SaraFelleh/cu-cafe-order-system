const teaSizes = [
  { id: "cup", name: "Cup", price: 3.6 },
  { id: "pot", name: "Pot", price: 5.2 },
];

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
        name: { de: "Schwarz", en: "Black Tea", ar: "شاي أسود" },
        price: 3.6,
        priceText: "3.60€ / 5.20€",
        sizes: teaSizes,
      },
      {
        id: 16,
        name: { de: "Grün", en: "Green Tea", ar: "شاي أخضر" },
        price: 3.6,
        priceText: "3.60€ / 5.20€",
        sizes: teaSizes,
      },
      {
        id: 17,
        name: { de: "Früchte", en: "Fruit Tea", ar: "شاي فواكه" },
        price: 3.6,
        priceText: "3.60€ / 5.20€",
        sizes: teaSizes,
      },
      {
        id: 18,
        name: { de: "Kräuter", en: "Herbal Tea", ar: "شاي أعشاب" },
        price: 3.6,
        priceText: "3.60€ / 5.20€",
        sizes: teaSizes,
      },
      {
        id: 19,
        name: { de: "Minze", en: "Mint Tea", ar: "شاي نعناع" },
        price: 3.6,
        priceText: "3.60€ / 5.20€",
        sizes: teaSizes,
      },
      {
        id: 20,
        name: {
          de: "Ingwer Zitrone",
          en: "Ginger Lemon Tea",
          ar: "شاي زنجبيل وليمون",
        },
        price: 3.6,
        priceText: "3.60€ / 5.20€",
        sizes: teaSizes,
      },
      {
        id: 21,
        name: { de: "Elfenspuk", en: "Elfenspuk Tea", ar: "شاي إلفنسبوك" },
        price: 3.6,
        priceText: "3.60€ / 5.20€",
        sizes: teaSizes,
      },
      {
        id: 22,
        name: { de: "Honigwald", en: "Honey Forest Tea", ar: "شاي غابة العسل" },
        price: 3.6,
        priceText: "3.60€ / 5.20€",
        sizes: teaSizes,
      },
      {
        id: 23,
        name: {
          de: "Rooibos Vanille",
          en: "Rooibos Vanilla Tea",
          ar: "شاي رويبوس بالفانيليا",
        },
        price: 3.6,
        priceText: "3.60€ / 5.20€",
        sizes: teaSizes,
      },
    ],
  },
];

export default tea;