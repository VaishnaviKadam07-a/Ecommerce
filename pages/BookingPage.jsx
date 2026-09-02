import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  {
    id: "styling",
    name: "Personal Styling Session",
    duration: "60 min",
    price: "₹999",
    icon: "👗",
  },
  {
    id: "tech",
    name: "Tech Setup Consultation",
    duration: "45 min",
    price: "₹1,499",
    icon: "💻",
  },
  {
    id: "interior",
    name: "Home Interior Advice",
    duration: "90 min",
    price: "₹1,999",
    icon: "🏠",
  },
  {
    id: "beauty",
    name: "Beauty & Skincare Consultation",
    duration: "45 min",
    price: "₹799",
    icon: "✨",
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return {
    firstDay,
    daysInMonth,
  };
}

export default function BookingPage() {
  const { user, addBooking, bookings } = useApp();
  const navigate = useNavigate();

  const today = new Date();

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const { firstDay, daysInMonth } = getMonthDays(viewYear, viewMonth);

  const monthName = new Date(viewYear, viewMonth).toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );

  const isBooked = (date, time) =>
    bookings.some((b) => b.date === date && b.time === time);

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);

    return (
      d <
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
    );
  };

  const handleConfirm = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedDate || !selectedTime || !selectedService) {
      return;
    }

    const service = SERVICES.find(
      (s) => s.id === selectedService
    );

    const id = "BK" + Date.now().toString().slice(-6);

    addBooking({
      date: selectedDate,
      time: selectedTime,
      service: service?.name || selectedService,
      status: "confirmed",
    });

    setBookingId(id);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div
          style={{
            backgroundColor: "rgba(39,174,96,0.1)",
          }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="font-display text-3xl font-semibold text-gray-800 mb-3">
          Booking Confirmed!
        </h2>

        <p className="text-gray-500 mb-2">
          Booking ID:{" "}
          <span className="font-mono font-bold text-gray-700">
            {bookingId}
          </span>
        </p>

        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
          className="rounded-2xl p-6 text-left mt-6 mb-8"
        >
          {[
            {
              label: "Service",
              value:
                SERVICES.find(
                  (s) => s.id === selectedService
                )?.name || "",
            },
            {
              label: "Date",
              value: selectedDate || "",
            },
            {
              label: "Time",
              value: selectedTime || "",
            },
            {
              label: "Status",
              value: "Confirmed ✓",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm"
            >
              <span className="text-gray-500">
                {item.label}
              </span>

              <span className="font-semibold text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setConfirmed(false);
            setSelectedDate(null);
            setSelectedTime(null);
            setSelectedService(null);
          }}
          style={{
            backgroundColor: "var(--primary)",
            borderRadius: "var(--radius)",
          }}
          className="px-8 py-3 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-semibold text-gray-800 mb-3">
          Book a Session
        </h1>

        <p className="text-gray-500">
          Schedule a personalized consultation with our experts
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Step 1: Service */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span
              style={{
                backgroundColor: "var(--primary)",
              }}
              className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold"
            >
              1
            </span>

            Choose Service
          </h3>

          <div className="space-y-3">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() =>
                  setSelectedService(service.id)
                }
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedService === service.id
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {service.icon}
                  </span>

                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        selectedService === service.id
                          ? "text-amber-700"
                          : "text-gray-800"
                      }`}
                    >
                      {service.name}
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {service.duration} • {service.price}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Calendar */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span
              style={{
                backgroundColor: selectedService
                  ? "var(--primary)"
                  : "var(--muted)",
              }}
              className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold"
            >
              2
            </span>

            Select Date
          </h3>

          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
            className="rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  if (viewMonth === 0) {
                    setViewMonth(11);
                    setViewYear((year) => year - 1);
                  } else {
                    setViewMonth((month) => month - 1);
                  }
                }}
                className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <span className="font-semibold text-gray-800 text-sm">
                {monthName}
              </span>

              <button
                onClick={() => {
                  if (viewMonth === 11) {
                    setViewMonth(0);
                    setViewYear((year) => year + 1);
                  } else {
                    setViewMonth((month) => month + 1);
                  }
                }}
                className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                (day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-semibold text-gray-400 py-1"
                  >
                    {day}
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map(
                (_, index) => (
                  <div key={`e${index}`} />
                )
              )}

              {Array.from({ length: daysInMonth }).map(
                (_, index) => {
                  const day = index + 1;

                  const dateStr = `${viewYear}-${String(
                    viewMonth + 1
                  ).padStart(2, "0")}-${String(day).padStart(
                    2,
                    "0"
                  )}`;

                  const past = isPast(day);
                  const selected = selectedDate === dateStr;

                  const isToday =
                    day === today.getDate() &&
                    viewMonth === today.getMonth() &&
                    viewYear === today.getFullYear();

                  return (
                    <button
                      key={day}
                      onClick={() =>
                        !past && setSelectedDate(dateStr)
                      }
                      disabled={past}
                      className={`aspect-square rounded-lg text-xs font-medium transition-all ${
                        past
                          ? "text-gray-200 cursor-not-allowed"
                          : selected
                          ? "text-white"
                          : isToday
                          ? "border border-amber-400 text-amber-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      style={{
                        backgroundColor: selected
                          ? "var(--primary)"
                          : "transparent",
                      }}
                    >
                      {day}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Time + Confirm */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span
              style={{
                backgroundColor: selectedDate
                  ? "var(--primary)"
                  : "var(--muted)",
              }}
              className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold"
            >
              3
            </span>

            Select Time
          </h3>

          {selectedDate ? (
            <div className="grid grid-cols-2 gap-2 mb-6">
              {TIME_SLOTS.map((time) => {
                const booked = isBooked(
                  selectedDate,
                  time
                );

                return (
                  <button
                    key={time}
                    onClick={() =>
                      !booked && setSelectedTime(time)
                    }
                    disabled={booked}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      booked
                        ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
                        : selectedTime === time
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-gray-200 text-gray-700 hover:border-gray-300 bg-white"
                    }`}
                  >
                    {booked ? <s>{time}</s> : time}
                  </button>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "var(--secondary)",
              }}
              className="rounded-2xl p-8 text-center text-gray-400 text-sm mb-6"
            >
              Select a date to see available time slots
            </div>
          )}

          {selectedService &&
            selectedDate &&
            selectedTime && (
              <div
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
                className="rounded-2xl p-5 mb-4"
              >
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                  Booking Summary
                </h4>

                <div className="space-y-2 text-sm">
                  {[
                    {
                      label: "Service",
                      value:
                        SERVICES.find(
                          (s) => s.id === selectedService
                        )?.name,
                    },
                    {
                      label: "Date",
                      value: new Date(
                        selectedDate + "T12:00:00"
                      ).toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      }),
                    },
                    {
                      label: "Time",
                      value: selectedTime,
                    },
                    {
                      label: "Price",
                      value:
                        SERVICES.find(
                          (s) => s.id === selectedService
                        )?.price,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between"
                    >
                      <span className="text-gray-500">
                        {item.label}
                      </span>

                      <span className="font-medium text-gray-800">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <button
            onClick={handleConfirm}
            disabled={
              !selectedService ||
              !selectedDate ||
              !selectedTime
            }
            style={{
              backgroundColor:
                !selectedService ||
                !selectedDate ||
                !selectedTime
                  ? "var(--muted)"
                  : "var(--accent)",
              borderRadius: "var(--radius)",
            }}
            className="w-full py-3.5 text-white font-semibold text-sm transition-all disabled:cursor-not-allowed hover:opacity-90"
          >
            {!user ? "Login to Book" : "Confirm Booking"}
          </button>

          {bookings.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 text-sm mb-3">
                My Bookings ({bookings.length})
              </h4>

              <div className="space-y-2">
                {bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    style={{
                      backgroundColor: "var(--secondary)",
                      borderRadius: "0.5rem",
                    }}
                    className="p-3 text-xs"
                  >
                    <p className="font-medium text-gray-700">
                      {booking.service}
                    </p>

                    <p className="text-gray-400">
                      {booking.date} at {booking.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}