import { desc, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { visitors } from "@/db/schema";

export const dynamic = "force-dynamic";

const FLAG = (cc: string | null): string => {
  if (!cc || cc.length !== 2) return "🌐";
  const A = 0x41;
  const OFFSET = 0x1f1e6 - A;
  return String.fromCodePoint(
    cc.charCodeAt(0) + OFFSET,
    cc.charCodeAt(1) + OFFSET
  );
};

export default async function VisitorsPage() {
  const recent = await db.select().from(visitors).orderBy(desc(visitors.createdAt)).limit(200);

  const byCountry = await db.execute<{
    country: string;
    country_name: string;
    n: number;
  }>(sql`
    SELECT country, country_name, count(*)::int AS n
    FROM visitors WHERE country IS NOT NULL
    GROUP BY country, country_name ORDER BY n DESC LIMIT 20;
  `);

  const today = await db.execute<{ n: number }>(sql`
    SELECT count(*)::int AS n FROM visitors WHERE created_at > now() - interval '24 hours';
  `);
  const week = await db.execute<{ n: number }>(sql`
    SELECT count(*)::int AS n FROM visitors WHERE created_at > now() - interval '7 days';
  `);
  const total = await db.execute<{ n: number }>(sql`SELECT count(*)::int AS n FROM visitors;`);

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">Visitors</p>
      <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">Who&apos;s visiting</h1>
      <p className="mt-2 text-appleGray-700">
        Every page view, with country and city when available.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Last 24 hours" value={(today.rows?.[0]?.n ?? 0).toString()} />
        <Stat label="Last 7 days" value={(week.rows?.[0]?.n ?? 0).toString()} />
        <Stat label="All time" value={(total.rows?.[0]?.n ?? 0).toString()} />
      </div>

      {/* Top countries */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-appleGray-900">Top countries</h2>
        {(byCountry.rows?.length ?? 0) === 0 ? (
          <p className="mt-3 text-sm text-appleGray-700">
            No country data yet. Visitors on localhost don&apos;t get geolocated — try opening the site
            from another network to populate this.
          </p>
        ) : (
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {byCountry.rows?.map((row) => (
              <li
                key={row.country}
                className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-appleGray-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{FLAG(row.country)}</span>
                  <div>
                    <p className="font-medium text-appleGray-900">{row.country_name ?? row.country}</p>
                    <p className="text-xs text-appleGray-500">{row.country}</p>
                  </div>
                </div>
                <span className="rounded-full bg-appleBlue/10 px-2.5 py-0.5 text-xs font-semibold text-appleBlue">
                  {row.n}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Recent visits */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-appleGray-900">Recent visits</h2>
        <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-appleGray-200">
          <table className="w-full text-sm">
            <thead className="bg-appleGray-100 text-left text-xs uppercase tracking-widest text-appleGray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">When</th>
                <th className="px-5 py-3 font-semibold">Where</th>
                <th className="px-5 py-3 font-semibold">Page</th>
                <th className="px-5 py-3 font-semibold">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-appleGray-200">
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-appleGray-700">
                    No visits recorded yet. Open the public site to start collecting data.
                  </td>
                </tr>
              ) : (
                recent.map((v) => (
                  <tr key={v.id} className="hover:bg-appleGray-50">
                    <td className="px-5 py-3 text-xs text-appleGray-700 whitespace-nowrap">
                      {new Date(v.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg" aria-hidden="true">{FLAG(v.country)}</span>
                        <span className="text-sm">
                          {v.city ? `${v.city}, ` : ""}{v.countryName ?? v.country ?? "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-appleGray-900">{v.path}</td>
                    <td className="px-5 py-3 font-mono text-xs text-appleGray-500">{v.ip ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-appleGray-200">
      <p className="text-xs font-semibold uppercase tracking-widest text-appleGray-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-appleGray-900">{value}</p>
    </div>
  );
}
