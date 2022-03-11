let now = moment();

// Get Status (Past, Present, Future)
const getStatus = (time) => {
  if (time > Number(now.format("H"))) {
    return "future";
  };
  if (time < Number(now.format("H"))) {
    return "past";
  };
  return "present";
}
// Save Event
const saveEvent = (id) => {
  let text = $(`#${id}`).val();
  console.log(text);
};

// Get Time Blocks
const getTimeBlocks = () => {
  let Timeblocks = [];
  // check for local storage
  for (i=9; i <18; i++) {
    let hour = moment(i, "H").format("h A");
    let status = getStatus(i);
    let text = "";
    let block = {
      id: i,
      hour: hour,
      status: status,
      text: text
    };
    Timeblocks.push(block)
  };
  return Timeblocks;
};

// Load Time Blocks
const loadTimeBlocks = () => {
  let blocks = getTimeBlocks();
  blocks.forEach(block => {
    let row = $("<div>").addClass("row");
    let hour = $("<div>").addClass("hour").text(block.hour);
    let textArea = $("<textarea>")
      .addClass("time-block")
      .addClass(block.status)
      .attr("id", block.id)
      .val(block.text);
    let saveBtn = $("<button>")
      .addClass("saveBtn")
      .attr("id","save-"+block.id)
      .text("SAVE");
    row.append(hour);
    row.append(textArea);
    row.append(saveBtn);
    $(".container").append(row);
  })
};

// Load Page
$("document").ready(function(){
  // Displays Current Day in Header
  $("#currentDay").text(now.format("[Today is] dddd, MMMM Do"));

  loadTimeBlocks();

  $(".saveBtn").click(function(){
    id = this.id;
    timeBlock = id.split("-")[1];
    saveEvent(timeBlock);
  })
})