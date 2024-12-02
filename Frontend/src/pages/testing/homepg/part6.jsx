import { FileText, Users, FileCheck } from 'lucide-react'

export default function Part6() {
  return (
    <section className="relative overflow-hidden mt-16 mb-10 md:mr-32 md:ml-36 lg:ml-36 lg:mr-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl tracking-tighter font-bold sm:text-4xl md:text-5xl">Why GEN Ai Learning?</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-base dark:text-gray-400">
                With 1.8+ Crore Students and One of the best Selection rate in India amongst online learning platforms, you can
                surely rely on us to excel.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg">
                Get Started
              </button>
            </div>
          </div>
          <div className=" rounded-l-3xl" >
            <img>
            </img>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 pt-8 lg:pt-12">
          <div className="border-none shadow-md bg-white rounded-lg ">
            <div className="flex items-center gap-4 border border-gray-300 rounded-lg  p-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <div className="space-y-1">
                <h3 className="font-medium"> Personalized Guidance -</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
               We’ve guided over 4,000 learners to success.
                </p>
              </div>
            </div>
          </div>
          <div className="border-none shadow-md bg-white rounded-lg">
            <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-6">
              <Users className="h-6 w-6 text-blue-600" />
              <div className="space-y-1">
                <h3 className="font-medium">Expert Mentors -</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                Our network of industry leaders ensures your growth.
                </p>
              </div>
            </div>
          </div>
          <div className="border-none shadow-md bg-white rounded-lg">
            <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-6">
              <FileCheck className="h-6 w-6 text-blue-600" />
              <div className="space-y-1">
                <h3 className="font-medium">Proven Results -</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                Trusted by learners and professionals worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
