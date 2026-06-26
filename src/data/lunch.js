const lunch = [

{
  category: "Mittagessen",
  icon: "🍽️",
  image: "/images/mittagessen.png",

  description: {
    de: "14:00 Uhr bis 19:30 Uhr",
    en: "2:00 PM – 7:30 PM",
    ar: "من الساعة 2:00 ظهراً حتى 7:30 مساءً",
  },

  items: [
    {
      id: 44,
      name: {
        de: "Falafel Pita",
        en: "Falafel Pita",
        ar: "بيتا فلافل",
      },
      subtitle: {
        de: "Frische Pita mit Falafel und Salat.",
        en: "Fresh pita filled with falafel and salad.",
        ar: "خبز بيتا طازج محشو بالفلافل والسلطة.",
      },
      price: 7.0,
    },

    {
      id: 45,
      name: {
        de: "Halloumi Pita",
        en: "Halloumi Pita",
        ar: "بيتا حلوم",
      },
      subtitle: {
        de: "Warme Pita mit gegrilltem Halloumi und Salat.",
        en: "Warm pita with grilled halloumi and salad.",
        ar: "خبز بيتا دافئ مع جبنة الحلوم المشوية والسلطة.",
      },
      price: 7.0,
    },

    {
      id: 46,
      name: {
        de: "Ofenkartoffel",
        en: "Baked Potato",
        ar: "بطاطا مشوية",
      },
      subtitle: {
        de: "Mit Hummus, Frischkäse oder Guacamole.",
        en: "With hummus, cream cheese or guacamole.",
        ar: "مع حمص أو جبنة كريمية أو غواكامولي.",
      },
      price: 8.0,
    },

    {
      id: 47,
      name: {
        de: "Ofenkartoffel mit Lachs",
        en: "Baked Potato with Salmon",
        ar: "بطاطا مشوية مع سلمون",
      },
      subtitle: {
        de: "Mit Frischkäse und Lachs.",
        en: "With cream cheese and salmon.",
        ar: "مع الجبنة الكريمية والسلمون.",
      },
      price: 9.5,
    },

    {
      id: 48,
      name: {
        de: "Hummus-Falafel-Teller",
        en: "Hummus Falafel Plate",
        ar: "طبق حمص وفلافل",
      },
      subtitle: {
        de: "Hummus mit Falafel und Brot.",
        en: "Hummus served with falafel and bread.",
        ar: "حمص يقدم مع الفلافل والخبز.",
      },
      price: 10.0,
    },

    {
      id: 49,
      name: {
        de: "Fattoush Salat",
        en: "Fattoush Salad",
        ar: "سلطة فتوش",
      },
      subtitle: {
        de: "Tomaten, Gurke, Oliven, Radieschen, Feldsalat, geröstetes Fladenbrot und Granatapfelsauce.\nExtra: 4 Falafel +3€",
        en: "Tomatoes, cucumber, olives, radish, lettuce, toasted flatbread and pomegranate dressing.\nExtra: 4 falafel +3€",
        ar: "طماطم، خيار، زيتون، فجل، خس، خبز محمص وصلصة الرمان.\nإضافة 4 حبات فلافل +3€",
      },
      price: 8.0,
    },

    {
      id: 50,
      name: {
        de: "Halloumi Salat",
        en: "Halloumi Salad",
        ar: "سلطة حلوم",
      },
      subtitle: {
        de: "Halloumi, Tomaten, Gurke, Avocado, Granatapfel, Salat und hausgemachtes Dressing.",
        en: "Halloumi, tomatoes, cucumber, avocado, pomegranate, mixed salad and homemade dressing.",
        ar: "جبنة حلوم، طماطم، خيار، أفوكادو، رمان، سلطة مشكلة وصوص منزلي.",
      },
      price: 13.0,
    },

    {
      id: 51,
      name: {
        de: "Makloubeh",
        en: "Makloubeh",
        ar: "مقلوبة",
      },
      subtitle: {
        de: "Palästinensisches Reisgericht mit Auberginen, gerösteten Mandeln und Joghurt.",
        en: "Traditional Palestinian rice dish with eggplant, roasted almonds and yogurt.",
        ar: "طبق فلسطيني تقليدي من الأرز والباذنجان واللوز المحمص مع اللبن.",
      },
      price: 9.9,
    },

    {
      id: 52,
      name: {
        de: "Makloubeh b'lahme",
        en: "Makloubeh with Meat",
        ar: "مقلوبة باللحمة",
      },
      subtitle: {
        de: "Mit Hackfleisch (Halal), Auberginen, Reis, Mandeln und Joghurt.",
        en: "With halal minced meat, eggplant, rice, almonds and yogurt.",
        ar: "مع لحم مفروم حلال، باذنجان، أرز، لوز محمص ولبن.",
      },
      price: 12.9,
    },

    {
      id: 53,
      name: {
        de: "Levante Tomatenpfanne",
        en: "Levant Tomato Pan",
        ar: "مقلاة طماطم شامية",
      },
      subtitle: {
        de: "Geschmorte Tomaten mit Knoblauch, Basilikum und Olivenöl. Mit Fladenbrot serviert. Auf Wunsch mild.",
        en: "Stewed tomatoes with garlic, basil and olive oil. Served with flatbread. Mild on request.",
        ar: "طماطم مطهية مع الثوم والريحان وزيت الزيتون، تقدم مع الخبز العربي. يمكن طلبها بدون حار.",
      },
      price: 9.9,
    },

    {
      id: 54,
      name: {
        de: "The Sultan's Dinner",
        en: "The Sultan's Dinner",
        ar: "عشاء السلطان",
      },
      subtitle: {
        de: "Halal-Fleischbällchen in Tomatensauce mit Paprika und Zwiebeln.",
        en: "Halal meatballs in tomato sauce with peppers and onions.",
        ar: "كرات لحم حلال بصلصة الطماطم مع الفليفلة والبصل.",
      },
      price: 13.9,
    },

    {
      id: 55,
      name: {
        de: "Mac & Chicken",
        en: "Mac & Chicken",
        ar: "ماك آند تشيكن",
      },
      subtitle: {
        de: "Makkaroni mit Béchamelsauce und knusprigem Hähnchenschnitzel.",
        en: "Macaroni with béchamel sauce and crispy chicken schnitzel.",
        ar: "مكرونة بالبشاميل مع شنيتزل دجاج مقرمش.",
      },
      price: 12.9,
    },

    {
      id: 56,
      name: {
        de: "Pharao's Delight (Kushari)",
        en: "Pharaoh's Delight (Koshari)",
        ar: "كشري فرعوني",
      },
      subtitle: {
        de: "Reis, Linsen, Nudeln, Kichererbsen, Tomatensoße und Röstzwiebeln.\nNur am Wochenende.",
        en: "Rice, lentils, pasta, chickpeas, tomato sauce and crispy onions.\nOnly on weekends.",
        ar: "أرز، عدس، مكرونة، حمص، صلصة طماطم وبصل مقرمش.\nمتوفر فقط في عطلة نهاية الأسبوع.",
      },
      price: 9.9,
    },
  ],
},
];

export default lunch;