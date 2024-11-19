import { Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function Part5() {
  return (
    <footer className="bg-white mt-20 px-4 border-t">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Gen AI</h2>
          <p className="text-gray-600 max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>
          <div className="flex space-x-4">
  <a href="#" className="text-gray-400 hover:text-gray-500">
    <span className="sr-only">Twitter</span>
    <div className="p-2 border rounded-full border-gray-400 hover:border-gray-500">
      <Twitter size={24} />
    </div>
  </a>
  <a href="#" className="text-gray-400 hover:text-gray-500">
    <span className="sr-only">Facebook</span>
    <div className="p-2 border rounded-full border-gray-400 hover:border-gray-500">
      <Facebook size={24} />
    </div>
  </a>
  <a href="#" className="text-gray-400 hover:text-gray-500">
    <span className="sr-only">Instagram</span>
    <div className="p-2 border rounded-full border-gray-400 hover:border-gray-500">
      <Instagram size={24} />
    </div>
  </a>
  <a href="#" className="text-gray-400 hover:text-gray-500">
    <span className="sr-only">GitHub</span>
    <div className="p-2 border rounded-full border-gray-400 hover:border-gray-500">
      <Linkedin size={24} />
    </div>
  </a>
</div>

        </div>
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h4 className="font-medium mb-2">About Us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-black hover:text-gray-900">Live</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Learn</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-black hover:text-gray-900">Test</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Jobs</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-black hover:text-gray-900">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Contact Us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-black hover:text-gray-900">Lorem Ipsum</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-8">
        <p className="text-gray-400 text-sm text-center">2024 Gen AI All rights reserved.</p>
      </div>
    </footer>
  );
}
