import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow-sm rounded-lg p-7">
    <div className="mb-2">
      <img src={icon} alt={`${title} icon`} className="w-20 h-20 object-contain " />
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const WhyGenAiLearning = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 ml-36 mr-36">
        <div className="mt-36">
          <h2 className="text-4xl mb-4">
            Why, <span className="text-black font-bold">GenAi Learning?</span>
          </h2>
          <p className="text-gray-600 mb-6">
            With 1.8+ Crore Students and one of the best selection rates in India amongst online learning platforms, you can surely rely on us to excel.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold flex items-center">
            Get started for free <span className="ml-2">→</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          <FeatureCard
            icon="./leaderboard/Guidence.png"
            title="Personalized Guidance"
            description="We’ve guided over 4,000 learners to success and gained knowledge."
          />
          <FeatureCard
            icon="./leaderboard/Mentors.png"
            title="Expert Mentors"
            description="Our network of industry leaders ensures your growth."
          />
          <FeatureCard
            icon="./leaderboard/Results.png"
            title="Proven Results"
            description="Trusted by learners and professionals worldwide."
          />
          <FeatureCard
            icon="./leaderboard/Pguide.png"
            title="Personalized Guidance"
            description="We’ve guided over 4,000 learners to success and gained knowledge."
          />
        </div>
      </div>
    </div>
  );
};

export default WhyGenAiLearning;
