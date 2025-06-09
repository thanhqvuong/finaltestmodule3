import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherForm from "./TeacherForm";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTeachers = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/teachers");
    console.log("Data from API:", res.data);

    if (Array.isArray(res.data.data)) {
      setTeachers(res.data.data);
    } else {
      setTeachers([]);
      console.warn("Dữ liệu không đúng định dạng mảng teachers.");
    }
  } catch (err) {
    console.error("Lỗi khi lấy danh sách giáo viên:", err);
  }
};


  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh sách giáo viên</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tạo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Mã</th>
              <th className="p-2 border">Giáo Viên</th>
              <th className="p-2 border">Trình Độ(cao nhất)</th>
              <th className="p-2 border">Bộ Môn</th>
              <th className="p-2 border">TT Công Tác</th>
              <th className="p-2 border">Địa Chỉ</th>
              <th className="p-2 border">Trạng Thái</th>
              <th className="p-2 border">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teachers) && teachers.length > 0 ? (
              teachers.map((teacher, index) => (
                <tr key={teacher._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{teacher.fullName}</td>
                  <td className="p-2 border">{teacher.email}</td>
                  <td className="p-2 border">{teacher.phoneNumber}</td>
                  <td className="p-2 border">
                    {teacher.gender === "male"
                      ? "Nam"
                      : teacher.gender === "female"
                      ? "Nữ"
                      : "Khác"}
                  </td>
                  <td className="p-2 border">
                    {teacher.dob
                      ? new Date(teacher.dob).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="p-2 border">{teacher.address}</td>
                  <td className="p-2 border">{teacher.specialty}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4">
                  Không có giáo viên nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <TeacherForm onClose={() => setShowForm(false)} onCreated={fetchTeachers} />
      )}
    </div>
  );
};

export default TeacherList;
