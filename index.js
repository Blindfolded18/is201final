const SELECTED_CLASS_NAME = "selected";
const usernameElem = document.querySelector("#username");
const editMoodsElem = document.querySelector("#edit-moods");
const diaryListElem = document.querySelector("#diary-list");
const addEntryElem = document.querySelector("#add-entry");
const diaryEditElem = document.querySelector("#diary-edit");
const editDateInnerElem = document.querySelector("#edit-date input");
const editNoteInnerElem = document.querySelector("#edit-note textarea");
const logoutElem = document.querySelector("#logout");

moods.forEach((mood, i, moods) => {
    const moodOptionElem = document.createElement("button");
    moodOptionElem.classList.add("mood-option");
    // moodOptionElem.value = `${i}`;

    const moodCircle = document.createElement("span");
    moodCircle.classList.add("mood-color", mood.clazz);
    moodOptionElem.append(moodCircle, mood.name);

    editMoodsElem.appendChild(moodOptionElem);
    moods[i].elem = moodOptionElem;
});

usernameElem.textContent = sessionStorage.getItem("username");

class DiaryEntry {
    date = new Date();
    moods = new Set();
    note = "";

    loadTo(editDateInnerElem, moodOptionElems, editNoteInnerElem) {
        editDateInnerElem.value = dateToIso(this.date);
        moodOptionElems.forEach(moodOptionElem => moodOptionElem.classList.remove(SELECTED_CLASS_NAME));
        this.moods.forEach(mood => {
            mood.elem.classList.add(SELECTED_CLASS_NAME);
        });
        editNoteInnerElem.value = this.note;
    }
}

class EntryManager {
    diaryEntries = [];
    currentEntry = null;

    removeEntry(entry) {
        // Maybe code related to database

        const removeI = this.diaryEntries.findIndex(entryInner => entryInner === entry);
        if (removeI < 0) {
            return false;
        }

        this.diaryEntries.splice(removeI, 1);

        if (this.currentEntry === entry) {
            this.currentEntry = null;
            return true;
        }
        return false;
    }
}

function dateToVerbose(date) {
    return date.toLocaleDateString(
        undefined,
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        },
    );
}

function dateToIso(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const entryManager = new EntryManager();
const editObserver = {
    entryDateElem: null,
    moodsElem: null,
}

// Add entry event
addEntryElem.addEventListener("click", () => {
    const diaryEntry = new DiaryEntry();

    // create element
    const diaryEntryElem = document.createElement("div");
    diaryEntryElem.classList.add("diary-entry");
    {
        const entryInfoElem = document.createElement("div");
        entryInfoElem.classList.add("entry-info");

        const entryDateElem = document.createElement("p");
        entryDateElem.classList.add("entry-date");
        entryDateElem.textContent = dateToVerbose(diaryEntry.date);
        entryInfoElem.appendChild(entryDateElem);

        const moodsElem = document.createElement("div");
        moodsElem.classList.add("moods");
        entryInfoElem.appendChild(moodsElem);

        const loader = () => {
            document.querySelectorAll(".entry-info.selected")
                .forEach(entryInfoElem => entryInfoElem.classList.remove(SELECTED_CLASS_NAME));
            entryInfoElem.classList.add(SELECTED_CLASS_NAME);
            entryManager.currentEntry = diaryEntry;
            diaryEntry.loadTo(
                editDateInnerElem,
                moods.map(mood => mood.elem),
                editNoteInnerElem
            );
            diaryEditElem.style.visibility = "visible";

            editObserver.entryDateElem = entryDateElem;
            editObserver.moodsElem = moodsElem;
        };
        entryInfoElem.addEventListener("click", loader);
        loader(); // load the new created entry right away
        diaryEntryElem.appendChild(entryInfoElem);
    }
    {
        const deleteEntryElem = document.createElement("button");
        deleteEntryElem.classList.add("delete-entry");
        deleteEntryElem.appendChild(getTrashCanElem());
        deleteEntryElem.addEventListener("click", () => {
            if (confirm("Are you sure to delete this entry?")) {
                diaryEntryElem.remove();
                if (entryManager.removeEntry(diaryEntry)) { // if we delete the currently displayed entry
                    diaryEditElem.style.visibility = "hidden";

                    // For security purpose, nullify all recorded info
                    editDateInnerElem.value = "";
                    moods
                        .map(mood => mood.elem)
                        .forEach(
                            moodOptionElem => moodOptionElem.classList.remove(SELECTED_CLASS_NAME)
                        );
                    editNoteInnerElem.value = "";
                }
            }
        });
        diaryEntryElem.appendChild(deleteEntryElem);
    }
    diaryListElem.insertBefore(diaryEntryElem, addEntryElem);

    entryManager.diaryEntries.push(diaryEntry);
});

editDateInnerElem.addEventListener("change", () => {
    // We can't just use Date's constructor since the timezone is different here
    const [year, month, day] = editDateInnerElem.value.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    entryManager.currentEntry.date = date;
    editObserver.entryDateElem.textContent = dateToVerbose(date);
});

moods
    .forEach((mood, _, moods) => {
        mood.elem.addEventListener("click", () => {
            if (mood.elem.classList.toggle(SELECTED_CLASS_NAME)) {
                entryManager.currentEntry.moods.add(mood);
            } else {
                entryManager.currentEntry.moods.delete(mood);
            }

            editObserver.moodsElem.innerHTML = "";
            moods
                .filter(mood => mood.elem.classList.contains(SELECTED_CLASS_NAME))
                .forEach(mood => {
                    const moodElem = document.createElement("span");
                    moodElem.classList.add("mood");

                    {
                        const moodColor = document.createElement("span");
                        moodColor.classList.add("mood-color", mood.clazz);
                        moodElem.appendChild(moodColor);
                    }
                    moodElem.append(mood.name);

                    editObserver.moodsElem.appendChild(moodElem);
                })
        });
    });

editNoteInnerElem.addEventListener("change", () => {
    entryManager.currentEntry.note = editNoteInnerElem.value;
});

logoutElem.addEventListener("click", () => {
    if (!confirm("Are you sure to logout?")) {
        return;
    }

    location.href = "login.html";
})