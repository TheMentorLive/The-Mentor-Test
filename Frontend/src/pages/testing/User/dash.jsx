import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useState } from "react";
import TestCards from "./alltest"; // Update the path as necessary
import Wishlist from "./wishlist";
import MyTests from "./mytests";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-700"></div>
  </div>
);

export default function Userdash() {
  const [activeTab, setActiveTab] = useState("allTests");

  const tabs = [
    { id: "allTests", label: "All Tests" },
    { id: "myTests", label: "My Tests" },
    { id: "wishlist", label: "Wishlist" },
    { id: "archived", label: "Archived" },
    { id: "learningTools", label: "Learning tools" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "allTests":
        return <TestCards />;
      case "myTests":
        return <MyTests />;
      case "wishlist":
        return <Wishlist />;
      case "archived":
      case "learningTools":
        return (
          <div>
            <LoadingSpinner />
            <p className="text-center mt-4 text-zinc-400">Content is under progress...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="space-y-6 mt-11 mb-[400px]">
        <div className="bg-zinc-900 text-white p-8 sm:p-16">
          <div className="container mx-auto max-w-[1330px]">
            <h1 className="text-2xl sm:text-4xl mb-6">My learning</h1>
            <nav>
              <ul className="flex flex-wrap gap-4 sm:gap-6 border-b border-zinc-700">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-block px-2 sm:px-4 py-1 sm:py-2 ${
                        activeTab === tab.id
                          ? "text-white border-b-2 border-white"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div>{renderContent()}</div>
      </div>
      <div className="border border-t-gray-700">
        <Footer />
      </div>
    </div>
  );
}