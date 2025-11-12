type Task = {
  curriculum: string;
  task: string;
  platform: string;
  dueDate: string;
};

const tasks: Task[] = [
  {
    curriculum: "Mathematics",
    task: "Algebra mastery practice",
    platform: "Khan Academy",
    dueDate: "Nov 15, 2025",
  },
  {
    curriculum: "Science",
    task: "Lab report: Photosynthesis",
    platform: "Google Classroom",
    dueDate: "Nov 18, 2025",
  },
  {
    curriculum: "Computer Science",
    task: "Responsive portfolio build",
    platform: "Replit",
    dueDate: "Nov 20, 2025",
  },
  {
    curriculum: "History",
    task: "Primary source analysis",
    platform: "Notion",
    dueDate: "Nov 22, 2025",
  },
  {
    curriculum: "Language Arts",
    task: "Narrative draft revision",
    platform: "Canvas",
    dueDate: "Nov 25, 2025",
  },
];

export default function Home() {
  return (
  <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16">
        <header className="flex flex-col gap-3 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            Student Task Overview
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Vibecoded Piece-of-Shit Weekly Curriculum Planner
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
                {tasks.map((task, index) => (
                  <tr
                    key={`${task.curriculum}-${index}`}
                    className="transition-colors hover:bg-slate-900/80"
                  >
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
                      {task.dueDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
