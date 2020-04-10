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
    {
      answer: "Karu",
      options: [
        {
          word: "Karu",
          image: "/images/bearDrawing.png"
        },
        {
          word: "Auto",
          image: "/images/carDrawing.png"
        },
        {
          word: "Orav",
          image: "/images/squirrelDrawing.png"
        }
      ]
    }
  ]
};
