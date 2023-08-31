
const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

const data = {
    response: {
        requestType: "FETCH_ATHLETE_DATA",
        requestBy: "ALL_MATCHING_ATHLETES",
        forDisplay: "BEST_RACES",

        data: {
            NM372: {
                firstName: "Nwabisa",
                surname: "Masiko",
                id: "NM372",
                races: [
                    {
                        date: '2022-11-18T20:00:00.000Z',
                        time: [9, 7, 8, 6],
                    },
                    {
                        date: '2022-12-02T20:00:00.000Z',
                        time: [6, 7, 8, 7],
                    },
                ],
            },

            SV782: {
                firstName: "Schalk",
                surname: "Venter",
                id: "SV782",
                races: [
                    {
                        date: '2022-11-18T20:00:00.000Z',
                        time: [10, 8, 3, 12],
                    },
                    {
                        date: '2022-11-25T20:00:00.000Z',
                        time: [6, 8, 9, 11],
                    },
                    {
                        date: '2022-12-02T20:00:00.000Z',
                        time: [10, 11, 4, 8],
                    },
                    {
                        date: '2022-12-09T20:00:00.000Z',
                        time: [9, 8, 9, 11],
                    },
                ],
            },
        },
    },
};

// Only edit below this comment

const createHtml = (athlete) => {
    
    const { firstName, surname, id, races } = athlete;
    const { date, time } = races[races.length - 1];

    const raceDate = new Date(date);
    const day = raceDate.getDate();
    const month = MONTHS[raceDate.getMonth()];
    const year = raceDate.getFullYear();

    const [first, second, third, fourth] = time;
    const totalTimeInMins = first + second + third + fourth;
    const hours = Math.floor(totalTimeInMins / 60);
    const minutes = totalTimeInMins % 60;
    const format = (num) => num.toString().padStart(2, "0");
    const formattedTime = `${format(hours)}:${format(minutes)}`;

    const fragment = document.createDocumentFragment();

    const title = document.createElement("h2");
    title.innerText = id;

    const list = document.createElement("dl");

    const namesKey = document.createElement("dt");
    const raceKey = document.createElement("dt");
    const datesKey = document.createElement("dt");
    const timeKey = document.createElement("dt");

    const names = document.createElement("dd");
    const numRaces = document.createElement("dd");
    const dates = document.createElement("dd");
    const raceTime = document.createElement("dd");

    const dtElements = [namesKey, raceKey, datesKey, timeKey];
    const dtInner = ["Athlete:", "Total Races:", "Event Date (Latest):", "Total Time (Latest):"];
    const ddElements = [names, numRaces, dates, raceTime];
    const ddInner = [`${firstName} ${surname}:`, races.length, `${day} ${month} ${year}`, formattedTime];

    for (let i = 0; i < 4; i++) {
        dtElements[i].innerText = dtInner[i];
        list.appendChild(dtElements[i]);
        ddElements[i].innerText = ddInner[i];
        list.appendChild(ddElements[i]);
    };

    fragment.appendChild(title);
    fragment.appendChild(list);

    return fragment;
};

const { NM372 } = data.response.data;
const { SV782 } = data.response.data;

document.querySelector('[data-athlete="NM372"]').appendChild(createHtml(NM372));
document.querySelector('[data-athlete="SV782"]').appendChild(createHtml(SV782));