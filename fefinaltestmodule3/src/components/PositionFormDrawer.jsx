import React, { useState } from 'react';
import { createPosition } from '../api/positionApi';

const PositionFormDrawer = ({ onClose }) => {
  const [form, setForm] = useState({
    code: '',
    name: '',
    description: '',
    status: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createPosition(form);
      onClose();
    } catch (err) {
      alert('Lỗi khi tạo vị trí. Vui lòng thử lại.');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-l-xl">
        <h2 className="text-lg font-bold mb-4">Tạo vị trí công tác</h2>
        <div className="space-y-4">
          <input
            name="code"
            placeholder="Mã vị trí"
            value={form.code}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="name"
            placeholder="Tên vị trí"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="description"
            placeholder="Mô tả"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
  name="status"
  value={form.status}
  onChange={(e) => setForm({ ...form, status: e.target.value === 'true' })}
  className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="true">Hoạt động</option>
  <option value="false">Ngưng</option>
</select>

        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PositionFormDrawer;
