import { getTasks } from "@/lib/tasks";

export const dynamic = "force-dynamic";

function formatDueDate(input: string): string {
  const date = new Date(input);

  if (Number.isNaN(date.getTime())) {
    return input;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16">
        <header className="flex flex-col gap-3 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            Student Task Overview
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Vibecoded Trashy Weekly Curriculum Planner
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:mx-0 sm:text-base">
            Keep the cohort aligned with upcoming deliverables. Review the tasks below and remind
            students to submit their work on time.
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800/80 text-left text-sm sm:text-base">
              <thead className="bg-slate-900/80 text-slate-300">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium uppercase tracking-wide">
                    Curriculum
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium uppercase tracking-wide">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium uppercase tracking-wide">
                    Platform
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium uppercase tracking-wide">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-200">
                {tasks.length === 0 ? (
                  <tr>
                    <td className="px-6 py-5 text-sm text-slate-400 sm:text-base" colSpan={4}>
                      No tasks yet. Add one with the API when you are ready.
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => (
                    <tr key={task.id} className="transition-colors hover:bg-slate-900/80">
                      <td className="px-6 py-5 text-sm font-semibold sm:text-base">
                        {task.curriculum}
                      </td>
                      <td className="px-6 py-5 text-sm sm:text-base">
                        {task.task}
                      </td>
                      <td className="px-6 py-5 text-sm sm:text-base">
                        <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-200 sm:text-[0.75rem]">
                          {task.platform}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm sm:text-base text-slate-100">
                        {formatDueDate(task.dueDate)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
