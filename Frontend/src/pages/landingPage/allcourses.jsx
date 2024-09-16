export default function Allcourses() {
    return (
        <div>
        <div className="mr-40 ml-40 mt-32 mb-32">
      <section className="bg-[#f0f4ff] p-8 rounded-lg">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Get started with GenAI</h2>
            <p>Identify, develop and execute impactful GenAI business strategies.</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              View all GenAI
            </button>
          </div>
          <div className="col-span-3 space-y-4">
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-gray-200 text-sm font-medium rounded-lg">Beginner</span>
              <span className="px-2 py-1 bg-gray-300 text-sm font-medium rounded-lg">Popular</span>
              <span className="px-2 py-1 bg-gray-200 text-sm font-medium rounded-lg">New</span>
              <span className="px-2 py-1 bg-gray-200 text-sm font-medium rounded-lg">Tools</span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <img
                  src="/placeholder.svg"
                  alt="Generative AI Fundamentals"
                  className="rounded-lg"
                  width="300"
                  height="150"
                  style={{ aspectRatio: "300/150", objectFit: "cover" }}
                />
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <img src="/placeholder-user.jpg" alt="IBM" className="rounded-full" />
                    </div>
                    <p className="text-sm font-medium">IBM</p>
                  </div>
                  <h3 className="mt-2 text-lg font-bold">Generative AI Fundamentals</h3>
                  <p className="text-sm text-gray-500">Specialization</p>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <img
                  src="/placeholder.svg"
                  alt="AI for Good"
                  className="rounded-lg"
                  width="300"
                  height="150"
                  style={{ aspectRatio: "300/150", objectFit: "cover" }}
                />
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <img src="/placeholder-user.jpg" alt="DeepLearning.AI" className="rounded-full" />
                    </div>
                    <p className="text-sm font-medium">DeepLearning.AI</p>
                  </div>
                  <h3 className="mt-2 text-lg font-bold">AI for Good</h3>
                  <p className="text-sm text-gray-500">Specialization</p>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <img
                  src="/placeholder.svg"
                  alt="Navigating Generative AI for Leaders"
                  className="rounded-lg"
                  width="300"
                  height="150"
                  style={{ aspectRatio: "300/150", objectFit: "cover" }}
                />
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <img src="/placeholder-user.jpg" alt="Coursera" className="rounded-full" />
                    </div>
                    <p className="text-sm font-medium">Coursera</p>
                  </div>
                  <h3 className="mt-2 text-lg font-bold">Navigating Generative AI for Leaders</h3>
                  <p className="text-sm text-gray-500">Specialization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      </div>
    )
  }
  