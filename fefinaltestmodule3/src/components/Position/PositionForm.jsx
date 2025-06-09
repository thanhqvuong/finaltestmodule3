// src/components/Position/PositionForm.jsx
import { useState } from "react";
import axios from "axios";

const PositionForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/positions", formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo vị trí:", error);
    }
  };

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg border-l p-6 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Vị trí công tác</h2>
        <button onClick={onClose} className="text-gray-500">&#10005;</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Mã *</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tên *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Trạng thái *</label>
          <div className="flex gap-4 mt-1">
            <label>
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === "active"}
                onChange={handleChange}
                className="mr-1"
              />
              <span
                className={
                  formData.status === "active"
                    ? "bg-purple-600 text-white px-2 py-1 rounded text-sm"
                    : "bg-white text-black px-2 py-1 rounded text-sm"
                }
              >
                Hoạt động
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formData.status === "inactive"}
                onChange={handleChange}
                className="mr-1"
              />
              <span
                className={
                  formData.status === "inactive"
                    ? "bg-purple-600 text-white px-2 py-1 rounded text-sm"
                    : "bg-white text-black px-2 py-1 rounded text-sm"
                }
              >
                Ngừng
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default PositionForm;
