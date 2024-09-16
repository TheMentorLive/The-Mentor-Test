

export default function OEE() {
  return (
    <div className="flex justify-center mb-20 mt-16 w-full p-4 bg-[#2563EB]">
      <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-8 md:flex-row">
        
        <div className="flex flex-col items-center justify-between w-full max-w-xs p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            {/* Replace the rounded div with an image */}
            <img src="/Orient.png" alt="Orient Image"  className="mb-4 rounded-lg" />
            <h2 className="text-xl font-bold text-[#2563EB]">ORIENT</h2>
            <p className="text-lg font-semibold text-[#2563EB]">8 - 12</p>
            <p className="mt-4 text-center text-gray-700">
              To assist College Students and Pass outs to enter the Corporate
              workforce or Decide Dream Career paths
            </p>
          </div>
          <button className="mt-6 bg-[#2563EB] text-white px-4 py-2 rounded">Learn More</button>
        </div>

        <div className="flex flex-col items-center justify-between w-full max-w-xs p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <img src="/Emerge.png" alt="Emerge Image"  className="mb-4 rounded-lg" />
            <h2 className="text-xl font-bold text-[#2563EB]">EMERGE</h2>
            <p className="text-lg font-semibold text-[#2563EB]">College Grads</p>
            <p className="mt-4 text-center text-gray-700">
              Designed for college students to explore career paths, enhance employability skills, and transition
              smoothly into the workforce
            </p>
          </div>
          <button className="mt-6 bg-[#2563EB] text-white px-4 py-2 rounded">Learn More</button>
        </div>

        <div className="flex flex-col items-center justify-between w-full max-w-xs p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <img src="/Elevate.png" alt="Elevate Image" className="mb-4 rounded-lg" />
            <h2 className="text-xl font-bold text-[#2563EB]">ELEVATE</h2>
            <p className="text-lg font-semibold text-[#2563EB]">Working Professionals</p>
            <p className="mt-4 text-center text-gray-700">
              Focused on working professionals aiming to advance in their careers, develop leadership skills, and
              achieve work-life balance
            </p>
          </div>
          <button className="mt-6 bg-[#2563EB] text-white px-4 py-2 rounded">Learn More</button>
        </div>

      </div>
    </div>
  );
}
