

export default function Part2() {
  function toggleAccordion(e) {
    const content = e.target.nextElementSibling;
    if (content) {
      content.classList.toggle("hidden");
    }
  }
  return (
    <div className="mx-auto p-6 lg:ml-16 mr-16">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          {/* About the Test Section */}
          <section className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">About the Test</h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur dolorii adipiscing elit. Felis donec massa aliquam id. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Purus viverra praesent felis consequat pellentesque turpis et
              quisque platea. Eu, elit ut nunc ac mauris bibendum nulla placerat. Sagittis sit eu sit massa sapien,
            </p>
            <div className="space-y-4 border-t pt-4">
              <div className="flex gap-2">
                <span className="font-medium">Type:</span>
                <span className="text-gray-500">Competitive Exams</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium">Time:</span>
                <span className="text-gray-500">60 mins</span>
              </div>
            </div>
          </section>

          {/* Summary Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Summary of the UPSC: test</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur dolorii adipiscing elit. Felis donec massa aliquam id. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Purus viverra praesent felis consequat pellentesque turpis et
              quisque platea. Eu, elit ut nunc ac mauris bibendum nulla placerat. Sagittis sit eu sit massa sapien, risus
              diam. In lorem eu sed euismod laoreet urna, feugiat et. Euismod sem purus rutrum in. Tortor varius a bibendum
              nisl et tellus. Aliquet elit senectus iaculis netus gravida.
            </p>
          </section>
        </div>

        {/* Card Section */}
        <div className="bg-white rounded-lg shadow-lg h-fit p-6">
          <div className="space-y-4">
            <img
              src="./courses/Image4.png"
              width={400}
              height={200}
              alt="Hexagonal pattern"
              className="rounded-lg object-cover"
            />
            <h3 className="text-xl font-bold">Lorem ipsum</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">₹ 499/-</span>
              <span className="text-sm text-gray-500 line-through">₹1500</span>
              <span className="text-sm text-green-600">67% OFF</span>
            </div>
            <p className="text-sm text-gray-500">
              In at iaculis lorem. Praesent tempor dictum tellus ut molestie. Sed sed ullamcorper lorem
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>


      <section>
      <div className="w-full  mx-auto space-y-8 p-4">
      {/* Test Module Section */}
      <div className="rounded-lg border bg-gray-100">
        <h2 className="text-lg font-medium p-4">Test Module</h2>
        <div className="w-full">
          {/* Accordion Item 1 */}
          <div className="border-b">
            <button
              className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              <div className="flex gap-2">
                <span className="text-gray-500">01</span>
                <span>Front-End Web Development</span>
              </div>
              <span>+</span>
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Ensure data accuracy and consistency by removing irrelevant information.
            </div>
          </div>

          {/* Accordion Item 2 */}
          <div className="border-b">
            <button
              className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              <div className="flex gap-2">
                <span className="text-gray-500">02</span>
                <span>Introduction to HTML</span>
              </div>
              <span>+</span>
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Learn the fundamentals of HTML and web structure.
            </div>
          </div>

          {/* Accordion Item 3 */}
          <div className="border-b">
            <button
              className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              <div className="flex gap-2">
                <span className="text-gray-500">03</span>
                <span>Lorem ipsum dol</span>
              </div>
              <span>+</span>
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>

          {/* Accordion Item 4 */}
          <div className="border-b">
            <button
              className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              <div className="flex gap-2">
                <span className="text-gray-500">04</span>
                <span>Lorem ipsum dosation</span>
              </div>
              <span>+</span>
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-lg border bg-gray-100">
        <h2 className="text-xl font-semibold p-4">FAQ'S</h2>
        <div className="w-full">
          {/* FAQ Item 1 */}
          <div className="border-b">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              What Curriculums Do You Offer?
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="border-b">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              Lorem Ipsum Dolor Sit Amet, Consectetur, Lorem Ipsum Dolor Sit Amet?
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="border-b">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={(e) => toggleAccordion(e)}
            >
              Lorem Ipsum Dolor Sit Amet, Consectetur, Lorem Ipsum Dolor Sit Amet?
            </button>
            <div className="hidden px-4 pt-1 pb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </div>
    </div>
  

  
      </section>
    </div>
  );
}

