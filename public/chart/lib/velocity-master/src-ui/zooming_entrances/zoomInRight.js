"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const velocity_animate_1 = require("velocity-animate");
velocity_animate_1.default("registerSequence", "zoomInRight", {
    "duration": 1000,
    "0%": {
        opacity: "0",
        transform: "scale3d(0.1,0.1,0.1) translate3d(1000px,0,0)",
    },
    "60%": {
        opacity: "1",
        transform: ["scale3d(0.475,0.475,0.475) translate3d(-10px,0,0)", "easeInCubic"],
    },
    "100%": {
        transform: ["scale3d(1,1,1) translate3d(0,0,0)", [0.175, 0.885, 0.32, 1]],
    },
});
