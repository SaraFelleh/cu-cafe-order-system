const arabicIceCream = [
  {
    category: "Arabisches Booza",
    icon: "🍨",
    image: "/images/arabic-booza.png",

    items: [
      {
        id: 58,

        name: {
          de: "Traditionelles Arabisches Booza",
          en: "Traditional Arabic Booza",
          ar: "البوظة العربية التقليدية",
        },

        subtitle: {
          de: "Mit Ashta, Rosenwasser, Mastix und Pistazien.",
          en: "With Ashta, rose water, mastic and pistachios.",
          ar: "مع القشطة، ماء الورد، المستكة والفستق الحلبي.",
        },

        description: {
          de: `Erlebe ein jahrhundertealtes Handwerk und einen unvergleichlichen Geschmack, der direkt aus den geschichtsträchtigen Gassen Syriens in unser Café kommt.

Unser arabisches Booza ist kein gewöhnliches Eis, sondern eine lebendige Tradition. Anders als westliches Speiseeis wird die Masse von Hand geschlagen und geknetet, bis ihre berühmte elastische und cremige Konsistenz entsteht.

Verfeinert mit echter Ashta, feinem Rosenwasser und natürlichem Mastix wird das Booza anschließend in frisch gehackten Pistazien gewälzt – ein einzigartiges Geschmackserlebnis, das Tradition und Handwerkskunst vereint.`,

          en: `Experience the authentic taste of traditional Syrian Arabic Booza, prepared using a centuries-old handcrafted technique.

Unlike ordinary ice cream, Booza is beaten and kneaded by hand, creating its famous elastic and creamy texture.

Finished with authentic Ashta, delicate rose water, natural mastic and freshly chopped pistachios, every bite is a true taste of Middle Eastern tradition.`,

          ar: `استمتع بتجربة البوظة العربية السورية الأصيلة، المحضرة بالطريقة التقليدية التي توارثتها الأجيال منذ مئات السنين.

تختلف هذه البوظة عن الآيس كريم العادي، إذ تُخفق وتُعجن يدوياً حتى تكتسب قوامها المطاطي والكريمي الشهير.

تُحضّر بالقشطة الطبيعية وماء الورد والمستكة، ثم تُغطى بالفستق الحلبي الطازج لتقدم لك تجربة غنية تجمع بين الأصالة والطعم الفريد.`,
        },

        price: 6.90,

        optionLabel: {
          de: "Extras",
          en: "Extras",
          ar: "إضافات",
        },

        extras: [
          {
            id: "extra-pistachio",
            name: {
              de: "Extra Pistazien",
              en: "Extra Pistachios",
              ar: "فستق إضافي",
            },
            price: 1.2,
          },
        ],
      },
    ],
  },
];

export default arabicIceCream;