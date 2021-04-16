// Copyright (C) 2019 Scott Henshaw
'use strict';

import Level from "./Level.js";

import World from "./World.js";

export default class Game {

    constructor() {
        // put all the UI and setup here
        this.lastUpdate = 0;
        this.entityList = [];
        this.world = new World();

        // TODO: Find a way for user to change level or user id
        this.userID = 'pg20gabriel';
        this.levelName = 'TestLevel';

        this.currentLevel = new Level(this.world.GetWorld(), 'TestLevel', 'pg20gabriel');
        this.currentLevel.load()
            .then(levelData => {

                this.entityList = this.currentLevel.handleLoadLevel(levelData);
                this.run();
            });

        // add all UI handlers here
    }

    update(deltaTime) {

        this.world.update(deltaTime);
    }

    render(deltaTime) {

        //this.world.render(deltaTime);
        this.entityList.forEach(entity => {
            entity.render(deltaTime);
        });
    }

    run(timestep = 0) {

        let deltaTime = timestep - this.lastUpdate;

        this.update(deltaTime);
        this.render(deltaTime);

        window.requestAnimationFrame(timestep => this.run(timestep / 100));
    }
}