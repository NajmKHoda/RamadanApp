import Link from "next/link";

export default function Footer() {
    return (
        <footer className=" text-black py-6 mt-8">
            <div className="container mx-auto flex flex-col items-center">
                {/* Main logo section in column */}
                <div className="flex flex-col items-center mb-4">
                    {/* Logo placeholder in a square */}
                    <div className="w-12 h-12 bg-gray-600 flex items-center justify-center mb-2">
                        {/* Replace this with your logo image */}
                        <span className="text-sm">Logo</span>
                    </div>
                    <div className="text-center">
                        <p className="text-xs">
                            Advancement of Muslims in Innovation and Networking
                        </p>
                    </div>
                </div>
                {/* Social media logos updated with small dimensions and correct src */}
                <div className="flex space-x-4 mb-4">
                    <Link
                        href="https://www.instagram.com/amin.ucla"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/instagram-logo.svg"
                            alt="Instagram"
                            className="h-6 w-6 hover:opacity-80"
                        />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/company/105635897/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/linkedin-logo.svg"
                            alt="LinkedIn"
                            className="h-6 w-6 hover:opacity-80"
                        />
                    </Link>
                </div>
                <p className="text-xs">
                    &copy; {new Date().getFullYear()} AMIN. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
