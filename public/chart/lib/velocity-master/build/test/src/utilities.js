/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
import "qunit";
import Velocity from "velocity-animate";
export const $ = (window.jQuery || window.Zepto), $qunitStage = document.getElementById("qunit-stage"), defaultStyles = {
    opacity: 1,
    width: 1,
    height: 1,
    marginBottom: 1,
    colorGreen: 200,
    textShadowBlur: 3,
}, defaultProperties = {
    opacity: String(defaultStyles.opacity / 2),
    width: defaultStyles.width * 2 + "px",
    height: defaultStyles.height * 2 + "px",
}, defaultOptions = {
    queue: "",
    duration: 300,
    easing: "swing",
    begin: null,
    complete: null,
    progress: null,
    loop: false,
    delay: 0,
    mobileHA: true,
}, asyncCheckDuration = defaultOptions.duration / 2, completeCheckDuration = defaultOptions.duration * 2, IE = (() => {
    if (document.documentMode) {
        return document.documentMode;
    }
    else {
        for (let i = 7; i > 0; i--) {
            let div = document.createElement("div");
            div.innerHTML = `<!${"--"}[if IE ${i}]><span></span><![endif]-->`;
            if (div.getElementsByTagName("span").length) {
                div = null;
                return i;
            }
            div = null;
        }
    }
    return undefined;
})();
const targets = [];
let asyncCount = 0;
QUnit.config.reorder = false;
export function applyStartValues(element, startValues) {
    $.each(startValues, (property, startValue) => {
        element.style[property] = startValue;
    });
}
export function Data(element) {
    return (element.jquery ? element[0] : element).velocityData;
}
export function getNow() {
    return performance && performance.now ? performance.now() : Date.now();
}
export function getPropertyValue(element, property) {
    return Velocity(element, "style", property);
}
export function getTarget(startValues) {
    const div = document.createElement("div");
    div.className = "target";
    div.style.opacity = String(defaultStyles.opacity);
    div.style.color = `rgb(125, ${defaultStyles.colorGreen}, 125)`;
    div.style.width = defaultStyles.width + "px";
    div.style.height = defaultStyles.height + "px";
    div.style.marginBottom = defaultStyles.marginBottom + "px";
    div.style.textShadow = `0px 0px ${defaultStyles.textShadowBlur}px red`;
    $qunitStage.appendChild(div);
    targets.push(div);
    if (startValues) {
        applyStartValues(div, startValues);
    }
    return div;
}
export function once(func) {
    let done, result;
    return function () {
        if (!done) {
            result = func.apply(this, arguments);
            func = done = true; // Don't care about type, just let the GC collect if possible
        }
        return result;
    };
}
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export function asyncTests(assert, count, callback) {
    if (!assert) {
        const oldCount = asyncCount;
        asyncCount = 0;
        return oldCount;
    }
    const done = assert.async(1);
    asyncCount += count;
    setTimeout(() => {
        callback(done);
    }, 1);
}
export function isEmptyObject(variable) {
    for (const name in variable) {
        if (variable.hasOwnProperty(name)) {
            return false;
        }
    }
    return true;
}
QUnit.testDone(() => {
    try {
        document.querySelectorAll(".velocity-animating")
            .velocity("stop");
    }
    catch (_a) {
        // We don't care if it fails.
    }
    // Free all targets requested by the current test.
    while (targets.length) {
        try {
            $qunitStage.removeChild(targets.pop());
        }
        catch (_b) {
            // We don't care if it fails.
        }
    }
    // Ensure we have reset the test counter.
    asyncTests();
    // Make sure Velocity goes back to defaults.
    Velocity.defaults.reset();
});
/* Cleanup */
QUnit.done((details) => {
    //	$(".velocity-animating").velocity("stop");
    console.log("Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime);
});
/* Helpful redirect for testing custom and parallel queues. */
// var $div2 = $("#DataBody-PropertiesDummy");
// $.fn.velocity.defaults.duration = 1000;
// $div2.velocity("scroll", { queue: "test" })
// $div2.velocity({width: 100}, { queue: "test" })
// $div2.velocity({ borderWidth: 50 }, { queue: "test" })
// $div2.velocity({height: 20}, { queue: "test" })
// $div2.velocity({marginLeft: 200}, { queue: "test" })
// $div2.velocity({paddingTop: 60});
// $div2.velocity({marginTop: 100});
// $div2.velocity({paddingRight: 40});
// $div2.velocity({marginTop: 0})
// $div2.dequeue("test")
//# sourceMappingURL=utilities.js.map