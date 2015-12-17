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

jqUnit.module("Kettle Test Utils");

kettle.tests.kettleTestUtils.runAssertJSONResponseContainsTests(kettle.tests.kettleTestUtils.assertJSONResponseContains.passingTests);
