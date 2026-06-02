import { desc } from "drizzle-orm";
import { db } from "@/db/client";
import { supportMessages } from "@/db/schema";
import { replySupportMessageAction, updateSupportStatusAction } from "@/lib/support";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-yellow-100 text-yellow-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-appleGray-200 text-appleGray-700",
};

export default async function AdminMessagesPage() {
  const messages = await db.select().from(supportMessages).orderBy(desc(supportMessages.createdAt));

  const counts = messages.reduce(
    (acc, m) => {
      acc[m.status] = (acc[m.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="mx-auto max-w-appleWide px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500">Support</p>
          <h1 className="mt-1 text-3xl font-semibold text-appleGray-900">Messages</h1>
          <p className="mt-2 text-appleGray-700">
            Everything sent from the Support page. Reply to each one below.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
            {counts.new ?? 0} new
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
            {counts.replied ?? 0} replied
          </span>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-appleGray-300 bg-white p-12 text-center">
          <p className="text-appleGray-700">No messages yet. They&apos;ll appear here as customers reach out.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {messages.map((m) => (
            <article key={m.id} className="overflow-hidden rounded-2xl bg-white ring-1 ring-appleGray-200">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-appleGray-100 px-6 py-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-appleGray-900">{m.name}</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[m.status] ?? STATUS_STYLES.archived}`}>
                      {m.status}
                    </span>
                  </div>
                  <a href={`mailto:${m.email}`} className="text-sm text-appleBlue hover:underline">
                    {m.email}
                  </a>
                  {m.subject && <p className="mt-1 text-sm font-medium text-appleGray-900">Re: {m.subject}</p>}
                </div>
                <p className="shrink-0 text-xs text-appleGray-500">{new Date(m.createdAt).toLocaleString()}</p>
              </div>

              <div className="px-6 py-4">
                <p className="whitespace-pre-wrap text-sm text-appleGray-800">{m.message}</p>

                {m.adminReply && (
                  <div className="mt-4 rounded-xl bg-appleGray-100 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-appleGray-500">
                      Your reply{m.repliedAt ? ` · ${new Date(m.repliedAt).toLocaleString()}` : ""}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-appleGray-800">{m.adminReply}</p>
                  </div>
                )}

                <form action={replySupportMessageAction} className="mt-4">
                  <input type="hidden" name="id" value={m.id} />
                  <label htmlFor={`reply-${m.id}`} className="text-xs font-semibold text-appleGray-700">
                    {m.adminReply ? "Update reply" : "Write a reply"}
                  </label>
                  <textarea
                    id={`reply-${m.id}`}
                    name="reply"
                    rows={3}
                    required
                    defaultValue={m.adminReply ?? ""}
                    placeholder={`Reply to ${m.name}…`}
                    className="mt-1 w-full rounded-xl border border-appleGray-300 bg-white px-3 py-2 text-sm focus:border-appleBlue focus:outline-none"
                  />
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <button type="submit" className="rounded-full bg-appleBlue px-4 py-2 text-sm font-medium text-white hover:bg-[#0077ed]">
                      Send reply
                    </button>
                    <span className="text-xs text-appleGray-500">
                      Saved against this message; also email {m.email} directly.
                    </span>
                  </div>
                </form>
              </div>

              <div className="flex justify-end gap-2 border-t border-appleGray-100 px-6 py-3">
                {m.status !== "archived" ? (
                  <form action={updateSupportStatusAction}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="status" value="archived" />
                    <button type="submit" className="rounded-lg border border-appleGray-300 px-3 py-1.5 text-xs font-medium text-appleGray-700 hover:bg-appleGray-100">
                      Archive
                    </button>
                  </form>
                ) : (
                  <form action={updateSupportStatusAction}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="status" value="new" />
                    <button type="submit" className="rounded-lg border border-appleGray-300 px-3 py-1.5 text-xs font-medium text-appleGray-700 hover:bg-appleGray-100">
                      Reopen
                    </button>
                  </form>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
