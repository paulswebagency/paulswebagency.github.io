document.addEventListener("DOMContentLoaded", function() {
    const currentDate = document.querySelector(".currentDate"),
        daysTag = document.querySelector(".days"),
        prevNextIcon = document.querySelectorAll(".icons span");

    // getting new date, current year and month
    let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    const renderCalendar = () => {
        let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(), // getting first date of the month
            lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of the month
        let liTag = "";

        for (let i = firstDayOfMonth; i > 0; i--) {
            liTag += `<li class="inactive"></li>`;
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            let isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear() ? "active" : "";
            let isWeekend = (new Date(currYear, currMonth, i).getDay() === 5 || new Date(currYear, currMonth, i).getDay() === 6) ? "weekend" : "";
            liTag += `<li class="${isToday} ${isWeekend}">${i}</li>`;
        }
        
        currentDate.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;
    };

    const updateCalendar = () => {
        renderCalendar();
        addListenersToDays();
    };

    const addListenersToDays = () => {
        document.querySelectorAll('.days li').forEach(tag => {
            tag.addEventListener('click', () => {
                // select the day
                document.querySelectorAll('.days li').forEach(tag => tag.classList.remove('selected'));
                tag.classList.add('selected');

                const selectedDate = new Date(currYear, currMonth, parseInt(tag.innerText));
                // log the date
                console.log(selectedDate.toLocaleDateString());
                sendHelloToPostman();
            });
        });
    };

    renderCalendar();

    prevNextIcon.forEach(icon => {
        icon.addEventListener("click", () => {
            if (icon.id === "prev" && currMonth > 0) {
                currMonth--;
            } else if (icon.id === "next" && currMonth < 11) { 
                currMonth++;
            }

            if (currMonth === date.getMonth() && currYear === date.getFullYear() && icon.id === "prev") {
                icon.classList.add("inactive");
            } else {
                document.getElementById("prev").classList.remove("inactive");
            }

            if (currMonth === 0 && icon.id === "prev") {
                icon.classList.add("inactive");
            } else {
                document.getElementById("next").classList.remove("inactive"); 
            }

            if (currMonth >= 3 && icon.id === "next") {
                icon.classList.add("inactive");
            } else {
                document.getElementById("next").classList.remove("inactive");
            }
            
            // Update calendar when changing month
            updateCalendar();
        });
    });

    addListenersToDays();
});
function sendHelloToPostman() {
    fetch('https://postman-echo.com/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: 'Hallo'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Fehler beim Senden des Strings');
        }
        return response.text(); // Die Antwort als Text lesen
    })
    .then(data => {
        console.log('Antwort von Postman:', data);
    })
    .catch(error => {
        console.error('Fehler:', error);
    });
}