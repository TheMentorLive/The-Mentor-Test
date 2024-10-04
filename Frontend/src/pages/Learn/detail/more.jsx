export default function More() {
    return (
      <div className="flex min-h-screen ml-[140px] mr-[640px] flex-col bg-background">
        <main className="container mx-auto my-8 flex-1 space-y-8 px-4 sm:px-6 md:px-8">
          <section>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Competitive Exams</h2>
                <p className="text-muted-foreground">Prepare for the top competitive exams in your field.</p>
              </div>
              <a href="#" className="text-primary">View All</a>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {["UPSC CSE", "GATE", "CAT", "NEET"].map((exam) => (
                <div key={exam} className="border rounded shadow p-4">
                  <h3 className="font-bold">{exam}</h3>
                  <p className="text-muted-foreground">Prepare for the {exam} exam.</p>
                  <div className="flex justify-between mt-4">
                    <button className="border rounded p-2">Register</button>
                    <button className="bg-blue-500 text-white text-sm rounded p-2">Start Exam</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Academic Exams</h2>
                <p className="text-muted-foreground">Prepare for the top academic exams in your field.</p>
              </div>
              <a href="#" className="text-primary">View All</a>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {["CBSE Board Exams", "ICSE Board Exams", "JEE Main", "NATA"].map((exam) => (
                <div key={exam} className="border rounded shadow p-4">
                  <h3 className="font-bold">{exam}</h3>
                  <p className="text-muted-foreground">Prepare for the {exam}.</p>
                  <div className="flex justify-between mt-4">
                    <button className="border rounded p-2">Register</button>
                    <button className="bg-blue-500 text-white text-sm rounded p-2">Start Exam</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Company-based Tests</h2>
                <p className="text-muted-foreground">Prepare for the top company-based tests in your field.</p>
              </div>
              <a href="#" className="text-primary">View All</a>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {["Amazon SDE", "Google APAC", "Microsoft SWE", "Flipkart SDE"].map((exam) => (
                <div key={exam} className="border rounded shadow p-4">
                  <h3 className="font-bold">{exam}</h3>
                  <p className="text-muted-foreground">Prepare for the {exam} recruitment test.</p>
                  <div className="flex justify-between mt-4">
                    <button className="border rounded p-2">Register</button>
                    <button className="bg-blue-500 text-white text-sm rounded p-2">Start Exam</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }
  