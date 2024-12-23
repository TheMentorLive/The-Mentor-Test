import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full px-4 py-12 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Logo and Description Section */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold">Gen AI</h2>
            <p className="mt-4 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded-sm bg-black text-white hover:opacity-80">
                <Facebook className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="p-2 rounded-sm bg-black text-white hover:opacity-80">
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="p-2 rounded-sm bg-black text-white hover:opacity-80">
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="p-2 rounded-sm bg-black text-white hover:opacity-80">
                <Linkedin className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-semibold">Quick Links</h3>
            <div className="mt-4 space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                About Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Live
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold invisible">Links</h3>
            <div className="mt-4 space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Learn
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Test
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold invisible">Links</h3>
            <div className="mt-4 space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Jobs
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Community
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Contact Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Lorem Ipsum
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            2024 Gen AI All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
