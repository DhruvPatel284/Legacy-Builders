import React from 'react';

const StudentAchievements = () => {
  const achievementsData = [
    {
      title: "Math Olympiad",
      description:
        "A team of students won the national Math Olympiad, showcasing exceptional problem-solving skills.",
      date: "Oct 3, 2023",
      image: "https://placehold.co/300x200",
    },
    {
      title: "Science Fair",
      description:
        "Innovative projects by students were highlighted at the state Science Fair.",
      date: "Sep 28, 2023",
      image: "https://placehold.co/300x200",
    },
    {
      title: "Art Exhibition",
      description:
        "Creative artworks by students were displayed at the annual Art Exhibition.",
      date: "Sep 15, 2023",
      image: "https://placehold.co/300x200",
    },
  ];

  return (
    <div>
        <section className="mt-12">
            {/* Section Header */}
            <h2 className="text-2xl font-semibold mb-4">Student Achievements</h2>
            
            {/* Achievements Grid */}
            <div className="grid grid-cols-3 gap-6">
                {achievementsData.map((achievement, index) => (
                <div key={index} className="bg-white shadow rounded-lg">
                    <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                    <p className="text-gray-500 text-sm">{achievement.description}</p>
                    <p className="text-gray-400 text-xs mt-2">Posted: {achievement.date}</p>
                    </div>
                </div>
                ))}
            </div>
        </section>
    </div>
    
  );
};

export default StudentAchievements;
