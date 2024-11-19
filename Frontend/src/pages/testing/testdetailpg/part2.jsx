export default function Component() {
    return (
      <div className="container mx-auto p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-8">
            <section className="space-y-4">
              <h1 className="text-2xl font-bold">About the Test</h1>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur dolorii adipiscing elit. Felis donec massa aliquam id. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Purus viverra praesent felis consequat pellentesque turpis et
                quisque platea. Eu, elit ut nunc ac mauris bibendum nulla placerat. Sagittis sit eu sit massa sapien,
              </p>
              <div className="space-y-2 border-t pt-4">
                <div className="flex gap-2">
                  <span className="font-medium">Type:</span>
                  <span className="text-muted-foreground">Competitive Exams</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium">Time:</span>
                  <span className="text-muted-foreground">60 mins</span>
                </div>
              </div>
            </section>
  
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Summary of the UPSC: test</h2>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur dolorii adipiscing elit. Felis donec massa aliquam id. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Purus viverra praesent felis consequat pellentesque turpis et
                quisque platea. Eu, elit ut nunc ac mauris bibendum nulla placerat. Sagittis sit eu sit massa sapien, risus
                diam. In lorem eu sed euismod laoreet urna, feugiat et. Euismod sem purus rutrum in. Tortor varius a bibendum
                nisl et tellus. Aliquet elit senectus iaculis netus gravida.
              </p>
            </section>
  
            <section>
              <h2 className="mb-4 text-xl font-semibold">Test Module</h2>
              <div className="w-full rounded-lg border bg-card">
                <div className="border-b">
                  <button
                    className="w-full px-4 py-3 flex items-center gap-4 text-left hover:bg-gray-100"
                    type="button"
                  >
                    <span className="text-sm font-medium">01</span>
                    <span>Front-End Web Development</span>
                  </button>
                  <div className="px-4 pt-2 text-sm text-muted-foreground">
                    Ensure data accuracy and consistency by removing irrelevant information.
                  </div>
                </div>
                <div className="border-b">
                  <button
                    className="w-full px-4 py-3 flex items-center gap-4 text-left hover:bg-gray-100"
                    type="button"
                  >
                    <span className="text-sm font-medium">02</span>
                    <span>Introduction to HTML</span>
                  </button>
                  <div className="px-4 pt-2 text-sm text-muted-foreground">
                    Learn the fundamentals of HTML and web structure.
                  </div>
                </div>
                <div>
                  <button
                    className="w-full px-4 py-3 flex items-center gap-4 text-left hover:bg-gray-100"
                    type="button"
                  >
                    <span className="text-sm font-medium">03</span>
                    <span>Lorem ipsum dol</span>
                  </button>
                  <div className="px-4 pt-2 text-sm text-muted-foreground">
                    Additional course content and materials.
                  </div>
                </div>
              </div>
            </section>
          </div>
  
          <div className="h-fit rounded-lg border bg-card">
            <div className="p-6">
              <div className="space-y-4">
                <img
                  src="/placeholder.svg"
                  width={400}
                  height={200}
                  alt="Course preview"
                  className="rounded-lg object-cover"
                />
                <h3 className="text-xl font-bold">Lorem ipsum</h3>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">₹ 499/-</span>
                  <span className="text-sm text-muted-foreground line-through">₹3500</span>
                  <span className="text-sm text-primary">87% OFF</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  In at iaculis lorem. Praesent tempor dictum tellus ut molestie. Sed sed ullamcorper lorem
                </p>
                <button className="w-full py-2 px-4 bg-primary text-white rounded-lg">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  