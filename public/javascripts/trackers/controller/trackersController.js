import * as trackersListView from "../views/trackersListView";

"use strict"

export class TrackersController {
    constructor() {
        this.trackersListView = trackersListView;
    }
    init() {
        this.trackersListView.init();
    }
}