export default function Cards() {
    return (
      <section className="relative overflow-hidden ml-36 mr-36 mt-14 mb-16  py-16">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Gen Ai Knowledge Hub & progressive learning
                </h1>
                <p className="text-muted-foreground md:text-1xl">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet ectetur adipiscing elit sed. Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
              <div>
                <a
                  href="#"
                  className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700"
                >
                  Get Started
                </a>
              </div>
            </div>
            <div className="relative">
              {/* Decorative shapes */}
              <div className="absolute right-0 top-0 h-64 w-64 rounded-lg bg-red-600" />
              <div className="absolute right-12 top-12 h-64 w-64 rounded-lg bg-lime-400" />
  
              {/* Stats */}
              <div className="absolute bottom-0 right-0 rounded-xl bg-white p-6 shadow-lg">
                <div className="flex divide-x">
                  <div className="px-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">2K+</div>
                    <div className="text-sm text-muted-foreground">Lorem Ipsum</div>
                  </div>
                  <div className="px-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">100+</div>
                    <div className="text-sm text-muted-foreground">Lorem Ipsum</div>
                  </div>
                  <div className="px-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">40k+</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  