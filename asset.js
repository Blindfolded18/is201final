const moods = [
    { clazz: "happy-mood", name: "Happy" },
    { clazz: "stressed-mood", name: "Stressed" },
    { clazz: "tired-mood", name: "Tired" },
    { clazz: "sad-mood", name: "Sad" },
    { clazz: "anxious-mood", name: "Anxious" },
    { clazz: "relaxed-mood", name: "Relaxed" },
    { clazz: "angry-mood", name: "Angry" },
    { clazz: "excited-mood", name: "Excited" },
    { clazz: "bored-mood", name: "Bored" },
    { clazz: "confident-mood", name: "Confident" },
    { clazz: "joyful-mood", name: "Joyful" },
    { clazz: "grateful-mood", name: "Grateful" },
    { clazz: "optimistic-mood", name: "Optimistic" },
    { clazz: "peaceful-mood", name: "Peaceful" },
    { clazz: "in-love-mood", name: "In love" },
    { clazz: "hopeful-mood", name: "Hopeful" },
    { clazz: "frustrated-mood", name: "Frustrated" },
    { clazz: "nostalgic-mood", name: "Nostalgic" },
    { clazz: "melancholic-mood", name: "Melancholic" },
    { clazz: "surprised-mood", name: "Surprised" },
    { clazz: "other-mood", name: "Other" },
];

function getTrashCanElem() {
    return new DOMParser().parseFromString(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    `, "text/html").body;
}