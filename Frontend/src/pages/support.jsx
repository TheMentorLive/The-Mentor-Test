import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Support() {
    return (
        <div className="bg-gray-50 ">
            <Header />
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 py-12 md:py-24 flex items-center justify-center"> {/* Centering the content */}
                    <div className="container">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <div className="text-center">
                                <h1 className="text-4xl font-extrabold text-blue-600">Contact Us</h1>
                                <p className="mt-4 text-gray-600">Have a question? Let us know!</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <form className="grid gap-4" onSubmit={(e) => {
                                    e.preventDefault();
                                    // Handle form submission
                                }}>
                                    {["name", "email", "subject"].map((field, index) => (
                                        <div key={index} className="grid gap-2">
                                            <label htmlFor={field} className="font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                            <input id={field} type={field === "email" ? "email" : "text"} placeholder={`Enter your ${field}`} required className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                    ))}
                                    <div className="grid gap-2">
                                        <label htmlFor="message" className="font-medium">Message</label>
                                        <textarea id="message" placeholder="Provide more details" required className="min-h-[150px] border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" maxLength="500"></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-500 transition duration-300">
                                        Submit Ticket
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
