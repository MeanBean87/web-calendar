//Extend dayjs to use advanced formatting.
dayjs.extend(dayjs_plugin_advancedFormat);

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

//Updates the day and time displayed, and calls updateClasses.
function updateTime() {
  const dayJsTime = dayjs();
  $("#currentDay").text(dayJsTime.format("dddd, MMMM Do"));
  $("#currentTime").text(dayJsTime.format("h:mm:ss A"));
  updateClasses(dayJsTime);
}

//Updates the time on the next repaint of the animation frame.
function startTimerInterval() {
  updateTime();
  requestAnimationFrame(startTimerInterval);
}

//Calls the functions when the windows loads.
$(function () {

  //Constructs the time/task variable and sets them to local storage.
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    const time = $(this).parent().attr("id");
    const task = $(this).siblings(".description").val();
    localStorage.setItem(time, task);
    loadTasks();
  });

  //Calls the timerInterval function.
  startTimerInterval();

  //Calls the loadTasks function.
  loadTasks();

});
