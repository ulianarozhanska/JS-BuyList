$(function(){
    var TEMPLATE = $(".template").html();
    var RIGHT_TEMPLATE = $(".rightTemplate").html();
    var $boughtList = $(".boughtGoods");
    var $notBoughtList = $(".goodsToBuy");

    function editAnimated($node, editFn) {
        $node.fadeOut(200, function () {
            editFn();
            $node.fadeIn(200);
        })
    }

    function addItem(titleOfTheGood) {
        var $node = $(TEMPLATE);
        var $nodeR = $(RIGHT_TEMPLATE);

        var $title = $node.find(".title");
        $title.text(titleOfTheGood);
        var $titleR = $nodeR.find(".titleToBuy");
        $titleR.text(titleOfTheGood);

        var amount = 1;
        var $amount = $node.find(".amountLabel");
        $amount.text(amount);
        var $amountR = $nodeR.find(".amountToBuy");
        $amountR.text(amount);

        var isBought = false;

        var $editInput = $node.find(".editTitle");

        $title.click(function () {
           if(!isBought) {
               editAnimated($node, function(){
                   $editInput.val(titleOfTheGood);
                   $title.css("display", "none");
                   $editInput.css("display", "inline-block");
                   $editInput.css("value", $title.text());
                   $editInput.focus();
               })
           }
        });

        $editInput.focusout(function () {
            titleOfTheGood = $editInput.val();
            $title.text(titleOfTheGood);
            $title.css("display", "inline-block");
            $editInput.css("display", "none");
            $titleR.text(titleOfTheGood);
        });

        $node.find(".plusButton").click(function () {
            amount += 1;
            $amount.text(amount);
            //$amount.css("display", "inline-block");
            if (amount > 1){
                $node.find(".minusButton").css("background-color", "#DB2828");
                $node.find(".minusButton").css("border-color", "#DB2828");
            }
            $amountR.text(amount);
        });

        $node.find(".minusButton").click(function () {
            if (amount > 1) {
                amount -= 1;
                $amount.text(amount);
                if (amount == 1){
                    $node.find(".minusButton").css("background-color", "#ff5b4b");
                    $node.find(".minusButton").css("border-color", "#ff5b4b");
                }
                $amountR.text(amount);
            }
        });

        $node.find(".buyButton").click(function () {
            editAnimated($node, function () {
                $node.find(".buyButton").css("display", "none");
                $node.find(".deleteButton").css("display", "none");
                $node.find(".unbuyButton").css("display", "inline-block");
                $node.find(".minusButton").css("display", "none");
                $node.find(".plusButton").css("display", "none");
                $node.find(".amountLabel").css("display", "none");
                $node.find(".amountLabelB").css("display", "inline-block");
                $node.find(".amountLabelB").text(amount);
                $node.find(".title").css("display", "none");
                $node.find(".crossedTitle").css("display", "inline-block");
                $node.find(".crossedTitle").text(titleOfTheGood);
                isBought = true;
                $node.slideUp(300, function () {
                    $nodeR.remove();
                    $boughtList.append($nodeR);
                    $titleR.css("text-decoration", "line-through");
                    $amountR.css("text-decoration", "line-through");
                });
            });
        });

        $node.find(".unbuyButton").click(function () {
            editAnimated($node, function () {
                $node.find(".buyButton").css("display", "inline-block");
                $node.find(".deleteButton").css("display", "inline-block");
                $node.find(".unbuyButton").css("display", "none");
                $node.find(".minusButton").css("display", "inline-block");
                $node.find(".plusButton").css("display", "inline-block");
                $node.find(".amountLabel").css("display", "inline-block");
                $node.find(".amountLabelB").css("display", "none");
                $node.find(".title").css("display", "inline-block");
                $node.find(".crossedTitle").css("display", "none");
                isBought = false;
                $node.slideUp(300, function () {
                    $nodeR.remove();
                    $notBoughtList.append($nodeR);
                    $titleR.css("text-decoration", "none");
                    $amountR.css("text-decoration", "none");
                });
            });
        });

        $node.find(".deleteButton").click(function () {
            $node.slideUp(300, function () {
                $node.remove();
                $nodeR.remove();
            });
        });

        $(".leftColumn").append($node);
        $notBoughtList.append($nodeR);
        $node.hide();
        $node.slideDown(400);
    }

    $(".searchButton").click(function() {
        var title = $(".searchLine").val();
        if (title !=""){
            addItem(title);
            $(".searchLine").val("");
            $(".searchLine").focus();
        }
    });

    $('html').keydown(function(eventObject){
        if (eventObject.keyCode == 13) {
            var title = $(".searchLine").val();
            addItem(title);
            $(".searchLine").val("");
            $(".searchLine").focus();
        }
    });

    addItem("Помідори");
    setTimeout(function () {
        addItem("Печиво");
    }, 100);
    setTimeout(function () {
        addItem("Сир");
    }, 200);
});