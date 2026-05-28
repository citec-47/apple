import Link from "next/link";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Shop and Learn",
    links: ["Store", "Mac", "iPad", "iPhone", "Watch", "Vision", "AirPods", "TV & Home", "AirTag", "Accessories", "Gift Cards"],
  },
  {
    title: "Apple Wallet",
    links: ["Wallet", "Apple Card", "Apple Pay", "Apple Cash"],
  },
  {
    title: "Account",
    links: ["Manage Your Apple Account", "Apple Store Account", "iCloud.com"],
  },
  {
    title: "Entertainment",
    links: ["Apple One", "Apple TV", "Apple Music", "Apple Arcade", "Apple Fitness+", "Apple News+", "Apple Podcasts", "Apple Books", "App Store"],
  },
  {
    title: "Apple Store",
    links: ["Find a Store", "Genius Bar", "Today at Apple", "Group Reservations", "Apple Camp", "Apple Store App", "Certified Refurbished", "Apple Trade In", "Financing", "Carrier Deals at Apple", "Order Status", "Shopping Help"],
  },
  {
    title: "For Business",
    links: ["Apple and Business", "Shop for Business"],
  },
  {
    title: "For Education",
    links: ["Apple and Education", "Shop for K-12", "Shop for College"],
  },
  {
    title: "For Healthcare",
    links: ["Apple and Healthcare"],
  },
  {
    title: "For Government",
    links: ["Apple and Government", "Shop for Veterans and Military", "Shop for State and Local Employees", "Shop for Federal Employees"],
  },
  {
    title: "Apple Values",
    links: ["Accessibility", "Education", "Environment", "Inclusion and Diversity", "Privacy", "Racial Equity and Justice", "Supply Chain Innovation"],
  },
  {
    title: "About Apple",
    links: ["Newsroom", "Apple Leadership", "Career Opportunities", "Investors", "Ethics & Compliance", "Events", "Contact Apple"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-appleGray-100 text-[12px] text-appleGray-500">
      <div className="mx-auto max-w-appleWide px-6 py-5">
        <p className="border-b border-appleGray-300 pb-4 leading-relaxed">
          More ways to shop:{" "}
          <Link href="#" className="text-appleBlue hover:underline">
            Find an Apple Store
          </Link>{" "}
          or{" "}
          <Link href="#" className="text-appleBlue hover:underline">
            other retailer
          </Link>{" "}
          near you. Or call 1-800-MY-APPLE.
        </p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8 py-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-2 text-[12px] font-semibold text-appleGray-900">{col.title}</h4>
              <ul className="space-y-1.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="hover:underline">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-appleGray-300 pt-5">
          <p className="mb-3">Copyright © 2026 Apple Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <span className="text-appleGray-300">|</span>
            <Link href="#" className="hover:underline">Terms of Use</Link>
            <span className="text-appleGray-300">|</span>
            <Link href="#" className="hover:underline">Sales and Refunds</Link>
            <span className="text-appleGray-300">|</span>
            <Link href="#" className="hover:underline">Legal</Link>
            <span className="text-appleGray-300">|</span>
            <Link href="#" className="hover:underline">Site Map</Link>
            <span className="ml-auto">United States</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
