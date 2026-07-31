export function getCalendarDays(currentDate) {

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const calendar = [];

    // Días del mes anterior
    const prevLastDay = new Date(year, month, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {

        const day = prevLastDay - i;
        const date = new Date(year, month - 1, day);

        calendar.push({

            date,
            day,
            month: date.getMonth(),
            year: date.getFullYear(),
            currentMonth: false

        });

    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {

        const date = new Date(year, month, day);

        calendar.push({

            date,
            day,
            month: date.getMonth(),
            year: date.getFullYear(),
            currentMonth: true

        });

    }

    // Días del mes siguiente
    let nextDay = 1;

    while (calendar.length < 42) {

        const date = new Date(year, month + 1, nextDay);

        calendar.push({

            date,
            day: nextDay,
            month: date.getMonth(),
            year: date.getFullYear(),
            currentMonth: false

        });

        nextDay++;

    }

    return calendar;

}

export function groupLaunchesByDate(launches) {

    const map = {};

    launches.forEach(launch => {

        const date = parseLocalDate(launch.release_date);

        const key = date.toDateString();

        if (!map[key]) {

            map[key] = [];

        }

        map[key].push(launch);

    });

    return map;

}

export function parseLocalDate(dateString) {

    if (!dateString) return null;

    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    return new Date(year, month - 1, day);

}