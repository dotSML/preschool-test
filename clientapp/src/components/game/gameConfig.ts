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
        {
          word: "Kiire",
          image: "KIIRE",
          match: "Aeglane",
          answer: "",
          answerImg: ""
        },
        {
          word: "Poiss",
          image: "POISS",
          match: "Tüdruk",
          answer: "",
          answerImg: ""
        },
        {
          word: "Külm",
          image: "KÜLM",
          match: "Soe",
          answer: "",
          answerImg: ""
        },
        { word: "Öö", image: "NIGHT", match: "Päev", answer: "", answerImg: "" }
      ],
      [
        { word: "Kurb", image: "KURB", match: "Rõõmus" },
        { word: "Väike", image: "VÄIKE", match: "Suur" },
        { word: "Noor", image: "NOOR", match: "Vana" },
        { word: "Kerge", image: "KERGE", match: "Raske" }
      ]
    ],
    [
      { word: "Pall", options: ["Pall", "Sall"] },
      { word: "Kuul", options: ["Kuul", "Kull"] },
      { word: "Loss", options: ["Loss", "Loos"] },
      { word: "Koll", options: ["Kool", "Koll"] },
      { word: "Nukk", options: ["Sukk", "Nukk"] },
      { word: "Nari", options: ["Kali", "Nari"] }
    ]
  ],
  imageSequence: [
    [
      { order: 3, image: "imagePath" },
      { order: 0, image: "imagePath" },
      { order: 1, image: "imagePath" },
      { order: 2, image: "imagePath" }
    ],
    [
      { order: 1, image: "imagePath" },
      { order: 0, image: "imagePath" },
      { order: 3, image: "imagePath" },
      { order: 2, image: "imagePath" }
    ]
  ],
  monthsGame: [
    "jaanuar",
    "veebruar",
    "märts",
    "aprill",
    "mai",
    "juuni",
    "juuli",
    "august",
    "september",
    "oktoober",
    "november",
    "detsember"
  ],
  weekdayGame: [
    { label: "esmaspäev", audioPath: "", order: 0 },
    { label: "teisipäev", audioPath: "", order: 1 },
    { label: "kolmapäev", audioPath: "", order: 2 },
    { label: "neljapäev", audioPath: "", order: 3 },
    { label: "reede", audioPath: "", order: 4 },
    { label: "laupäev", audioPath: "", order: 5 },
    { label: "pühapäev", audioPath: "", order: 6 }
  ],
  numberSequencingGame: [
    [
      {
        originalSequence: [2, 3, 4, 5, 6, 7, 8],
        availableNumbers: [3, 6]
      },
      {
        originalSequence: [9, 8, 7, 6, 5, 4, 3],
        availableNumbers: [7, 4]
      },
      {
        originalSequence: [4, 5, 6, 7, 8, 9, 10],
        availableNumbers: [5, 7]
      },
      {
        originalSequence: [7, 6, 5, 4, 3, 2, 1],
        availableNumbers: [4, 2]
      }
    ]
  ],
  calculationGame: [
    {
      task: "2 + 8",
      answer: 2 + 8
    },
    {
      task: "10 - 3",
      answer: 10 - 3
    },
    {
      task: "4 + 7",
      answer: 4 + 7
    },
    {
      task: "6 + 6",
      answer: 6 + 6
    },
    {
      task: "8 - 4",
      answer: 8 - 4
    },
    {
      task: "6 - 2",
      answer: 6 - 2
    },
    {
      task: "5 + 4",
      answer: 5 + 4
    },
    {
      task: "9 - 7",
      answer: 9 - 7
    },
    {
      task: "3 + 5",
      answer: 3 + 5
    },
    {
      task: "5 - 3",
      answer: 5 - 3
    }
  ],
  compareQuantitiesGame: [
    {
      questionType: "more",
      options: [
        { imgPath: "calculator.png", amount: 6 },
        { imgPath: "pencil.png", amount: 8 }
      ]
    },
    {
      questionType: "less",
      options: [
        { imgPath: "calculator.png", amount: 3 },
        { imgPath: "scarf.png", amount: 7 }
      ]
    },
    {
      questionType: "more",
      options: [
        { imgPath: "pencil.png", amount: 5 },
        { imgPath: "shoes.png", amount: 3 }
      ]
    },
    {
      questionType: "less",
      options: [
        { imgPath: "shoes.png", amount: 4 },
        { imgPath: "scarf.png", amount: 3 }
      ]
    }
  ]
};
