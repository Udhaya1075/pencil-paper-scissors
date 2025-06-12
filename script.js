// Request notification permission when page loads
document.addEventListener("DOMContentLoaded", () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});

function addTask() {
  const taskText = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;

  // Validate inputs
  if (!taskText || !date || !time) {
    alert("Please fill out all fields.");
    return;
  }

  // Combine date and time to create full Date object
  const dateTime = new Date(`${date}T${time}`);
  const now = new Date();

  if (dateTime <= now) {
    alert("Please choose a future time.");
    return;
  }

  // Calculate 5 minutes before the task time
  const notifyTime = new Date(dateTime.getTime() - 5 * 60 * 1000);
  const delay = notifyTime - now;

  // Add task to the table
  const table = document.getElementById("taskTableBody");
  const row = table.insertRow();
  const taskCell = row.insertCell(0);
  const dateCell = row.insertCell(1);
  const timeCell = row.insertCell(2);

  taskCell.textContent = taskText;
  dateCell.textContent = new Date(date).toLocaleDateString();
  timeCell.textContent = time;

  // Schedule the notification
  if (delay > 0) {
    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("🕒 Task Reminder", {
          body: `Reminder: "${taskText}" starts in 5 minutes!`
        });
      }
    }, delay);
  }

  // Clear the input fields
  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("timeInput").value = "";
}
