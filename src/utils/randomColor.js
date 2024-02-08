const randomColor = () => {
  const mainColor = Math.floor(Math.random()*16777215).toString(16);
  const r = (255 - parseInt(mainColor.substring(0,2),16));
  const g = (255 - parseInt(mainColor.substring(2,4),16));
  const b = (255 - parseInt(mainColor.substring(4,6),16));
  const lum = 0.299*r + 0.587*g + 0.114*b; //computing brightness(y) from yiq
  const contrColor = lum<127?'000':'fff';
  return {
    main: '#'+mainColor,
    contrast: '#'+contrColor
  }
};

export default randomColor;