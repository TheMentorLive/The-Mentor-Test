/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ungdnchJPHA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Whyus() {
    return (
      <section className="flex flex-col items-start ml-40 mt-16 mb-16 justify-center w-full max-w-7xl mx-auto py-16 px-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="mb-8 md:mb-0 md:w-1/2">
          <h1 className="text-5xl font-bold leading-tight text-black">
            Ever Wondered Why<br/> Someone is Better <br/>at Everything They <br/>Do?
          </h1>
        </div>
        <div className="flex flex-col space-y-8 md:w-1/2">
          <div className="flex items-start space-x-4">
            <div className="text-5xl font-bold text-[#2563EB]">55%</div>
            <div>
              <h2 className="text-lg font-semibold text-[#2563EB]">School Students [ 8 - 12 ]</h2>
              <p className="text-sm text-gray-600">Are more likely to enroll in higher education</p>
              <p className="text-sm font-semibold text-gray-600">CHALLENGES :</p>
              <p className="text-sm text-gray-600">Academic pressure, board exam stress, career confusion</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-5xl font-bold text-[#2563EB]">79%</div>
            <div>
              <h2 className="text-lg font-semibold text-[#2563EB]">College Students</h2>
              <p className="text-sm text-gray-600">Report Better Career Opportunities</p>
              <p className="text-sm font-semibold text-gray-600">CHALLENGES :</p>
              <p className="text-sm text-gray-600">
                Lack of clarity in career choices, skill gaps, job market competition
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-5xl font-bold text-[#2563EB]">86%</div>
            <div>
              <h2 className="text-lg font-semibold text-[#2563EB]">Working Professionals</h2>
              <p className="text-sm text-gray-600">Feel Increased Job Satisfaction</p>
              <p className="text-sm font-semibold text-gray-600">CHALLENGES :</p>
              <p className="text-sm text-gray-600">Career stagnation, work-life balance issues, leadership challenges</p>
            </div>
          </div>
        </div>
      </section>
    )
  }