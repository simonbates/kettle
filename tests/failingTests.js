/**
 * Kettle Tests
 *
 * Copyright 2015 OCAD University
 *
 * Licensed under the New BSD license. You may not use this file except in
 * compliance with this License.
 *
 * You may obtain a copy of the License at
 * https://github.com/gpii/universal/LICENSE.txt
 */

"use strict";

var fluid = require("infusion"),
    kettle = require("../kettle.js"),
    jqUnit = fluid.require("node-jqunit", require, "jqUnit");

require("./KettleTestUtilsTestDefs.js");

var colors = fluid.registerNamespace("colors");

kettle.test.makeTestsDoneChecker = function (expectedPassed, expectedFailed) {
    return function (data) {
        if (data.passed === expectedPassed && data.failed === expectedFailed) {
            console.log(colors.stylize("Tests passed and failed as expected: OK", ["green", "bold"]));
        } else {
            console.log("Unexpected passed or failed tests: " + data.passed + " tests passed, expected " + expectedPassed + "; " + data.failed + " tests failed, expected " + expectedFailed);
        }
    };
};

jqUnit.module("Failing Kettle Tests");

jqUnit.onAllTestsDone.addListener(kettle.test.makeTestsDoneChecker(6, 3));

kettle.tests.kettleTestUtils.runAssertJSONResponseContainsTests(kettle.tests.kettleTestUtils.assertJSONResponseContains.failingTests);
