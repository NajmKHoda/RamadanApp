import Link from "next/link";

export default function Footer() {
    return (
        <footer className=" text-black py-6 mt-8">
            <div className="container mx-auto flex flex-col items-center">
                {/* Main logo section in column */}
                <div className="flex flex-col items-center mb-4">
                    <img
                        src="/amin-square-logo.png"
                        alt="AMIN Logo"
                        className="h-12 w-12 mb-2"
                    />
                    <p className="text-xs">
                        &copy; {new Date().getFullYear()} AMIN. All rights
                        reserved.
                    </p>
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
            </div>
        </footer>
    );
}
