export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-8 text-3xl font-bold">Upload a CSV/Text File</h1>
      <div className="flex gap-4 mb-8">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload File</button>
        <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded" disabled>
          Fetch Data from File
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Download CSV Template</button>
      </div>
      
    </div>
  );
}
