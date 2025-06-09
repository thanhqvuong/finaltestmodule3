import React, { useEffect, useState } from "react";
import { getTeachers } from "../api/teacherApi";
import TeacherFormDrawer from "./TeacherFormDrawer";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const fetchData = async () => {
  try {
    const res = await getTeachers();
    setTeachers(res.data.data || []);  // Lấy đúng mảng giáo viên trong data
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu giáo viên:", error);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setOpenDrawer(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tạo
        </button>
      </div>

      <div className="overflow-auto rounded shadow border bg-white">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2">Mã</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">SĐT</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2">Địa chỉ</th>
              <th className="px-4 py-2">Vị trí</th>
            </tr>
          </thead>
          <tbody>
  {teachers.map((t) => (
    <tr key={t._id} className="border-t hover:bg-gray-50">
      <td className="px-4 py-2">{t.code}</td>
      <td className="px-4 py-2">{t.userId?.name || 'N/A'}</td>
      <td className="px-4 py-2">{t.userId?.email || 'N/A'}</td>
      <td className="px-4 py-2">{t.userId?.phoneNumber || 'N/A'}</td>
      <td className="px-4 py-2">{t.isActive ? 'Hoạt động' : 'Không hoạt động'}</td>
      <td className="px-4 py-2">{t.userId?.address || 'N/A'}</td>
      <td className="px-4 py-2">
        {(t.teacherPositionsId || []).map((p) => p.name).join(', ') || 'N/A'}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {openDrawer && (
        <TeacherFormDrawer
          onClose={() => {
            setOpenDrawer(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default TeacherList;
