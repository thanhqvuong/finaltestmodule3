import { useState } from "react";
import Sidebar from "../components/LayOut/Sidebar.jsx";
import TeacherList from "../components/Teacher/TeacherList";
import PositionList from "../components/Position/PositionList";

export default function MainLayout() {
  const [activeView, setActiveView] = useState("teacher"); // mặc định là Giáo viên

  return (
    <div className="flex min-h-screen">
      <Sidebar onSelect={setActiveView} />

      <div className="flex-1 p-6 bg-gray-50">
        {activeView === "teacher" && (
          <>
            <h1 className="text-xl font-bold mb-4">Danh sách giáo viên</h1>
            <TeacherList />
          </>
        )}

        {activeView === "position" && (
          <>
            <h1 className="text-xl font-bold mb-4">Danh sách vị trí công tác</h1>
            <PositionList />
          </>
        )}

        {!["teacher", "position"].includes(activeView) && (
          <div className="text-gray-400 italic">Tính năng đang phát triển...</div>
        )}
      </div>
    </div>
  );
}
