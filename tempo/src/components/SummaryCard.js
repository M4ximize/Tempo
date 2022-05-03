import moment from 'moment'

function SummaryCard({day}) {
    let day_icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${day.weather[0]["icon"]}.svg`
    return (
        <li className="container p-5 flex items-center justify-center bg-white shadow-lg rounded-lg ">
            <div className="my-auto">
                <p className="font-bold text-3xl text-teal-400 mb-2">{Math.round(day.main.temp)}&deg;C</p>
                <p className="text-2xl text-gray-800 tracking-widest">{day.weather[0].main}
                    <img src={day_icon} className="w-1/4 inline" />
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">{day.weather[0].description}</p>
                <p className="tracking-wider">{moment(day.dt_txt).format("dddd hh:mm")}</p>
            </div>
        </li>
    )
}

export default SummaryCard