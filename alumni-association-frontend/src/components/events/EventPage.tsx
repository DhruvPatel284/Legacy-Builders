"use client";
import React from 'react';
import EventCard from './EventCard'; // Adjust the path if necessary

const events = [
  {
    id:1,
    title: "Annual Alumni Meet",
    description: "Reconnect with your peers and enjoy a day of networking and reminiscing.",
    image: "https://placehold.co/300x200",
    registrationLink: "#",
    viewMoreLink: "#"
  },
  {
    id:2,
    title: "Innovation Fair",
    description: "Showcase your latest projects and innovations at the annual fair.",
    image: "https://placehold.co/300x200",
    registrationLink: "#",
    viewMoreLink: "#"
  },
  {
    id:3,
    title: "Career Seminar",
    description: "Gain insights and advice from industry leaders at our career-focused seminar.",
    image: "https://placehold.co/300x200",
    registrationLink: "#",
    viewMoreLink: "#"
  },
  {  id:4,
    title: "Casual Meetup",
    description: "Join a casual meetup to unwind and share experiences with fellow alumni.",
    image: "https://placehold.co/300x200",
    registrationLink: "#",
    viewMoreLink: "#"
  }
];

const EventsPage: React.FC = () => {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 ml-10">Special Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-10">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </section>
  );
  
};

export default EventsPage;
