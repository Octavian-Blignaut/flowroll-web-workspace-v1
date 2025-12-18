class Example extends Phaser.Scene {
    constructor() {
        super();
        this.score = 0;
        this.stage = 1;
        this.stageThresholds = [0, 200, 500, 1000]; // score checkpoints
        this.scoreText = null;
        this.stageText = null;
    }

    preload() {
        // Load sprites
        this.load.image('player', 'https://labs.phaser.io/assets/sprites/ship.png');
        this.load.image('ship', 'https://labs.phaser.io/assets/sprites/bsquadron1.png');
        this.load.image('apple', 'https://labs.phaser.io/assets/sprites/apple.png');
        this.load.image('beball', 'https://labs.phaser.io/assets/sprites/beball1.png');
        this.load.image('clown', 'https://labs.phaser.io/assets/sprites/clown.png');
        this.load.image('ghost', 'https://labs.phaser.io/assets/sprites/ghost.png');
        this.load.image('bullet', 'https://labs.phaser.io/assets/sprites/blue.png');
    }

    create() {
        this.player = this.physics.add.image(400, 500, 'player').setScale(1.2);
        this.player.setCollideWorldBounds(true);

        // Bullets
        this.bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 20 });

        // Score + Stage UI
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#fff' });
        this.stageText = this.add.text(16, 40, 'Stage: 1', { fontSize: '20px', fill: '#0f0' });

        // Active enemies
        this.active = [];
        this.pool = [];

        const dummy = this.add.image();
        const { world } = this.physics;

        for (let i = 0; i < 100; i++) {
            const body = new Phaser.Physics.Arcade.Body(world, dummy);
            this.pool.push(body);
        }

        // Release enemies
        this.time.addEvent({ delay: 700, callback: () => this.releaseEnemy(), loop: true });

        // Controls
        this.input.on('pointermove', pointer => {
            if (pointer.y < 550) { // gameplay area
                this.player.x = pointer.worldX;
                this.player.y = pointer.worldY;
            }
        });

        // Mobile trackpad zone (bottom area)
        this.trackPad = this.add.zone(0, 550, 800, 50).setOrigin(0);
        this.trackPad.setInteractive();
        this.trackPad.on('pointermove', pointer => {
            this.player.x = Phaser.Math.Clamp(pointer.x, 0, 800);
        });

        // Shoot bullets with SPACE / tap top half
        this.input.keyboard.on('keydown-SPACE', () => this.shootBullet());
        this.input.on('pointerdown', pointer => {
            if (pointer.y < 550) this.shootBullet();
        });

        // Collisions
        this.physics.add.overlap(this.player, this.active, (player, enemy) => this.handleCollision(enemy));
        this.physics.add.overlap(this.bullets, this.active, (bullet, enemy) => this.bulletHitsEnemy(bullet, enemy));
    }

    update() {
        this.checkEnemyBounds();
        this.checkStageProgress();
    }

    checkEnemyBounds() {
        const { world } = this.physics;
        for (let i = this.active.length - 1; i >= 0; i--) {
            const enemy = this.active[i];
            if (enemy.y > 650) {
                this.recycleEnemy(enemy, i);
            }
        }
    }

    releaseEnemy() {
        if (this.pool.length === 0) return;
        const body = this.pool.pop();
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(-200, 0);
        const frames = ['ship', 'apple', 'beball', 'clown', 'ghost'];
        const enemy = this.add.image(x, y, Phaser.Utils.Array.GetRandom(frames));
        enemy.body = body;
        body.gameObject = enemy;
        body.setSize(enemy.width, enemy.height);
        this.physics.world.add(body);

        // Stage-based velocity
        let speed = Phaser.Math.Between(100, 200);
        if (this.stage === 2) speed = Phaser.Math.Between(200, 300);
        if (this.stage === 3) speed = Phaser.Math.Between(300, 400);

        body.setVelocity(0, speed);
        this.active.push(enemy);
    }

    recycleEnemy(enemy, index) {
        const { world } = this.physics;
        if (enemy.body) {
            world.disableBody(enemy.body);
            enemy.body.gameObject = undefined;
            this.pool.push(enemy.body);
            enemy.body = undefined;
        }
        enemy.destroy();
        this.active.splice(index, 1);
    }

    shootBullet() {
        const bullet = this.bullets.get(this.player.x, this.player.y - 20);
        if (bullet) {
            bullet.setActive(true).setVisible(true).setScale(0.6);
            bullet.body.allowGravity = false;
            bullet.setVelocityY(-400);

            this.time.delayedCall(2000, () => {
                if (bullet.active) bullet.destroy();
            });
        }
    }

    bulletHitsEnemy(bullet, enemy) {
        bullet.destroy();
        this.handleCollision(enemy, true); // "true" → shot, not player collision
    }

    handleCollision(enemy, byBullet = false) {
        const index = this.active.indexOf(enemy);
        if (index !== -1) this.recycleEnemy(enemy, index);

        if (enemy.texture.key === 'ghost') {
            if (!byBullet) {
                this.score -= 30;
                this.tweens.add({
                    targets: this.player,
                    tint: 0xff0000,
                    yoyo: true,
                    repeat: 2,
                    duration: 100,
                    onComplete: () => this.player.clearTint()
                });
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
            this.add.text(200, 280, 'YOU WON THE COSMIC DUEL!', {
                fontSize: '32px',
                fill: '#00ffcc'
            });
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1a1a2e',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: Example
};

const game = new Phaser.Game(config);
