const noteListDiv = document.querySelector(".note-list");
let noteID = 1;
function Note(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
}

// Add eventListeners 
function eventListeners() {
    document.addEventListener("DOMContentLoaded", displayNotes);
    document.getElementById("add-note-btn").addEventListener("click", addNewNote);
    document.getElementById("delete-all-btn").addEventListener("click", deleteAllNotes);
}

eventListeners();

// get item from storage 
function getDataFromStorage() {
    return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
}

// add a new note in the list 
function addNewNote() {
    const noteTitle = document.getElementById("note-title");
    const noteContent = document.getElementById("note-content");

    if (validateInput(noteTitle, noteContent)) {
        let notes = getDataFromStorage();
        let noteItem = new Note(noteID, noteTitle.value, noteContent.value);
        noteID++;
        notes.push(noteItem);
        createNote(noteItem);

        // saving in the local storage 
        localStorage.setItem("notes", JSON.stringify(notes));
        noteTitle.value = "";
        noteContent.value = "";
    }
}

//  input validation 
function validateInput(title, content) {
    if (title.value !== "" && content.value !== "") {
        return true;
    } else {
        if (title.value === "") title.classList.add("warning");
        if (content.value === "") content.classList.add("warning");
    }
    setTimeout(() => {
        title.classList.remove("warning");
        content.classList.remove("warning");
    }, 3000);
}

function searchfun() {
    var sval = document.getElementById("text1").value;
    let notes = getDataFromStorage();
    fun()
    if (sval.length === 0) {
        fun()
    }
    else {
        for (i = 0; i < notes.length; i++) {
            var temp = String(notes[i].id);
            if (notes[i].title === sval) {
                document.getElementById(temp).style.display = " ";
            }
            else {
                document.getElementById(temp).style.display = "none";
            }
        }
    }
}

function fun(){
    let notes = getDataFromStorage();
    for (i = 0; i < notes.length; i++) {
        let temp = String(notes[i].id);
        document.getElementById(temp).style.display = "";
    }
}

// create a new note div
var p = 0;
function createNote(noteItem) {
    const div = document.createElement("div");
    p += 1;
    div.id = "" + p;
    var temp6 = "i" + p;
    var temp3 = "r" + p;
    var temp4 = "d" + p;
    var temp7 = "o" + p;
    var temp8 = "st" + p;
    var temp9 = "sn" + p;
    div.classList.add("note-item");
    div.setAttribute("data-id", noteItem.id);
    div.innerHTML = `
         <h4>Title : ${noteItem.title}</h4>
        <p>Content: ${noteItem.content}</p>
        <button type="button" id='${temp4}' onclick="deleteNote(this)" style="margin-right:10px;margin-bottom:10px;background:red;color:white;border-radius:8px;padding:3px" class = "btn btn-danger"><b>
        Delete</b>
        </button><br>
        <input type="datetime-local" id='${temp6}' class="note_style" style="margin-bottom:10px;">
        <button id='${temp3}' style="border-radius:8px;padding:3px;" onclick="alarm(this)" id="alarmtime" class ="btn-info"><b>Remind<b> </button><br><br>
        <div id='${temp7}' style="display:none;>
          <button class="btn-info" id='${temp9}'  onclick="snooze(this)" style="margin-bottom:10px;border-radius:10px;">Snooze Alarm</button><br>
          <button id='${temp8}' class="btn-info" onclick="stop(this)" style="margin-bottom:10px;border-radius:10px;">Stop Alarm</button>
        </div>
  `;
    noteListDiv.appendChild(div);
    let notes = getDataFromStorage();
}

// display all the notes from the local storage
function displayNotes() {
    let notes = getDataFromStorage();
    if (notes.length > 0) {
        noteID = notes[notes.length - 1].id;
        noteID++;
    }
    notes.forEach(item => {
        createNote(item);
    });
}

// delete a note 
function deleteNote(temp) {
    var temp1 = "";
    let notes = getDataFromStorage();
    for (i = 1; i < temp.id.length; i++) {
        temp1 += temp.id[i];
    }
    document.getElementById(temp1).remove();
    let newNotesList = notes.filter(item => {
        return item.id !== parseInt(temp1);
    });
    localStorage.setItem("notes", JSON.stringify(newNotesList));
}

// delete all notes 
function deleteAllNotes() {
    localStorage.removeItem("notes");
    let noteList = document.querySelectorAll(".note-item");
    if (noteList.length > 0) {
        noteList.forEach(item => {
            noteListDiv.removeChild(item);
        });
    }
}

//alarm
function alarm(temp) {
    var alarmsound = new Audio();
    var aid = "i";
    var oid = "o";
    alarmsound.src = "alarm.mp3";
    for (i = 1; i < temp.id.length; i++) {
        aid += temp.id[i];
        oid += temp.id[i];
    }
    var ms = document.getElementById(aid).valueAsNumber;
    if (this.isNaN(ms)) {
        alert("Invalid date");
        return;
    }
    var alarm1 = new Date(ms);
    var alarmtime = new Date(alarm1.getUTCFullYear(), alarm1.getUTCMonth(), alarm1.getUTCDate(), alarm1.getUTCHours(), alarm1.getUTCMinutes(), alarm1.getUTCSeconds());
    var difftime = alarmtime.getTime() - (new Date()).getTime();
    if (difftime < 0) { alert("Time has already passed"); }
    else
        setTimeout(initAlarm, difftime, oid);
}
var music = new Audio();
music.src = "alarm.mp3";

//starts alarm
function initAlarm(temp) {
    music.play();
    document.getElementById(temp).style.display = "";
}

//pauses alarm
function stop(temp) {
    var t1 = "o";
    for (i = 2; i < temp.id.length; i++) {
        t1 += temp.id[i];
    }
    music.pause();
    music.currentTime = 0;
    document.getElementById(t1).style.display = "none";
}

//snoozes alarm
function snooze(temp) {
    let t = "o";
    for(i=2;i<temp.id.length;i++)
        t+=temp.id[i];

    document.getElementById(t).style.display="none";
    music.pause();
    setTimeout(initAlarm, 36000, t);
}
