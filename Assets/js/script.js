//Extend dayjs to use advanced formatting.
dayjs.extend(dayjs_plugin_advancedFormat);
//This wrapper function ensures that the DOM is fully loaded before executing the code.
$(function () {

  //Load any saved tasks from local storage if available.
  function loadTasks() {
    $(".time-block").each(function () {
      const id = $(this).attr("id");
      const task = localStorage.getItem(id);
      if (task !== null) {
        $(this).children(".description").val(task);
      }
    });
  }
  
  //Adds class to time blocks to indicate past, present, or future.
  function updateClasses(dayJsTime) {
    const currentHour = parseInt(dayJsTime.format("H"));
    $(".time-block").each(function () {
      const blockHour = parseInt($(this).attr("id").split("-")[1]);
      $(this).toggleClass("past", blockHour < currentHour);
      $(this).toggleClass("present", blockHour === currentHour);
      $(this).toggleClass("future", blockHour > currentHour);
    });
  }

  



});
