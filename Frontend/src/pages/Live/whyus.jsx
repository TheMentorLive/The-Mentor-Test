export default function Whyus() {
  return (
    <section className="flex flex-col items-start mx-4 mt-24 mb-24 justify-center w-full max-w-7xl py-8 md:ml-20 md:mt-16 md:mb-16 md:flex-row md:items-center md:justify-between md:px-20">
      <div className="mb-8 md:mb-0 md:w-1/2">
        <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl">
          Ever Wondered Why<br /> Someone is Better <br />at Everything They <br />Do?
        </h1>
      </div>
      <div className="flex flex-col space-y-8 md:w-1/2">
        <div className="flex items-start space-x-4">
          <div className="text-3xl font-bold text-[#2563EB] sm:text-4xl md:text-5xl">55%</div>
          <div>
            <h2 className="text-base font-semibold text-[#2563EB] sm:text-lg">School Students [ 8 - 12 ]</h2>
            <p className="text-xs text-gray-600 sm:text-sm">Are more likely to enroll in higher education</p>
            <p className="text-xs font-semibold text-gray-600 sm:text-sm">CHALLENGES :</p>
            <p className="text-xs text-gray-600 sm:text-sm">Academic pressure, board exam stress, career confusion</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="text-3xl font-bold text-[#2563EB] sm:text-4xl md:text-5xl">79%</div>
          <div>
            <h2 className="text-base font-semibold text-[#2563EB] sm:text-lg">College Students</h2>
            <p className="text-xs text-gray-600 sm:text-sm">Report Better Career Opportunities</p>
            <p className="text-xs font-semibold text-gray-600 sm:text-sm">CHALLENGES :</p>
            <p className="text-xs text-gray-600 sm:text-sm">
              Lack of clarity in career choices, skill gaps, job market competition
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="text-3xl font-bold text-[#2563EB] sm:text-4xl md:text-5xl">86%</div>
          <div>
            <h2 className="text-base font-semibold text-[#2563EB] sm:text-lg">Working Professionals</h2>
            <p className="text-xs text-gray-600 sm:text-sm">Feel Increased Job Satisfaction</p>
            <p className="text-xs font-semibold text-gray-600 sm:text-sm">CHALLENGES :</p>
            <p className="text-xs text-gray-600 sm:text-sm">Career stagnation, work-life balance issues, leadership challenges</p>
          </div>
        </div>
      </div>
    </section>
  );
}
