import { ChevronRight, Clock } from "lucide-react";

export default function ExploreTests() {
  const tests = [
    {
      
      id: 1,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35KZR24ZOkDWpCvR1KzF6FdnLeUaul4u11aV48JS49WiLqaFUJ8b5Fw_N0tf81waZhpY&usqp=CAU",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet consectetur. Proin duis sed non eu.",
      questions: 30,
      marks: 60,
      duration: "1 hours 56 minutes",
    },
    {
      id: 2,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35KZR24ZOkDWpCvR1KzF6FdnLeUaul4u11aV48JS49WiLqaFUJ8b5Fw_N0tf81waZhpY&usqp=CAU",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet consectetur. Augue ut sed turpis.",
      questions: 30,
      marks: 60,
      duration: "1 hours 56 minutes",
    },
    {
      id: 3,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35KZR24ZOkDWpCvR1KzF6FdnLeUaul4u11aV48JS49WiLqaFUJ8b5Fw_N0tf81waZhpY&usqp=CAU",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet consectetur. Euismod duis nec est in.",
      questions: 30,
      marks: 60,
      duration: "1 hours 56 minutes",
    },
    {
      id: 4,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35KZR24ZOkDWpCvR1KzF6FdnLeUaul4u11aV48JS49WiLqaFUJ8b5Fw_N0tf81waZhpY&usqp=CAU",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet consectetur. Tempor gravida morbi.",
      questions: 30,
      marks: 60,
      duration: "1 hours 56 minutes",
    },
  ];

  return (
    <section className=" py-12 mr-20 ml-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          EXPLORE MORE TEST
        </h2>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {tests.map((test) => (
              <div
                key={test.id}
                className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg p-4"
              >
                <div className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={test.avatar}
                      alt=""
                      className="rounded-full w-10 h-10"
                    />
                    <h3 className="font-medium text-black">{test.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{test.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>{test.questions} Questions</span>
                    <span>|</span>
                    <span>{test.marks} Marks</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full">
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Scroll right</span>
          </button>
        </div>
        <div className="text-center mt-6">
          <button className="text-blue-600 hover:text-blue-700 underline">
            View More
          </button>
        </div>
      </div>
      <div className="bg-blue-600 text-white rounded-lg p-20 mt-20 text-center">
          <h3 className="text-2xl md:text-5xl font-bold mb-6">
          Start Your Exam Preparation Now!

          </h3>
          <h5>Lorem ipsum dolor sit amet consectetur. Sociis ut tortor enim ut<br/> pellentesque vulputate aliquet.</h5>
          <br/>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
    </section>
  );
}
