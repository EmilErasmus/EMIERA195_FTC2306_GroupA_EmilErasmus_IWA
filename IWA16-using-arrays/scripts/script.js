
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

    const { firstName, surname, id, races } = athlete
    const { date, time } = races[races.length - 1]

    const raceDate = new Date(date)
    const day = raceDate.getDate();
    const month = MONTHS[raceDate.getMonth()];
    const year = raceDate.getFullYear();
    console.log(time)
    const [first, second, third, fourth] = time;
    const total = first + second + third + fourth;

    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;


    const fragment = document.createDocumentFragment();

    const title = document.createElement("h2");
    title.innerText = id;
    fragment.appendChild(title);

    // return fragment
    // for (let i = 0; i < 4; i++){
    //     const term = document.createElement("dt");
    //     term.innerText = "Athlete";

    //     const content = document.createElement("dd");
    //     content.innerText = firstName + surname;

    //     const list = document.createElement("dl");
    //     list.appendChild(term)
    //     list.appendChild(content)
    // }
    // const raceDate = new Date(date)

    const namesKey = document.createElement("dt");
    namesKey.innerText = "Athlete:";

    const names = document.createElement("dd");
    names.innerText = `${firstName} ${surname}:`;

    const raceKey = document.createElement("dt");
    raceKey.innerText = "Total Races:";

    const numRaces = document.createElement("dd");
    numRaces.innerText = races.length;

    const datesKey = document.createElement("dt");
    datesKey.innerText = "Event Date (Latest):";

    const dates = document.createElement("dd");
    dates.innerText = `${day} ${month} ${year}`;

    const timeKey = document.createElement("dt");
    timeKey.innerText = "Total Time (Latest):";

    const raceTime = document.createElement("dd");
    raceTime.innerText = formattedTime;

    const list = document.createElement("dl");
    list.appendChild(namesKey)
    list.appendChild(names)
    list.appendChild(raceKey)
    list.appendChild(numRaces)
    list.appendChild(datesKey)
    list.appendChild(dates)
    list.appendChild(timeKey)
    list.appendChild(raceTime)

    fragment.appendChild(list);

    return fragment
}


const { NM372 } = data.response.data
const { SV782 } = data.response.data

document.querySelector('[data-athlete="NM372"]').appendChild(createHtml(NM372));
document.querySelector('[data-athlete="SV782"]').appendChild(createHtml(SV782));