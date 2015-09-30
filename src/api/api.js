import call from "call";
import joi from "joi";

export default function(controllers) {

    var analyze = call.Router.prototype.analyze.bind({settings: {isCaseSensitive: false}});
    var apiInterface = {};

    for (var controller in controllers) {
        apiInterface[controller] = {};

        for (var route in controllers[controller]) {

            var analysis = analyze(controllers[controller][route].path);
            console.log(controllers[controller][route]);

            if (controllers[controller][route].method.toLowerCase() == "post") {
                apiInterface[controller][route] = params => (function(params) {
                    var rules = {};

                    var params = arguments[0];
                    var payload = arguments[1];

                    if (!params || !payload) {
                        throw new Error("Both params and payload must be specified for a post request.");
                    }
                })(analysis.params);
            } else {
                apiInterface[controller][route] = params => (function(params) {
                    var rules = {};
                    var params = arguments[0];

                    if (!params && params.length > 0) {
                        throw new Error("Params must be specified for this request.", analysis.params);
                    }
                })(analysis.params);
            }


        }
    }

    apiInterface.Users.all();

    console.log(apiInterface);
    return apiInterface;
}

