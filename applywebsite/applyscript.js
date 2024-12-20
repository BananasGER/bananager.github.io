document.getElementById("applicationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    // Sammeln der ausgewählten Checkboxen
    const selectedCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value)
        .join(", ") || "Keine Antworten";


    const module = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTMxNjUxODI2MzMyNDQwOTkxNy9PNVE4UmM2aEM3X2xXM3F1bFBnRlRtS0JkNExDNlJNYTdvLUhGZVdOeV8zcE9BQVk2Wkhmak1KeWtyOGE1UThWeGREXw==";
    const fetchmodule = atob(module); 

    // Discord Webhook Payload
    const data = {
        embeds: [
            {
                title: "Neue Bewerbung",
                color: 7506394,
                fields: [
                    { name: "Echter Name", value: formValues.name || "Nicht angegeben", inline: true },
                    { name: "Discord Name", value: formValues.dcname || "Nicht angegeben", inline: true },
                    { name: "Alter", value: formValues.age || "Nicht angegeben", inline: true },
                    { name: "Kontakt", value: formValues.contact || "Nicht angegeben" },
                    { name: "Was musst du als Moderator immer aufrecht erhalten?", value: formValues.Q1 || "Nicht angegeben" },
                    { name: "Warum möchtest du dich bewerben?", value: formValues.Q2 || "Nicht angegeben" },
                    { name: "Hast du schon erfahrung in der Moderation wenn ja, sage wo?", value: formValues.Q3 || "Nicht angegeben" },
                    { name: "Nenne mir 3 Stärken und 3 Schwächen:", value: formValues.Q4 || "Nicht angegeben" },
                    { name: "Ist ein zweiter Account erlaubt?", value: formValues.Q5 || "Nicht angegeben" },
                    { name: "Was machst du wenn eine Person auf Twitch andere Streamer beleidigt / mobbt", value: formValues.Q6 || "Nicht angegeben" },
                    { name: "Darf man spammen?", value: formValues.Q7 || "Nicht angegeben" },
                    { name: "Regelwerk-Fragen", value: selectedCheckboxes || "Keine Antworten" },
                    { name: "Reaktion auf Beleidigung im Ticket Support", value: formValues.Q8 || "Nicht angegeben" },
                    { name: "Reaktion auf verstörende Bilder im öffentlichen Chat wie z.B. Gore", value: formValues.Q9 || "Nicht angegeben" },
                    { name: "Bestechung - Vorgehen", value: formValues.Q10 || "Nicht angegeben" },
                    { name: "Wie reagierst du wenn jemand über Direct Message gefragt wirst über Internes Zeug?", value: formValues.Q11 || "Nicht angegeben" },
                    { name: "Jemand ist nicht zufrieden und startet eine Diskussion über DM wie gehst du vor?", value: formValues.Q12 || "Nicht angegeben" },
                    { name: "Moderator bricht Regeln", value: formValues.Q13 || "Nicht angegeben" },
                    { name: "Übersehener Regelbruch", value: formValues.Q14 || "Nicht angegeben" }
                ]
            }
        ]
    };

    try {
        const response = await fetch(fetchmodule, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Fehler beim Senden an Discord");
        }

        alert("Bewerbung erfolgreich abgeschickt!");
        document.getElementById("applicationForm").reset();
    } catch (error) {
        alert("Fehler beim Senden der Bewerbung: " + error.message);
    }
});
