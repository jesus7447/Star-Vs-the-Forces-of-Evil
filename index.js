let level = [];

level[0] = {
    maze: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    player: {
        x: 0,
        y: 1

    },
    goal: {
        x: 14,
        y: 13
    },
    theme: 'default'
};

class Maze {
    constructor(id, level) {
        this.element = document.getElementById(id);
        this.tileTypes = ['floor', 'wall'];
        this.tileDim = 30;
        this.maze = level.maze;
        this.theme = level.theme;
        this.player = { ...level.player};
        this.goal = { ...level.goal};
    }

    populateMaze() {
        this.element.className = 'game-container ' + this.theme;
        let tiles = document.getElementById('tiles');
        for (var y = 0; y < this.maze.length; ++y) {
            for (var x = 0; x < this.maze[y].length; ++x) {
                let tileCode = this.maze[y][x];
                let tileType = this.tileTypes[tileCode];
                let tile = this.createEl(x, y, tileType);
                tiles.appendChild(tile);
            }
        }
    }

    createEl(x, y, type) {
        let element = document.createElement('div');
        element.className = type;
        element.style.width = element.style.height = this.tileDim + 'px';
        element.style.left = x * this.tileDim + 'px';
        element.style.top = y * this.tileDim + 'px';
        return element;
    }

    placeSprite(type) {
        let x = this[type].x;
        let y = this[type].y;
        let sprite = this.createEl(x, y, type);
        sprite.id = type;
        let layer = this.element.querySelector('#sprites');
        layer.appendChild(sprite);
        return sprite;
    }

    sizeUp() {
        let maze = this.element.querySelector('.game-map');
        maze.style.height = this.maze.length * this.tileDim + 'px';
        maze.style.width = this.maze[0].length * this.tileDim + 'px';
    }

    movePlayer(event) {
        if (event.keyCode < 37 || event.keyCode > 40) {
            return;
        }
        switch (event.keyCode) {
            case 37:
                this.moveLeft();
                break;
            case 38:
                this.moveUp();
                break;
            case 39:
                this.moveRight();
                break;
            case 40:
                this.moveDown();
                break;
        }
    }

    findMarco() {
        let body = document.querySelector('body');
        if (this.player.y == this.goal.y &&
            this.player.x == this.goal.x) {
            body.className = 'success';
        }
        else {
            body.className = '';
        }
    }

    keyboardListener() {
        document.addEventListener('keydown', event => {
            this.movePlayer(event);
            this.findMarco();
        });
    }

    moveLeft() {
        if (this.player.x == 0) {
            return;
        }
        let nextTile = this.maze[this.player.y][this.player.x - 1];
        if (nextTile == 1) {
            return;
        }
        this.player.x -= 1;
        this.updateHoriz();
    }

    moveUp() {
        if (this.player.y == 0) {
            return;
        }
        let nextTile = this.maze[this.player.y - 1][this.player.x];
        if (nextTile == 1) {
            return;
        }
        this.player.y -= 1;
        this.updateVert();
    }

    moveRight() {
        if (this.player.x == this.maze[this.player.y].length - 1) {
            return;
        }
        let nextTile = this.maze[this.player.y][this.player.x + 1];
        if (nextTile == 1) {
            return;
        }
        this.player.x += 1;
        this.updateHoriz();
    }

    moveDown() {
        if (this.player.y == this.maze.length - 1) {
            return;
        }
        let nextTile = this.maze[this.player.y + 1][this.player.x];
        if (nextTile == 1) {
            return;
        }
        this.player.y += 1;
        this.updateVert();
    }

    updateHoriz() {
        this.player.element.style.left = this.player.x * this.tileDim + 'px';
    }

    updateVert() {
        this.player.element.style.top = this.player.y * this.tileDim + 'px';
    }
}

const createMaze = () => {
    let myMaze = new Maze('game-container-1', level[0]);
    myMaze.populateMaze();
    myMaze.sizeUp();
    myMaze.placeSprite('goal');
    let playerSprite = myMaze.placeSprite('player');
    myMaze.player.element = playerSprite;
    myMaze.keyboardListener();
}

createMaze();
