/**
 * Kettle WebSockets Session tests
 *
 * Copyright 2015 Raising the Floor - International
 *
 * Licensed under the New BSD license. You may not use this file except in
 * compliance with this License.
 *
 * You may obtain a copy of the License at
 * https://github.com/GPII/kettle/LICENSE.txt
 */
 
"use strict";

var fluid = require("infusion"),
    kettle = require("../kettle.js"),
    $ = fluid.registerNamespace("jQuery"),
    jqUnit = fluid.require("jqUnit"),
    path = require("path"),
    configPath = path.resolve(__dirname, "./configs");
    
require("./SessionTests.js");

fluid.defaults("kettle.tests.session.ws.testSocket.handler", {
    gradeNames: ["kettle.request.ws", "kettle.request.sessionAware"],
    listeners: {
        onMessage: "kettle.tests.session.ws.testSocket.receiveMessage"
    }
});

kettle.tests.session.ws.testSocket.receiveMessage = function (request) {
    var session = request.req.session;
    jqUnit.assertValue("Received socket message from qualified session", session);
    jqUnit.assertEquals("Session data retrieved from HTTP request", kettle.tests.session.token);
    var response = $.extend(true, {
        token: session.token
    }, kettle.tests.session.response.success);
    request.ws.send(response);
};

kettle.tests.session.ws.proto = {
    name: "WebSockets Session tests",
    expect: 26,
    config: {
        configName: "kettle.tests.session.webSockets.config",
        configPath: configPath
    },
    components: {
        wsRequest: {
            type: "kettle.test.request.ws",
            options: {
                connectOnInit: true,
                path: "/socket_path"
            }
        }
    }
};

kettle.tests.session.ws.testSocketResponse = function (that, data) {
    jqUnit.assertDeepEq("Received session-qualified socket response", kettle.tests.session.response.midSuccess, data);
};

kettle.tests.session.ws.midSequence = [ {
    func: "{wsRequest}.send",
    args: {
        index: 0,
        test: true
    }
}, {
    event: "{wsRequest}.events.onMessage",
    listener: "kettle.tests.session.ws.testSocketResponse"
}];

kettle.tests.session.ws.testDefs = $.extend(true, {}, kettle.tests.session.testDefs, kettle.tests.session.ws.proto);

kettle.tests.session.ws.spliceSequence = function () {
    var sequence = kettle.tests.session.ws.testDefs.sequence;
    var m = kettle.tests.session.ws.midSequence; // TODO: backport DISRUPTOR

    sequence.splice(6, 0, m[0], m[1]);
};

kettle.tests.session.ws.spliceSequence();

console.log("BEGINNING TO EXECUTE TESTDEFS", JSON.stringify(kettle.tests.session.ws.testDefs, null, 2));

kettle.test.bootstrapServer(kettle.tests.session.ws.testDefs);