/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Based on animate.css: https://github.com/daneden/animate.css
 */
import Velocity from "velocity-animate";
Velocity("registerSequence", "flipOutY", {
    "duration": 750,
    "0%,100%": {
        backfaceVisibility: "visible",
    },
    "0%": {
        transform: "perspective(400px) rotate3d(0,1,0,0)",
    },
    "30%": {
        opacity: "1",
        transform: "perspective(400px) rotate3d(0,1,0,-20deg)",
    },
    "100%": {
        opacity: "0",
        transform: "perspective(400px) rotate3d(0,1,0,90deg)",
    },
});
//# sourceMappingURL=flipOutY.js.map