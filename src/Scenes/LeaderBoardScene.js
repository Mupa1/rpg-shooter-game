import Phaser from 'phaser';

import scoreAPI from '../js/scoreAPI';
import Text from '../js/text';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  async create() {
    const width = this.scale.width * 0.5;

    const response = await scoreAPI.getScores();
    const sortedScores = response.result.sort((a, b) => b.score - a.score);
    let player = '';
    for (let i = 0; i < 6; i += 1) {
      player += `${i + 1}. ${sortedScores[i].user}: ${sortedScores[i].score
      }\n\n`;
      if (i === sortedScores.length - 1) {
        break;
      }
    }

    this.title = Text.text(
      this,
      width,
      80,
      'TOP SCORES',
      42,
    );

    this.playerScore = Text.text(
      this,
      width,
      320,
      player,
      28,
    );

    this.LeaderBoardButton = this.add.sprite(width, 520, 'blueButton1').setInteractive();
    this.LeaderBoardText = Text.text(this, 0, 0, 'Menu', 26);
    this.centerButtonText(this.LeaderBoardText, this.LeaderBoardButton);
    this.LeaderBoardButton.on('pointerdown', () => {
      this.game.sound.stopAll();
      this.scene.start('Title');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }


  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
