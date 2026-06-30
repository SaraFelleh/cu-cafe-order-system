const smoothieMilkOptions = [
  {
    id: "cow",
    name: {
      de: "Vollmilch",
      en: "Cow Milk",
      ar: "حليب كامل الدسم",
    },
    price: 0,
  },
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
  {
    id: "lactosefree",
    name: {
      de: "Laktosefreie Milch",
      en: "Lactose-Free Milk",
      ar: "حليب خالٍ من اللاكتوز",
    },
    price: 0.3,
  },
];

const milkLabel = {
  de: "Milch",
  en: "Milk",
  ar: "الحليب",
};

const smoothies = [
  {
    category: "Smoothies",
    icon: "🍹",
    image: "/images/smoothies.png",

    items: [
      {
        id: 24,
        name: {
          de: "Purple Fusion",
          en: "Purple Fusion",
          ar: "بيربل فيوجن",
        },
        subtitle: {
          de: "Beeren-Mischung, Banane, Milch und Chia",
          en: "Berries, Banana, Milk and Chia seeds",
          ar: "توت مشكل، موز، حليب وبذور الشيا",
        },
        price: 7.5,
        optionLabel: milkLabel,
        optionType: "milk",
        multipleExtras: false,
        extras: smoothieMilkOptions,
      },

      {
        id: 25,
        name: {
          de: "Green Hulk",
          en: "Green Hulk",
          ar: "غرين هالك",
        },
        subtitle: {
          de: "Apfel, Ingwer, Gurke, Spinat, Limettensaft und Chia",
          en: "Apple, Ginger, Cucumber, Spinach, Lime juice and Chia seeds",
          ar: "تفاح، زنجبيل، خيار، سبانخ، عصير الليمون وبذور الشيا",
        },
        price: 8.5,
      },

      {
        id: 26,
        name: {
          de: "Vitamin CU",
          en: "Vitamin CU",
          ar: "فيتامين CU",
        },
        subtitle: {
          de: "Mango, Orangen, Orangensaft und Banane",
          en: "Mango, Orange, Orange juice and Banana",
          ar: "مانجو، برتقال، عصير برتقال وموز",
        },
        price: 7.9,
      },

      {
        id: 27,
        name: {
          de: "Açaí-Heidelbeer",
          en: "Açaí-Blueberry",
          ar: "آساي وتوت أزرق",
        },
        subtitle: {
          de: "Açaí, Heidelbeer, Banane, Datteln und Sojamilch",
          en: "Açaí, Blueberry, Banana, Dates and Soy Milk",
          ar: "آساي، توت أزرق، موز، تمر وحليب الصويا",
        },
        price: 8.9,
      },
    ],
  },
];

export default smoothies;