// "use client";
// import React from 'react';

// interface EventCardProps {
//   image: string;
//   title: string;
//   description: string;
//   registrationLink: string;
//   viewMoreLink: string;
// }

// const EventCard: React.FC<EventCardProps> = ({ image, title, description, registrationLink, viewMoreLink }) => {
//   return (
//     <div className="bg-white shadow rounded-lg flex items-start mb-6">
//       <img
//         src={image}
//         alt={title}
//         className="w-1/3 h-40 object-cover rounded-l-lg"
//       />
//       <div className="p-4 w-2/3">
//         <h3 className="font-semibold text-lg mb-2">{title}</h3>
//         <p className="text-gray-500 text-sm mb-4">{description}</p>
//         <div className="flex items-center justify-between">
//           <a
//             href={registrationLink}
//             className="text-purple-600 border border-purple-600 py-1 px-3 rounded hover:bg-purple-50"
//           >
//             Register Now
//           </a>
//           <a
//             href={viewMoreLink}
//             className="text-purple-600 border border-purple-600 py-1 px-3 rounded hover:bg-purple-50"
//           >
//             View More
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;

// components/EventCard.tsx
const EventCard = ({ event }:{event:any}) => {
    return (
        <div className="bg-white border-gray-300 shadow-md rounded overflow-hidden flex flex-col md:flex-row w-full md:w-[calc(94%_-_12px)]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover md:w-1/3"
        />
        <div className="p-4 w-full md:w-1/2">
          <h3 className="font-semibold text-lg">{event.title}</h3>
          <p className="text-gray-500 text-sm mt-1">{event.description}</p>
          <div className="flex justify-between items-center mt-4">
            <a
              href="#register"
              className="text-purple-600 border border-purple-600 py-1 px-3 rounded hover:bg-purple-50"
            >
              Register Now
            </a>
            <button className="text-purple-600 border border-purple-600 py-1 px-3 rounded hover:bg-purple-50">
              View More
            </button>
          </div>
        </div>
      </div>
    );
  };
  export default EventCard;
  