import React, { useEffect, useState } from "react";
import { createTeacher } from "../api/teacherApi";
import { getPositions } from "../api/positionApi";

const TeacherFormDrawer = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    dob: "",
    identity: "",
    phoneNumber: "",
    isActive: true,
    teacherPositionsId: [],
    education: []
  });

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getPositions().then(res => setPositions(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "isActive") {
      setForm(prev => ({ ...prev, isActive: value === "true" }));
    } else if (name === "teacherPositionsId") {
      setForm(prev => ({ ...prev, teacherPositionsId: [value] }));
    } else if (name === "education") {
      // Chuyển education thành mảng theo dòng hoặc phân tách bằng dấu ,
      const list = value.split("\n").map(item => item.trim()).filter(Boolean);
      setForm(prev => ({ ...prev, education: list }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      await createTeacher(form);
      onClose();
    } catch (error) {
      console.error("❌ Lỗi khi tạo giáo viên:", error);
      alert("Lỗi khi tạo giáo viên. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-l-xl">
        <h2 className="text-lg font-bold mb-4">Tạo giáo viên</h2>
       <div className="flex flex-col gap-[15px]">
  {/* Hàng 2 cột: input & select */}
  <div className="grid grid-cols-2 gap-[15px]">
    <input className="input w-full" name="name" placeholder="Họ tên" onChange={handleChange} />
    <input className="input w-full" name="email" placeholder="Email" onChange={handleChange} />
    <input className="input w-full" name="phoneNumber" placeholder="Số điện thoại" onChange={handleChange} />
    <input className="input w-full" name="address" placeholder="Địa chỉ" onChange={handleChange} />
    <input className="input w-full" name="dob" type="date" placeholder="Ngày sinh" onChange={handleChange} />
    <input className="input w-full" name="identity" placeholder="Số CMND/CCCD" onChange={handleChange} />
    <select
      name="teacherPositionsId"
      className="input w-full"
      onChange={handleChange}
      value={form.teacherPositionsId[0] || ""}
    >
      <option value="">-- Vị trí công tác --</option>
      {positions.map(pos => (
        <option value={pos._id} key={pos._id}>
          {pos.name}
        </option>
      ))}
    </select>
    <select
      name="isActive"
      className="input w-full"
      onChange={handleChange}
      value={form.isActive.toString()}
    >
      <option value="true">Đang công tác</option>
      <option value="false">Đã nghỉ</option>
    </select>
  </div>

  {/* Học vấn: chiếm 100% chiều rộng */}
  <textarea
    className="input w-full"
    name="education"
    placeholder="Học vấn (mỗi dòng là 1 mục)"
    rows={3}
    onChange={handleChange}
  />
</div>

        <div className="mt-6 flex justify-between">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Hủy
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherFormDrawer;
