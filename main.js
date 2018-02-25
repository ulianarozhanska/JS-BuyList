$(function(){
    var TEMPLATE = $(".template").html();
    var RIGHT_TEMPLATE = $(".rightTemplate").html();
    var $boughtList = $(".boughtGoods");
    var $notBoughtList = $(".goodsToBuy");

    function refreshRightColumn() {
        $boughtList.html("");
        $notBoughtList.html("");

        function listOfItems($selector, $destination) {
            $selector.each(function (i, item) {
                var $item = $(item);
                var title = $item.find(".title").text();
                var amount = $item.find(".amountLabel").text();
                var $node = $(RIGHT_TEMPLATE);
                $node.find(".titleToBuy.").text(title);
                $node.find(".amountToBuy").text(amount);
                $destination.append($node);
            })
        }

        listOfItems($(".leftColumn .buyBlock.unbought"), $notBoughtList);
        listOfItems($(".leftColumn .buyBlock.bought"), $boughtList);
    }

    function editAnimated($node, editFn) {
        $node.fadeOut(250, function () {
            editFn();
            $node.fadeIn(250);
        })
    }

    function addItem(titleOfTheGood) {
        var $node = $(TEMPLATE);

        var $title = $node.find(".title");
        $title.text(titleOfTheGood);

        var amount = 1;
        var $amount = $node.find(".amountLabel");
        $amount.text(amount);

        var isBought = false;

        var $editInput = $node.find(".editTitle");

        $title.click(function () {
           if(!isBought) {
               editAnimated($node, function(){
                   $editInput.val(titleOfTheGood);
                   $node.addClass("editTitle");
                   $editInput.focus();
               })
           }
        });

        $editInput.focusout(function () {
            titleOfTheGood = $editInput.val();
            $title.text(titleOfTheGood);
            $node.removeClass("editTitle");
            refreshRightColumn();
        });

        $node.find(".plus").click(function () {
            editAnimated($amount, function () {
                amount += 1;
                $amount.text();
                refreshRightColumn();
            });
        });

        $node.find(".minus").click(function () {
            editAnimated($amount, function () {
                if (amount >= 1) {
                    amount -= 1;
                    $amount.text();
                    refreshRightColumn();
                }
            });
        });

        $node.find(".buyButton").click(function () {
            editAnimated($node, function () {
                $node.addClass("bought");
                $node.removeClass("unbought");
                isBought = true;
                refreshRightColumn();
            });
        });

        $node.find(".unbuyButton").click(function () {
            editAnimated($node, function () {
                $node.addClass("unbought");
                $node.removeClass("bought");
                isBought = false;
                refreshRightColumn();
            });
        });

        $node.find(".deleteButton").click(function () {
            $node.slideUp(300, function () {
                $node.remove();
            });
            refreshRightColumn();
        });

        $(".leftColumn").append($node);
        $node.hide();
        $node.slideDown(400);
        refreshRightColumn();
    }

    addItem("Помідори");
    setTimeout(function () {
        addItem("Печиво");
    }, 100);
    setTimeout(function () {
        addItem("Сир");
    }, 200);

    $(".searchButton").click(function () {
        var $input = $(".search");
        var title = $input.val();
        addItem(title);

    })
});