import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { Mail, Phone, BrandWhatsapp } from 'tabler-icons-react'; // Import the icons you want to use


export default function Support() {
    return (
        <div className="bg-gray-50">
            <Header />
            <section className="mt-32 mb-32">
                <div className="container mx-auto text-center px-4 lg:px-0">
                    <Typography variant="h5" color="blue-gray" className="mb-4 !text-base lg:!text-2xl">
                        Contact Us
                    </Typography>
                    <Typography variant="h1" color="blue-gray" className="mb-4 !text-3xl lg:!text-5xl">
                        We&apos;re Here to Help
                    </Typography>
                    <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
                        Whether it&apos;s a question about our services, a request for technical assistance, or suggestions for improvement, our team is eager to hear from you.
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ml-44 mr-44  items-start"> {/* Reduce gap here */}

                        {/* Google Maps Iframe */}
                        {/* Google Maps Iframe */}
                        <div className="w-full h-full lg:max-h-[370px] lg:max-w-[570px]">
                            <iframe
                                src="https://maps.google.com/maps?width=600&height=450&hl=en&q=Unit%203,%20Block%20A,%20Prestige%20Atlanta,%20Koramangala,%20Bengaluru,%20560034&t=p&z=14&output=embed"
                                width="100%"
                                height="100%"
                                className="border border-t rounded-t-lg"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                            />

                            {/* Contact Details Section: Align text to the left */}
                            <div className="mt-4 text-left">
                                <div className="mb-2 flex items-center">
                                    <Mail className="mr-2 text-gray-600" />
                                    <a href="mailto:support@genailearning.in" className="hover:text-blue-500">
                                    support@genailearning.in
                                    </a>
                                    
                                </div>
                                <div className="mb-2 flex items-center">
                                    <BrandWhatsapp className="mr-2 text-green-600" />
                                    <a href="https://wa.link/ote426" className="text-blue-500 hover:underline">
                                        wa.link/ote426
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="mr-2 text-gray-600" />
                                    <span>+91 7358892301</span>
                                </div>
                            </div>
                        </div>




                        {/* Form Section */}
                        <form action="#" className="flex flex-col gap-4 lg:max-w-sm mx-auto"> {/* Center the form */}
                            <Typography variant="small" className="text-left !font-semibold !text-gray-600">
                                Fill the below form
                            </Typography>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                                        First Name
                                    </Typography>
                                    <Input
                                        color="gray"
                                        size="lg"
                                        placeholder="First Name"
                                        name="first-name"
                                        className="focus:border-t-gray-900 opacity-20"
                                        containerProps={{ className: "!min-w-full" }}
                                        labelProps={{ className: "hidden" }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                                        Last Name
                                    </Typography>
                                    <Input
                                        color="gray"
                                        size="lg"
                                        placeholder="Last Name"
                                        name="last-name"
                                        className="focus:border-t-gray-900 opacity-20"
                                        containerProps={{ className: "!min-w-full" }}
                                        labelProps={{ className: "hidden" }}
                                    />
                                </div>
                            </div>
                            <div>
                                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                                    Your Email
                                </Typography>
                                <Input
                                    color="gray"
                                    size="lg"
                                    placeholder="name@email.com"
                                    name="email"
                                    className="focus:border-t-gray-900 opacity-20"
                                    containerProps={{ className: "!min-w-full" }}
                                    labelProps={{ className: "hidden" }}
                                />
                            </div>
                            <div>
                                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900">
                                    Your Message
                                </Typography>
                                <Textarea
                                    rows={6}
                                    color="gray"
                                    placeholder="Message"
                                    name="message"
                                    className="focus:border-t-gray-900 opacity-20"
                                    containerProps={{ className: "!min-w-full" }}
                                    labelProps={{ className: "hidden" }}
                                />
                            </div>
                            <Button type="submit" className="w-full text-md bg-[#2563EB]"  >
                                Send message
                            </Button>

                            <p className="text-sm">
                                * Our team will get back to you shortly.
                            </p>
                        </form>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
