import { useEffect, useState } from "react";
import axios from "axios";
import PositionForm from "./PositionForm";
import { FaPlus, FaSync, FaCog } from "react-icons/fa";

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchPositions = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/api/positions");
      setPositions(res.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Danh sách Vị trí công tác</h2>
        <div className="space-x-2">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <FaPlus /> Tạo
          </button>
          <button
            onClick={fetchPositions}
            className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100"
          >
            <FaSync /> Làm mới
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4">
          <PositionForm onClose={() => setShowForm(false)} onRefresh={fetchPositions} />
        </div>
      )}

      <table className="w-full text-left border">
        <thead className="bg-purple-50">
          <tr>
            <th className="p-2 border">STT</th>
            <th className="p-2 border">Mã</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Mô tả</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center p-4">Đang tải dữ liệu...</td>
            </tr>
          ) : positions.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">Không có dữ liệu</td>
            </tr>
          ) : (
            positions.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{item.code}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                    {item.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
                  </span>
                </td>
                <td className="p-2 border">{item.description}</td>
                <td className="p-2 border text-center">
                  <FaCog className="inline text-gray-600 hover:text-black cursor-pointer" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PositionList;
