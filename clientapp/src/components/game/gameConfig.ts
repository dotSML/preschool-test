export const gameConfig = {
  audioToTextGame: [
    {
      question: "Mis lasteaias lapsed käisid?",
      options: [
        { label: "Karu", correct: false },
        { label: "Vikerkaare", correct: true }
      ]
    },
    {
      question: "Mis aastaajal tegevus toimus?",
      options: [
        { label: "Talv", correct: false },
        { label: "Kevad", correct: true }
      ]
    },
    {
      question: "Mis oli mingi lapse nimi?",
      options: [
        { label: "Madis", correct: false },
        { label: "Mart", correct: true }
      ]
    }
  ],
  dragWordToPictureGame: [
    [
      {
        answer: "Karu",
        options: [
          {
            word: "Karu",
            image: "/images/matchWordWithPictureGame/bearDrawing.png"
          },
          {
            word: "Auto",
            image: "/images/matchWordWithPictureGame/carDrawing.png"
          },
          {
            word: "Orav",
            image: "/images/matchWordWithPictureGame/squirrelDrawing.png"
          }
        ]
      },
      {
        answer: "Hobune",
        options: [
          {
            word: "Auto",
            image: "/images/matchWordWithPictureGame/carDrawing.png"
          },
          {
            word: "Rebane",
            image: "/images/matchWordWithPictureGame/foxDrawing.png"
          },
          {
            word: "Hobune",
            image: "/images/matchWordWithPictureGame/horseDrawing.png"
          }
        ]
      },
      {
        answer: "Kõrvits",
        options: [
          {
            word: "Nukk",
            image: "/images/matchWordWithPictureGame/dollDrawing.png"
          },
          {
            word: "Cabbage",
            image: "/images/matchWordWithPictureGame/cabbageDrawing.png"
          },
          {
            word: "Kõrvits",
            image: "/images/matchWordWithPictureGame/pumpkinDrawing.png"
          }
        ]
      },
      {
        answer: "Aken",
        options: [
          {
            word: "Kapsas",
            image: "/images/matchWordWithPictureGame/cabbageDrawing.png"
          },
          {
            word: "Aken",
            image: "/images/matchWordWithPictureGame/windowDrawing.png"
          },
          {
            word: "Nukk",
            image: "/images/matchWordWithPictureGame/dollDrawing.png"
          }
        ]
      },
      {
        answer: "Orav",
        options: [
          {
            word: "Rebane",
            image: "/images/matchWordWithPictureGame/foxDrawing.png"
          },
          {
            word: "Karu",
            image: "/images/matchWordWithPictureGame/bearDrawing.png"
          },
          {
            word: "Orav",
            image: "/images/matchWordWithPictureGame/squirrelDrawing.png"
          }
        ]
      },
      {
        answer: "Auto",
        options: [
          {
            word: "Lill",
            image: "/images/matchWordWithPictureGame/flowerDrawing.png"
          },
          {
            word: "Auto",
            image: "/images/matchWordWithPictureGame/carDrawing.png"
          },
          {
            word: "Kõrvits",
            image: "/images/matchWordWithPictureGame/pumpkinDrawing.png"
          }
        ]
      },
      {
        answer: "Nukk",
        options: [
          {
            word: "Kapsas",
            image: "/images/matchWordWithPictureGame/cabbageDrawing.png"
          },
          {
            word: "Lill",
            image: "/images/matchWordWithPictureGame/flowerDrawing.png"
          },
          {
            word: "Nukk",
            image: "/images/matchWordWithPictureGame/dollDrawing.png"
          }
        ]
      },
      {
        answer: "Kapsas",
        options: [
          {
            word: "Auto",
            image: "/images/matchWordWithPictureGame/carDrawing.png"
          },
          {
            word: "Kapsas",
            image: "/images/matchWordWithPictureGame/cabbageDrawing.png"
          },
          {
            word: "Kõrvits",
            image: "/images/matchWordWithPictureGame/pumpkinDrawing.png"
          }
        ]
      },
      {
        answer: "Rebane",
        options: [
          {
            word: "Karu",
            image: "/images/matchWordWithPictureGame/bearDrawing.png"
          },
          {
            word: "Rebane",
            image: "/images/matchWordWithPictureGame/foxDrawing.png"
          },
          {
            word: "Hobune",
            image: "/images/matchWordWithPictureGame/horseDrawing.png"
          }
        ]
      },
      {
        answer: "Lill",
        options: [
          {
            word: "Kapsas",
            image: "/images/matchWordWithPictureGame/cabbageDrawing.png"
          },
          {
            word: "Kõrvits",
            image: "/images/matchWordWithPictureGame/pumpkinDrawing.png"
          },
          {
            word: "Lill",
            image: "/images/matchWordWithPictureGame/flowerDrawing.png"
          }
        ]
      }
    ],
    [
      [
        { word: "Kiire", image: "KIIRE", match: "Aeglane" },
        { word: "Poiss", image: "POISS", match: "Tüdruk" },
        { word: "Külm", image: "KÜLM", match: "Soe" },
        { word: "Öö", image: "NIGHT", match: "Päev" }
      ],
      [
        { word: "Kurb", image: "KURB", match: "Rõõmus" },
        { word: "Väike", image: "VÄIKE", match: "Suur" },
        { word: "Noor", image: "NOOR", match: "Vana" },
        { word: "Kerge", image: "KERGE", match: "Raske" }
      ]
    ]
  ]
};
