const Helpers = (() => {
  const text = (scene, positionX, positionY, btnDetail, textSize) => {
    const text = scene.add.text(positionX, positionY, btnDetail, {
      fontSize: textSize,
    });
    text.setOrigin(0.5);
    return text;
  };

  return {
    text,
  };
})();

export default Helpers;
