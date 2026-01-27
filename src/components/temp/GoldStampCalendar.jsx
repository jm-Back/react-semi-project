import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./GoldStampCalendar.css";

import goldImg from "../assets/gold_image.png";
import goldGrayImg from "../assets/gold_image_gray.png";

export default function GoldStampCalendar({ paidDates, pivotDate }) {
    const formatDate = (date) =>
        date.toISOString().split("T")[0];

    const isPaidDay = (date) =>
        paidDates.includes(formatDate(date));

    return (
        <Calendar
            locale="en-US"
            activeStartDate={pivotDate}
            showNavigation={false}
            showNeighboringMonth={false}
            tileContent={({ date, view }) => {
                if (view !== "month") return null;

                const paid = isPaidDay(date);

                return (
                    <div className="gold-tile">
                        <img
                            src={paid ? goldImg : goldGrayImg}
                            alt={paid ? "납입" : "미납"}
                            className="gold-img"
                        />
                        <span className="day-number">
                            {date.getDate()}
                        </span>
                    </div>
                );
            }}
        />
    );
}
