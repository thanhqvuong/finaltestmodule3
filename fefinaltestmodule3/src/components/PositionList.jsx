import React, { useEffect, useState } from 'react';
import { getPositions } from '../api/positionApi';
import PositionFormDrawer from './PositionFormDrawer';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const fetchData = async () => {
    const res = await getPositions();
    setPositions(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Danh sách vị trí</h2>
        <button
          onClick={() => setOpenDrawer(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Tạo mới
        </button>
      </div>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">Mã</th>
              <th className="py-3 px-4 border-b">Tên</th>
              <th className="py-3 px-4 border-b">Trạng thái</th>
              <th className="py-3 px-4 border-b">Mô tả</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {positions.map((pos) => (
              <tr key={pos._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{pos.code}</td>
                <td className="py-3 px-4 border-b">{pos.name}</td>
                <td className="py-3 px-4 border-b">
  {pos.isActive ? (
    <span className="text-green-600 font-medium">Hoạt động</span>
  ) : (
    <span className="text-red-500 font-medium">Ngưng</span>
  )}
</td>

                <td className="py-3 px-4 border-b">{pos.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openDrawer && (
        <PositionFormDrawer
          onClose={() => {
            setOpenDrawer(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default PositionList;
