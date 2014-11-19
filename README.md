This is probably fairly straightforward, but I find myself constantly making boilerplate plugins like this. simple-validator is a small, opinionated validator that is useful for checking text in textboxes against external APIs.

This is helpful in the following flow:

* Given: an input textbox that *may* be validated (not required)
* Given: a "validate" button that may or may not be clicked before the user submits the form
* Given: a "validation message" span
* When: The user clicks the "validate" button.
* Then: The text in the input textbox is submitted to an external API via AJAX
* And: The results are printed to the "validation message" span

If you need something bigger, better, and more powerful, look toward [jquery-validation](http://jqueryvalidation.org) or any of the myriad other validation plugins.

### Dependencies ###
* JQuery (probably any version. this was written against 2.0.3 fwiw)

#### Optional ####
* [font-awesome](http://fortawesome.github.io/Font-Awesome/) (4.1.0 and 4.2.0 have been tested, but it just uses that cute little spinning circle)

### How To Use ###
Basically, you bind it to your button, tell it how to find your input and output elements, and tell it what it's supposed to use for a validator.

```javascript
$("#button").simpleValidator("#textbox", "#messagespan", validationFunction);
```

### Demo ###

There is a demo file in this gist. You can see it live [here](https://cdn.rawgit.com/maclennann/jquery-simplevalidator/8bb34d11238d98b460053b96035a82ae90a53d80/demo.html).

![](http://blog.normmaclennan.com/content/images/2014/Nov/simplevalidator.gif)

### Advanced Usage ###

This is getting a little bit into "use a real plugin" territory, but javascript's golden rule is "you can make anything do anything if you try hard enough."

So maybe you want your button to validate an entire form instead of just a single input textbox? Sure.

```javascript
    // A small abuse of simpleValidator by not providing an inputSelector and making our in-line
    // validation function read the entire form.
    $('#formsubmit').simpleValidator(null, "#validation", function() {
        event.preventDefault();
        var item1 = $("#item1").val();
        var item2 = $("#item2").val();
        var item3 = $("#item3").val();
        var item4 = $("#item4").val();
        var item5 = $("#item5").val();

        var url = '/validate/my/form';

        return an.ajax.call.wrapper(url, item1, item2, item3, item4, item5);
    });
```
