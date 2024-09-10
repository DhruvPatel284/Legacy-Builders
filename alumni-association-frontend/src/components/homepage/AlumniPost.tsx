import React from 'react';

const AlumniPost = () => {
  const alumniPosts = [
    {
      title: "New Venture",
      description: "John Doe launched a new tech startup focused on AI solutions.",
      date: "Oct 20, 2023",
      image: "https://res.cloudinary.com/dhwdgfdvz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1725934315/Image_135_2_sqwt5r.png",
    },
    {
      title: "Research Success",
      description: "Dr. Smith published groundbreaking research in renewable energy.",
      date: "Oct 18, 2023",
      image: "https://res.cloudinary.com/dhwdgfdvz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1725934238/Image_135_3_lmdgar.png",
    },
    {
      title: "Literary Award",
      description:
        "Alumni Mary Jones received a prestigious literary award for her novel.",
      date: "Oct 15, 2023",
      image: "https://res.cloudinary.com/dhwdgfdvz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1725934493/Image_135_4_nhwsip.png",
    },
    {
      title: "Community Project",
      description:
        "Team of alumni initiated a community project to support local schools.",
      date: "Oct 12, 2023",
      image: "https://res.cloudinary.com/dhwdgfdvz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1725934562/Image_135_5_rkfcwb.png",
    },
  ];

  return (
    <div>
        <section className="mt-12">
        {/* Section Header */}
        <h2 className="text-2xl font-semibold mb-4">Alumni Posts</h2>
        
        {/* Alumni Posts Grid */}
        <div className="grid grid-cols-2 gap-6">
            {alumniPosts.map((post, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4 flex space-x-4">
                <img
                src={post.image}
                alt={post.title}
                className="w-36 h-24 object-cover rounded-md"
                />
                <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-500 text-sm">{post.description}</p>
                <p className="text-gray-400 text-xs mt-2">Posted on: {post.date}</p>
                </div>
            </div>
            ))}
        </div>
        </section>
    </div>
  );
};

export default AlumniPost;
