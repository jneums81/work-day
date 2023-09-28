$(function () {
  // Display today's date using Day.js
  var currentDate = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Function to update time-block classes based on the current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("future present").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call updateTimeBlocks to initially set the time-block classes
  updateTimeBlocks();

  // Load saved events from local storage and populate the textareas
  $(".time-block").each(function () {
    var blockHour = $(this).attr("id");
    var savedEvent = localStorage.getItem(blockHour);

    if (savedEvent !== null) {
      $(this).find("textarea").val(savedEvent);
    }
  });

  // Event listener for the Save button
  $(".saveBtn").on("click", function () {
    var blockHour = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem(blockHour, eventText);
  });

  // Function to periodically update the time-block classes every minute
  setInterval(updateTimeBlocks, 60000);
});
