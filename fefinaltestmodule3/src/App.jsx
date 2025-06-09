import React, { useState } from "react";
import TeacherList from "./components/TeacherList";
import PositionList from "./components/PositionList";
import { Toaster } from "react-hot-toast";

function App() {
  const [tab, setTab] = useState("teachers");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      
      <div className="bg-white rounded-xl shadow p-4 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-[30px] border-b mb-4">
          <button
            className={`py-2 px-4 font-semibold ${
              tab === "teachers"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setTab("teachers")}
          >
            Giáo viên
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              tab === "positions"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setTab("positions")}
          >
            Vị trí công tác
          </button>
        </div>

        {/* Tab content */}
        {tab === "teachers" ? <TeacherList /> : <PositionList />}
      </div>
    </div>
  );
}

export default App;
