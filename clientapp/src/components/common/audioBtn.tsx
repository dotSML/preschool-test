import React, { CSSProperties, useEffect, useMemo, useState } from "react";

const AudioBtn: React.FC<{ style?: CSSProperties; audioFile: string }> = ({
  style,
  audioFile
}) => {
  const [isPlaying, setPlaying] = useState<boolean>(false);

  const audio = useMemo(
    () => new Audio(process.env.PUBLIC_URL + "/audio/" + audioFile),
    []
  );

  const handleClick = () => {
    setPlaying(c => !c);
  };

  useEffect(() => {
    if (isPlaying) {
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <img
      alt="Play Audio"
      style={{
        ...style,
        border: isPlaying ? "1px solid black" : "none"
      }}
      onClick={handleClick}
      src={process.env.PUBLIC_URL + "/icons/audio.svg"}
      className="audio-btn"
    />
  );
};

export default AudioBtn;
