// A simple JQuery plugin that runs the value in a text box against a validation
// action and prints the results to a div.
//
// Binds to a button and runs on-click.
//
// dataSelector must be a selector that targets a textbox (your input for validation)
// resultSelector must be a selector that targets a div into which the validation results are printed
// validationAction must be a function that expects a string and returns a promise
$.fn.simpleValidator = function (dataSelector, resultSelector, validationAction) {

    // Store all this so the closure has access when we actually have to run it.
    var button = this;
    var results = $(resultSelector);
    var action = validationAction;
    var textBox = $(dataSelector);

    var validate = function() {
        var dataValidator = new simpleValidator.spinningButton(button);
        dataValidator.spinButton();

	var what = textBox.val();	

        action(what).done(function(result) {
            results.html(result);
        })
        .fail(function (data, statusText, error) {
            results.html("Error! " + status + "<br/>" + error);
        })
        .always(function() {
            dataValidator.stopButton();
        });
    };

    button.on('click', function () {
        event.preventDefault();
        validate();
    });
}

var simpleValidator = simpleValidator || {
    spinningButton: function (selector) {
        var button = $(selector);
        var spin = function () {
                if (button.children(".fa").length !== 1) {
                    button.append("<i class='fa'></i>");
                }

                $(button).children(".fa").addClass("fa-circle-o-notch fa-spin");
            },
            stop = function () {
                $(button).children(".fa").removeClass("fa-circle-o-notch fa-spin");
            };

        return {
            spinButton: spin,
            stopButton: stop
        };
    }
}