import "./BookingForm.css";

export default function BookingForm({ spot }) {
    return <div className="booking"><span className="price">${spot.price}</span> night</div>
}
