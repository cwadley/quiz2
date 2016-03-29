(function($){
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

	$mouseover = $('.mouse-over');
	$click     = $('.click');
	$sub       = $('.submit');


	$mouseover.on('mouseover', function() {
		$this = $(this);
        if ($this.text() != 'Scrooge McDuck!')
		  $this.height($(this).height() + 50);

        $this.html('Scrooge McDuck!');
	});


	$click.click('click', function() {
		$(this).html('Peace Out!')
		$(this).fadeOut(1500);
		return false;
	});


	$sub.on('submit', function(e) {
		e.preventDefault();
		if ($(this).find('input[type=\"text\"]').val() !== '') {
			$(this).find('input').each(function() {
				$(this).fadeOut('slow');
			});
			
			$(this).append('<h2>Congratulations! You\'ve entered some text!</h2>');
		}
	});


	$(document).on('ready', function() {
		setTimeout(function(){
			$('.timeout').fadeIn('slow');
		}, 1000);
	});

	// create the button
	$(".content").append("<div id=\"data\"></div>");
	$(".content").append("<div id=\"buttons\"></div>");
	$(".content").append("<div id=\"title\"></div>");
    $("#data").append("<span class=\"dataTitle\">AJAX Request Button Event</span>");
    $("#data").append("<hr>");
	$("#buttons").append("<button name=\"showData\" id=\"showData\" onclick=\"getTheData()\">Get Title</button>");

	// retreive the title from local storage, if it exists
	if (localStorage.getItem("savedTitle") != null)
		$("#title").html("<strong>" + localStorage.getItem("savedTitle") + "</strong>");

})(jQuery);


/*
* Requests data from the api, displays it on the screen.
* Fulfills part 2 of the quiz
*/
function getTheData()
{
	$.ajax({
        url: "http://www.mattbowytz.com/simple_api.json?data=quizData",
        dataType: "json",
        success: function(response){
            var returnData = JSON.parse(JSON.stringify(response));

            // change the value of the first button
            $("#showData").html("Change It");

            // place the second button, if not already placed
            if (!$("#saveIt").length)
            	$("#buttons").append("<button name=\"saveIt\" id =\"saveIt\" onclick=\"saveIt()\">Save It</button>");

            // choose a random value from the data
            var rand = Math.floor(Math.random() * 14);

            // insert the value into the page
            $("#title").html("<strong>" + returnData.data[rand] + "</strong>");


        }
    });
}


/*
* Saves the text currently displayed in the div #title to local storage
*/
function saveIt()
{
	var titleToSave = $("#title").text();
	localStorage.setItem("savedTitle", titleToSave);
}