import React, { useEffect, useState } from "react";
import { getTeachers } from "../api/teacherApi";
import TeacherFormDrawer from "./TeacherFormDrawer";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const res = await getTeachers(page, limit);
      setTeachers(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1); // ✅ Lấy đúng dữ liệu phân trang
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu giáo viên:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách giáo viên</h2>
        <button
          onClick={() => setOpenDrawer(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tạo
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
                <td className="px-4 py-2">{t.userId?.name || "N/A"}</td>
                <td className="px-4 py-2">{t.userId?.email || "N/A"}</td>
                <td className="px-4 py-2">{t.userId?.phoneNumber || "N/A"}</td>
                <td className="px-4 py-2">
                  {t.isActive ? "Hoạt động" : "Không hoạt động"}
                </td>
                <td className="px-4 py-2">{t.userId?.address || "N/A"}</td>
                <td className="px-4 py-2">
                  {(t.teacherPositionsId || []).map((p) => p.name).join(", ") || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Trang {page} / {totalPages}
        </span>
        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Trước
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      {/* Drawer */}
      {openDrawer && (
        <TeacherFormDrawer
          onClose={() => {
            setOpenDrawer(false);
            setPage(1);       // ✅ Reset về trang đầu sau khi tạo
            fetchData();      // ✅ Refresh lại danh sách
          }}
        />
      )}
    </div>
  );
};

export default TeacherList;
