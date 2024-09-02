export default function LiveTabs() {
  return (
    <div className="flex flex-col mt-16 items-center p-4 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Mentorship Programs</h1>
        <h2 className="text-3xl font-bold text-gray-800">for Each Age Group</h2>
      </header>
      <main className="flex flex-wrap justify-center gap-8">
        <div className="max-w-xs p-4 bg-white rounded-lg shadow-md">
          <img
            src="/placeholder.svg"
            alt="Orient"
            className="w-full h-auto rounded-lg"
            width="300"
            height="200"
            style={{ aspectRatio: "300/200", objectFit: "cover" }}
          />
          <h3 className="mt-4 text-2xl font-bold text-blue-600">Orient</h3>
          <p className="mt-2 text-center text-gray-700">
            To assist College Students and Pass outs with a <strong>Holistic Personality Development</strong> to enter
            the Corporate workforce or Decide Dream Career paths.
          </p>
        </div>
        <div className="max-w-xs p-4 bg-white rounded-lg shadow-md">
          <img
            src="/placeholder.svg"
            alt="Emerge"
            className="w-full h-auto rounded-lg"
            width="300"
            height="200"
            style={{ aspectRatio: "300/200", objectFit: "cover" }}
          />
          <h3 className="mt-4 text-2xl font-bold text-blue-600">Emerge</h3>
          <p className="mt-2 text-center text-gray-700">
            Designed for college students to explore career paths, <strong>enhance employability skills</strong>, and
            transition smoothly into the workforce.
          </p>
        </div>
        <div className="max-w-xs p-4 bg-white rounded-lg shadow-md">
          <img
            src="/placeholder.svg"
            alt="Elevate"
            className="w-full h-auto rounded-lg"
            width="300"
            height="200"
            style={{ aspectRatio: "300/200", objectFit: "cover" }}
          />
          <h3 className="mt-4 text-2xl font-bold text-blue-600">Elevate</h3>
          <p className="mt-2 text-center text-gray-700">
            Focused on working professionals aiming to advance in their careers,{" "}
            <strong>develop leadership skills</strong>, and achieve work-life balance.
          </p>
        </div>
      </main>
      
    </div>
  )
}