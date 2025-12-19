class Example extends Phaser.Scene {
    constructor() {
        super({ key: 'Example' });
        this.score = 0;
        this.stage = 1;
        this.stageThresholds = [0, 200, 500, 1000];
    }

    preload() {
        this.load.image('player', '/proxy?url=https%3A%2F%2Flabs.phaser.io%2Fassets%2Fsprites%2Fship.png');
        this.load.image('ship', '/proxy?url=https%3A%2F%2Flabs.phaser.io%2Fassets%2Fsprites%2Fbsquadron1.png');
        this.load.image('apple', '/proxy?url=https%3A%2F%2Flabs.phaser.io%2Fassets%2Fsprites%2Fapple.png');
        this.load.image('beball', '/proxy?url=https%3A%2F%2Flabs.phaser.io%2Fassets%2Fsprites%2Fbeball1.png');
        this.load.image('clown', '/proxy?url=https%3A%2F%2Flabs.phaser.io%2Fassets%2Fsprites%2Fclown.png');
        this.load.image('ghost', '/proxy?url=https%3A%2F%2Flabs.phaser.io%2Fassets%2Fsprites%2Fghost.png');
        this.load.image('bullet', '/proxy?url=https%3A%2F%2Flabs.phaser.io%2Fassets%2Fsprites%2Fblue.png');
    }

    create() {
        // Player
        this.player = this.physics.add.sprite(400, 500, 'player').setScale(1.2).setCollideWorldBounds(true);

        // Groups
        this.bullets = this.physics.add.group({ classType: Phaser.Physics.Arcade.Image, maxSize: 20 });
        this.enemies = this.physics.add.group();

        // UI
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#fff' });
        this.stageText = this.add.text(16, 40, 'Stage: 1', { fontSize: '20px', fill: '#0f0' });

        // Spawn loop
        this.time.addEvent({ delay: 700, callback: this.spawnEnemy, callbackScope: this, loop: true });

        // Controls
        this.input.on('pointermove', pointer => {
            if (pointer.y < 550) {
                this.player.x = pointer.worldX;
                this.player.y = pointer.worldY;
            }
        });

        const trackPad = this.add.zone(0, 550, 800, 50).setOrigin(0).setInteractive();
        trackPad.on('pointermove', pointer => {
            this.player.x = Phaser.Math.Clamp(pointer.x, 0, 800);
        });

        this.input.keyboard.on('keydown-SPACE', () => this.shootBullet());
        this.input.on('pointerdown', pointer => { if (pointer.y < 550) this.shootBullet(); });

        // Collisions
        this.physics.add.overlap(this.player, this.enemies, (p, e) => this.handleCollision(e, false));
        this.physics.add.overlap(this.bullets, this.enemies, (b, e) => { this.bulletHitsEnemy(b, e); });
    }

    update() {
        this.enemies.children.each(enemy => {
            if (enemy.y > 650) enemy.destroy();
        }, this);

        this.checkStageProgress();
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(-200, 0);
        const frames = ['ship', 'apple', 'beball', 'clown', 'ghost'];
        const key = Phaser.Utils.Array.GetRandom(frames);
        const enemy = this.enemies.create(x, y, key);

        let speed = Phaser.Math.Between(100, 200);
        if (this.stage === 2) speed = Phaser.Math.Between(200, 300);
        if (this.stage >= 3) speed = Phaser.Math.Between(300, 400);

        enemy.body.setVelocity(0, speed);
        enemy.setData('type', key);
    }

    shootBullet() {
        const bx = this.player.x;
        const by = this.player.y - 20;
        const bullet = this.bullets.get(bx, by, 'bullet');
        if (!bullet) return;
        bullet.setActive(true).setVisible(true).setScale(0.6);
        bullet.body.allowGravity = false;
        bullet.body.setVelocityY(-400);
        this.time.delayedCall(2000, () => { if (bullet && bullet.active) bullet.destroy(); });
    }

    bulletHitsEnemy(bullet, enemy) {
        if (bullet && bullet.destroy) bullet.destroy();
        if (enemy && enemy.destroy) {
            const type = enemy.getData('type');
            enemy.destroy();
            if (type === 'ghost') {
                // bullets shouldn't penalize score
            } else {
                this.score += 10;
            }
            this.scoreText.setText('Score: ' + this.score);
        }
    }

    handleCollision(enemy, byBullet = false) {
        if (!enemy) return;
        const type = enemy.getData('type') || enemy.texture && enemy.texture.key;
        enemy.destroy();

        if (type === 'ghost') {
            if (!byBullet) {
                this.score -= 30;
                this.tweens.add({ targets: this.player, tint: 0xff0000, yoyo: true, repeat: 2, duration: 100, onComplete: () => this.player.clearTint() });
            }
        } else {
            this.score += 10;
        }

        this.scoreText.setText('Score: ' + this.score);

        if (this.score < 0) {
            this.physics.pause();
            this.add.text(250, 300, 'GAME OVER', { fontSize: '40px', fill: '#ff4444' });
        }
    }

    checkStageProgress() {
        if (this.stage < 3 && this.score >= this.stageThresholds[this.stage]) {
            this.stage++;
            this.stageText.setText('Stage: ' + this.stage);
        } else if (this.stage === 3 && this.score >= this.stageThresholds[3]) {
            this.physics.pause();
            this.add.text(200, 280, 'YOU WON THE COSMIC DUEL!', { fontSize: '32px', fill: '#00ffcc' });
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1a1a2e',
    parent: 'phaser-example',
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: Example
};

new Phaser.Game(config);
