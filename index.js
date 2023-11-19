const diaryEntries = [];
const SELECTED_CLASS_NAME = "selected";
const editMoodsElem = document.querySelector("#edit-moods");
const diaryListElem = document.querySelector("#diary-list");
const addEntryElem = document.querySelector("#add-entry");
const editDateInnerElem = document.querySelector("#edit-date input");
const editNoteInnerElem = document.querySelector("#edit-note textarea");
const saveEntryElem = document.querySelector("#save-entry");
const moodOptionElems = moods.map((mood, i) => {
    const moodOptionElem = document.createElement("button");
    moodOptionElem.classList.add("mood-option");
    moodOptionElem.value = `${i}`;

    const moodCircle = document.createElement("span");
    moodCircle.classList.add("mood-color", mood.clazz);
    moodOptionElem.append(moodCircle, mood.name);
    moodOptionElem.addEventListener("click", () => {
        moodOptionElem.classList.toggle(SELECTED_CLASS_NAME);
    });

    editMoodsElem.appendChild(moodOptionElem);
    return moodOptionElem;
});

class DiaryEntry {
    date = new Date();
    moods = new Array(moods.length).fill(false)
    note = "";

    loadTo(editDateInnerElem, moodOptionElems, editNoteInnerElem) {
        editDateInnerElem.value = this.date;
        this.moods.forEach((hasMood, i) => {
            if (hasMood) {
                moodOptionElems[i].classList.add(SELECTED_CLASS_NAME);
            } else {
                moodOptionElems[i].classList.remove(SELECTED_CLASS_NAME);
            }
        });
        editNoteInnerElem.value = this.note;
    }
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
        {
            const entryDateElem = document.createElement("p");
            entryDateElem.classList.add("entry-date");
            entryDateElem.textContent = diaryEntry.date.toLocaleDateString(
                undefined,
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                },
            );
            entryInfoElem.appendChild(entryDateElem);
        }
        {
            const moodsElem = document.createElement("div");
            moodsElem.classList.add("moods");
            entryInfoElem.appendChild(moodsElem);
        }
        entryInfoElem.addEventListener("click", () => {
            document.querySelectorAll(".entry-info.selected")
                .forEach(entryInfoElem => entryInfoElem.classList.remove(SELECTED_CLASS_NAME));
            entryInfoElem.classList.add(SELECTED_CLASS_NAME);
            diaryEntry.loadTo(editDateInnerElem, moodOptionElems, editNoteInnerElem);
        });
        diaryEntryElem.appendChild(entryInfoElem);
    }
    {
        const deleteEntryElem = document.createElement("button");
        deleteEntryElem.classList.add("delete-entry");
        deleteEntryElem.appendChild(getTrashCanElem());
        deleteEntryElem.addEventListener("click", () => {
            if (confirm("Are you sure to delete this entry?")) {
                diaryEntryElem.remove();
                const removeI = diaryEntries.findIndex(entry => entry === diaryEntry);
                diaryEntries.splice(removeI, 1);
            }
        });
        diaryEntryElem.appendChild(deleteEntryElem);
    }
    diaryListElem.insertBefore(diaryEntryElem, addEntryElem);

    diaryEntries.push(diaryEntry);
});