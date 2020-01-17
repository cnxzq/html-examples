/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "qunit";
import Velocity from "velocity-animate";
import { asyncTests, defaultOptions, defaultProperties, getPropertyValue, getTarget, sleep } from "../utilities";
import "./_module";
QUnit.test("Stop", (assert) => __awaiter(this, void 0, void 0, function* () {
    asyncTests(assert, 1, (done) => {
        Velocity(getTarget(), "stop");
        assert.ok(true, "Calling on an element that isn't animating doesn't cause an error.");
        done();
    });
    asyncTests(assert, 1, (done) => {
        const $target = getTarget();
        Velocity($target, defaultProperties, defaultOptions);
        Velocity($target, { top: 0 }, defaultOptions);
        Velocity($target, { width: 0 }, defaultOptions);
        Velocity($target, "stop");
        assert.ok(true, "Calling on an element that is animating doesn't cause an error.");
        done();
    });
    asyncTests(assert, 1, (done) => __awaiter(this, void 0, void 0, function* () {
        const $target = getTarget(), startOpacity = getPropertyValue($target, "opacity");
        Velocity($target, { opacity: [0, 1] }, defaultOptions);
        yield sleep(defaultOptions.duration / 2);
        Velocity($target, "stop");
        assert.close(parseFloat(getPropertyValue($target, "opacity")), parseFloat(startOpacity) / 2, 0.1, "Animation runs until stopped.");
        done();
    }));
    asyncTests(assert, 1, (done) => __awaiter(this, void 0, void 0, function* () {
        const $target = getTarget();
        let begin = false;
        Velocity($target, { opacity: [0, 1] }, {
            delay: 1000,
            begin() {
                begin = true;
            },
        });
        yield sleep(500);
        Velocity($target, "stop");
        assert.notOk(begin, "Stop animation before delay ends.");
        done();
    }));
    asyncTests(assert, 2, (done) => __awaiter(this, void 0, void 0, function* () {
        const $target = getTarget();
        let complete1 = false, complete2 = false;
        Velocity($target, { opacity: [0, 1] }, {
            queue: "test1",
            complete() {
                complete1 = true;
            },
        });
        Velocity($target, { opacity: [0, 1] }, {
            queue: "test2",
            complete() {
                complete2 = true;
            },
        });
        Velocity($target, "stop", "test1");
        yield sleep(defaultOptions.duration * 2);
        assert.ok(complete2, "Stop animation with correct queue.");
        assert.notOk(complete1, "Don't stop animation with wrong queue.");
        done();
    }));
    asyncTests(assert, 1, (done) => __awaiter(this, void 0, void 0, function* () {
        const $target = getTarget();
        let begin1 = false, begin2 = false;
        Velocity($target, { opacity: [0, 1] }, {
            begin() {
                begin1 = true;
            },
        });
        Velocity($target, { width: "500px" }, {
            begin() {
                begin2 = true;
            },
        });
        Velocity($target, "stop", true);
        yield sleep(defaultOptions.duration * 2);
        assert.notOk(begin1 || begin2, "Stop 'true' stops all animations.");
        done();
    }));
    asyncTests(assert, 2, (done) => __awaiter(this, void 0, void 0, function* () {
        const $target = getTarget(), anim = Velocity($target, { opacity: [0, 1] }, {
            queue: "test",
            begin() {
                begin1 = true;
            },
        });
        let begin1 = false, begin2 = false;
        Velocity($target, { opacity: [0, 1] }, {
            begin() {
                begin2 = true;
            },
        });
        anim.velocity("stop");
        yield sleep(defaultOptions.duration * 2);
        assert.notOk(begin1, "Stop without arguments on a chain stops chain animations.");
        assert.ok(begin2, "Stop without arguments on a chain doesn't stop other animations.");
        done();
    }));
    assert.expect(asyncTests());
}));
//# sourceMappingURL=Command Stop.js.map