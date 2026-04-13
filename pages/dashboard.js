import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Card from "../components/Card";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [jobs, setJobs] = useState([]);

  const runAI = async () => {
    setJobs([{ title: prompt, status: "En attente" }, ...jobs]);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 space-y-6">
          <Card>
            <h3 className="text-sm text-gray-400 mb-2">Compute</h3>
            <p className="text-xl font-semibold">GPU disponible</p>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold">Lancer un job IA</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Entrer votre prompt"
              className="w-full h-24 bg-[#0B0F19] border border-gray-700 rounded-md p-3 mb-4 outline-none"
            />
            <button
              onClick={runAI}
              className="bg-[#6366F1] px-5 py-2 rounded-md hover:opacity-90 transition"
            >
              Lancer
            </button>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold">Historique</h3>
            <div className="space-y-3">
              {jobs.map((job, index) => (
                <div key={index} className="p-3 bg-[#0B0F19] rounded-md border border-gray-800">
                  <p className="text-sm">{job.title}</p>
                  <p className="text-xs text-gray-400">{job.status}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
