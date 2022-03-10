let now = moment();
let Timeblocks = [];

const getStatus = (time) => {
  if (time > Number(now.format("H"))) {
    return "future";
  };
  if (time < Number(now.format("H"))) {
    return "past";
  };
  return "present";
}

for (i=9; i <18; i++) {
  let hour = moment(i, "H").format("h A");
  let status = getStatus(i);
  let block = {
    id: i,
    hour: hour,
    status: status
  }
  Timeblocks.push(block);
}

// Displays Current Day in Header
$("#currentDay").text(now.format("[Today is] dddd, MMMM Do"));
let html = ""

// // Timeblocks
Timeblocks.forEach(block => {
  let add = `
    <div class="row">
      <div class="hour">${block.hour}</div>
      <div class="time-block ${block.status}" id="${block.id}"></div>
      <button class="saveBtn" id="save-${block.id}">SAVE</button>
    </div>
  `
  html += add;
});

$(".container").append(html);

