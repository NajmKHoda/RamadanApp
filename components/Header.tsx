import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-center items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold text-center">
          UCLA MSA Ramadan
        </Link>
      </div>
    </header>
  )
}

