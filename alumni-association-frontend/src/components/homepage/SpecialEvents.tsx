import React from 'react';

const SpecialEvents = () => {
  const events = [
    {
      title: "Alumni Meet",
      description:
        "Join us for the annual alumni gathering to reconnect and network with fellow graduates.",
      date: "April 15, 2024",
      image: "https://res.cloudinary.com/dhwdgfdvz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1725934636/Image_20_qrzfsk.png",
    },
    {
      title: "Innovation Fair",
      description:
        "Showcase your latest projects and innovations at the annual fair.",
      date: "March 20, 2024",
      image: "https://res.cloudinary.com/dhwdgfdvz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1725934725/Image_20_1_duacuf.png",
    },
    {
      title: "Career Seminar",
      description:
        "Gain insights and advice from industry leaders at our career-focused seminar.",
      date: "May 10, 2024",
      image: "https://res.cloudinary.com/dhwdgfdvz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1725934809/Image_20_2_zloi7r.png",
    },
    {
      title: "Casual Meetup",
      description:
        "Join a casual meetup to unwind and share experiences with fellow alumni.",
      date: "February 27, 2024",
      image: "https://res.cloudinary.com/dhwdgfdvz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1725934907/Image_20_3_co7nha.png",
    },
  ];

  return (
    <div>
        <section className="mt-12">
        {/* Section Header */}
        <h2 className="text-2xl font-semibold mb-4">Special Events</h2>

        {/* Events Grid */}
        <div className="grid grid-cols-4 gap-6">
            {events.map((event, index) => (
            <div key={index} className="bg-white shadow rounded-lg">
                <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-gray-500 text-sm">{event.description}</p>
                <p className="text-gray-400 text-xs mt-2">Date: {event.date}</p>
                <button className="mt-2 text-purple-600 border border-purple-600 py-1 px-3 rounded hover:bg-purple-50">
                    {event.title.includes("Meet") ? "Register Now" : "Learn More"}
                </button>
                </div>
            </div>
            ))}
        </div>
        </section>
    </div>
   
  );
};

export default SpecialEvents;
