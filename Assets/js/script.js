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
  
});
