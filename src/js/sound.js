const Sound = (() => {
  const musicConfiguration = (scene, audioID, volumeLevel = 1) => {
    scene.music = scene.sound.add(audioID);
    scene.musicConfig = {
      mute: false,
      volume: volumeLevel,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    scene.music.play(scene.musicConfig);
  };

  return {
    musicConfiguration,
  };
})();

export default Sound;
