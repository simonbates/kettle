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

kettle.loadTestingSupport();

fluid.registerNamespace("kettle.tests.kettleTestUtils.assertJSONResponseContains");

kettle.tests.kettleTestUtils.jsonResponseBody = "{ \"gradeNames\": [\"fluid.component\"], \"events\": { \"onCreate\": null } }";

kettle.tests.kettleTestUtils.jsonResponseRequest = {
    nativeResponse: {
        statusCode: 200,
        headers: {
            "content-type": "application/json"
        }
    }
};

kettle.tests.kettleTestUtils.jsonResponseRequestWithTextContentType = {
    nativeResponse: {
        statusCode: 200,
        headers: {
            "content-type": "text/plain"
        }
    }
};

kettle.tests.kettleTestUtils.assertJSONResponseContains.options = {
    message: "Test options",
    expected: {
        gradeNames: ["fluid.component"]
    },
    string: kettle.tests.kettleTestUtils.jsonResponseBody,
    request: kettle.tests.kettleTestUtils.jsonResponseRequest,
    statusCode: 200
};

kettle.tests.kettleTestUtils.assertJSONResponseContains.passingTests = [
    {
        name: "assertJSONResponseContains on good response",
        variation: {}
    }
];

kettle.tests.kettleTestUtils.assertJSONResponseContains.failingTests = [
    {
        name: "assertJSONResponseContains on bad body",
        variation: {
            expected: {
                events: {
                    onDestroy: null
                }
            }
        }
    },
    {
        name: "assertJSONResponseContains on bad status code",
        variation: {
            statusCode: 400
        }
    },
    {
        name: "assertJSONResponseContains on bad content-type",
        variation: {
            request: kettle.tests.kettleTestUtils.jsonResponseRequestWithTextContentType
        }
    }
];

kettle.tests.kettleTestUtils.runAssertJSONResponseContainsTests = function (testCases) {
    fluid.each(testCases, function (testCase) {
        jqUnit.test(testCase.name, function () {
            kettle.test.assertJSONResponseContains(fluid.extend({}, kettle.tests.kettleTestUtils.assertJSONResponseContains.options, testCase.variation));
        });
    });
};
