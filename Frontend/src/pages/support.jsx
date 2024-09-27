import Header from "../components/Header"
import Footer from "../components/Footer"
export default function Support() {
    return (
        <div>
            <Header/>
      <div className="flex flex-col min-h-dvh">
       
        <main className="flex-1 py-12 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  <ul className="space-y-2">
                    <li>Found a bug</li>
                    <li>Something is not working as expected</li>
                  </ul>
                </p>
              </div>
              <div className="bg-muted rounded-md p-6">
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="font-medium">Name</label>
                    <input id="name" type="text" placeholder="Enter your name" className="border p-2 rounded" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="font-medium">Email</label>
                    <input id="email" type="email" placeholder="Enter your email" className="border p-2 rounded" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="subject" className="font-medium">Subject</label>
                    <input id="subject" type="text" placeholder="Briefly describe your issue" className="border p-2 rounded" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="font-medium">Message</label>
                    <textarea id="message" placeholder="Provide more details" className="min-h-[150px] border p-2 rounded"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-2 rounded">
                    Submit Ticket
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        
      </div>
      <Footer/>
      </div>
    )
  }
  
