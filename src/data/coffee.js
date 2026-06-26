const coffee = [
  {
    category: "Coffee",
    icon: "☕",
    image: "/images/coffee.png",

items: [
  {
    id: 1,
    name: {
      de: "V60 Pour Over",
      en: "V60 Pour Over",
      ar: "قهوة V60",
    },
    subtitle: {
      de: "Milch wird nicht dazu serviert.",
      en: "Milk is not served.",
      ar: "لا يتم تقديم الحليب معه.",
    },
    price: 4.9,
  },

  {
    id: 2,
    name: {
      de: "Kaffee Crème / Decaf",
      en: "Coffee Crème / Decaf",
      ar: "قهوة كريما / منزوعة الكافيين",
    },
    price: 2.9,
  },

  {
    id: 3,
    name: {
      de: "Americano",
      en: "Americano",
      ar: "أمريكانو",
    },
    price: 3.5,
  },

  {
    id: 4,
    name: {
      de: "Espresso / Doppio",
      en: "Espresso / Double Espresso",
      ar: "إسبريسو / دبل إسبريسو",
    },
    priceText: "2,50€ / 3,40€",
    price: 2.5,
  },

  {
    id: 5,
    name: {
      de: "Espresso Macchiato",
      en: "Espresso Macchiato",
      ar: "إسبريسو ماكياتو",
    },
    price: 2.6,
  },

  {
    id: 6,
    name: {
      de: "Espresso Affogato",
      en: "Espresso Affogato",
      ar: "إسبريسو أفوغاتو",
    },
    price: 3.9,
  },

  {
    id: 7,
    name: {
      de: "Cappuccino",
      en: "Cappuccino",
      ar: "كابتشينو",
    },
    price: 3.4,
    priceText: "3,40€ / 4,50€",
    sizes: [
      { id: "02", name: "0.2L", price: 3.4 },
      { id: "03", name: "0.3L", price: 4.5 },
    ],
    extras: [
      { id: "cow", name: { de: "Vollmilch", en: "Cow Milk", ar: "حليب كامل الدسم" }, price: 0 },
      { id: "oat", name: { de: "Hafermilch", en: "Oat Milk", ar: "حليب الشوفان" }, price: 0 },
      { id: "soy", name: { de: "Sojamilch", en: "Soy Milk", ar: "حليب الصويا" }, price: 0 },
    ],
  },

  {
    id: 8,
    name: {
      de: "Mochaccino",
      en: "Mochaccino",
      ar: "موكاتشينو",
    },
    price: 4.5,
    extras: [
      { id: "cow", name: { de: "Vollmilch", en: "Cow Milk", ar: "حليب كامل الدسم" }, price: 0 },
      { id: "oat", name: { de: "Hafermilch", en: "Oat Milk", ar: "حليب الشوفان" }, price: 0 },
      { id: "soy", name: { de: "Sojamilch", en: "Soy Milk", ar: "حليب الصويا" }, price: 0 },
    ],
  },

  {
    id: 9,
    name: {
      de: "Flat White",
      en: "Flat White",
      ar: "فلات وايت",
    },
    price: 4.2,
    extras: [
      { id: "cow", name: { de: "Vollmilch", en: "Cow Milk", ar: "حليب كامل الدسم" }, price: 0 },
      { id: "oat", name: { de: "Hafermilch", en: "Oat Milk", ar: "حليب الشوفان" }, price: 0 },
      { id: "soy", name: { de: "Sojamilch", en: "Soy Milk", ar: "حليب الصويا" }, price: 0 },
    ],
  },

  {
    id: 10,
    name: {
      de: "Caffè Latte",
      en: "Caffè Latte",
      ar: "كافيه لاتيه",
    },
    price: 4.5,
    extras: [
      { id: "cow", name: { de: "Vollmilch", en: "Cow Milk", ar: "حليب كامل الدسم" }, price: 0 },
      { id: "oat", name: { de: "Hafermilch", en: "Oat Milk", ar: "حليب الشوفان" }, price: 0 },
      { id: "soy", name: { de: "Sojamilch", en: "Soy Milk", ar: "حليب الصويا" }, price: 0 },
    ],
  },

  {
    id: 11,
    name: {
      de: "Latte Macchiato",
      en: "Latte Macchiato",
      ar: "لاتيه ماكياتو",
    },
    price: 4.2,
    extras: [
      { id: "cow", name: { de: "Vollmilch", en: "Cow Milk", ar: "حليب كامل الدسم" }, price: 0 },
      { id: "oat", name: { de: "Hafermilch", en: "Oat Milk", ar: "حليب الشوفان" }, price: 0 },
      { id: "soy", name: { de: "Sojamilch", en: "Soy Milk", ar: "حليب الصويا" }, price: 0 },
    ],
  },

  {
    id: 12,
    name: {
      de: "Chai Latte",
      en: "Chai Latte",
      ar: "شاي لاتيه",
    },
    price: 4.3,
    extras: [
      { id: "cow", name: { de: "Vollmilch", en: "Cow Milk", ar: "حليب كامل الدسم" }, price: 0 },
      { id: "oat", name: { de: "Hafermilch", en: "Oat Milk", ar: "حليب الشوفان" }, price: 0 },
      { id: "soy", name: { de: "Sojamilch", en: "Soy Milk", ar: "حليب الصويا" }, price: 0 },
    ],
  },

  {
    id: 13,
    name: {
      de: "Hot Chocolate",
      en: "Hot Chocolate",
      ar: "شوكولاتة ساخنة",
    },
    price: 4.3,
    extras: [
      { id: "cow", name: { de: "Vollmilch", en: "Cow Milk", ar: "حليب كامل الدسم" }, price: 0 },
      { id: "oat", name: { de: "Hafermilch", en: "Oat Milk", ar: "حليب الشوفان" }, price: 0 },
      { id: "soy", name: { de: "Sojamilch", en: "Soy Milk", ar: "حليب الصويا" }, price: 0 },
    ],
  },

  {
    id: 14,
    name: {
      de: "Matcha Latte",
      en: "Matcha Latte",
      ar: "ماتشا لاتيه",
    },
    price: 4.5,
    extras: [
      { id: "cow", name: { de: "Vollmilch", en: "Cow Milk", ar: "حليب كامل الدسم" }, price: 0 },
      { id: "oat", name: { de: "Hafermilch", en: "Oat Milk", ar: "حليب الشوفان" }, price: 0 },
      { id: "soy", name: { de: "Sojamilch", en: "Soy Milk", ar: "حليب الصويا" }, price: 0 },
    ],
  },
    ],
  },
];

export default coffee;