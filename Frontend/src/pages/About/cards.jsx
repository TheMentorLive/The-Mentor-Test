export default function Cards() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-8 lg:ml-48 lg:mr-48 mt-14 mb-16 py-16">
      <div className="container relative z-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-6xl/none">
                Gen Ai <br /> Knowledge Hub & progressive learning
              </h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor incididunt Lorem ipsum dolor sit amet ectetur
                adipiscing elit sed. Lorem ipsum dolor sit amet consectetur.
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
          <div className="relative flex justify-center lg:flex hidden">
            {/* Replace decorative shapes with images */}
            <img
              src="./mentors/Background.png"
              alt="Red Decorative Shape"
              className="h-[150px] sm:h-[200px] lg:h-[270px] rounded-lg object-cover"
            />
            <img
              src="./mentors/Background1.png"
              alt="Green Decorative Shape"
              className="absolute right-4 top-12 h-[150px] sm:h-[200px] lg:h-[270px] rounded-lg object-cover"
            />

            {/* Stats */}
            <div className="absolute bottom-0 right-0 rounded-xl bg-white p-4 sm:p-6 shadow-lg">
              <div className="flex divide-x">
                <div className="px-2 sm:px-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">2K+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Lorem Ipsum</div>
                </div>
                <div className="px-2 sm:px-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Lorem Ipsum</div>
                </div>
                <div className="px-2 sm:px-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">40k+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
