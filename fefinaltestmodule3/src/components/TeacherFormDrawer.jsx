import React, { useEffect, useState } from "react";
import { createTeacher } from "../api/teacherApi";
import { getPositions } from "../api/positionApi";
import { toast } from "react-hot-toast";

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
    education: [],
  });

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getPositions().then((res) => setPositions(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "isActive") {
      setForm((prev) => ({ ...prev, isActive: value === "true" }));
    } else if (name === "teacherPositionsId") {
      setForm((prev) => ({ ...prev, teacherPositionsId: [value] }));
    } else if (name === "education") {
      const list = value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
      setForm((prev) => ({ ...prev, education: list }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phoneNumber ||
      !form.teacherPositionsId.length ||
      !form.dob ||
      !form.identity
    ) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // ⚠️ Format dữ liệu đúng theo backend
    const payload = {
      name: form.name,
      email: form.email,
      address: form.address,
      dob: form.dob,
      identity: form.identity,
      phoneNumber: form.phoneNumber,
      isActive: form.isActive,
      teacherPositionsId: form.teacherPositionsId[0], // Gửi string
      education: form.education, // hoặc form.education.join("\n") nếu backend yêu cầu string
    };

    try {
      console.log("Payload gửi đi:", payload);
      await createTeacher(payload);
      toast.success("✅ Tạo giáo viên thành công!");
      onClose();
    } catch (error) {
      console.error("❌ Lỗi khi tạo giáo viên:", error);
      const msg =
        error?.response?.data?.message ||
        "Lỗi khi tạo giáo viên. Vui lòng kiểm tra lại dữ liệu.";
      toast.error(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-l-xl">
        <h2 className="text-lg font-bold mb-4">Tạo giáo viên</h2>

        <div className="flex flex-col gap-[15px]">
          <div className="grid grid-cols-2 gap-[15px]">
            <input
              className="input w-full"
              name="name"
              placeholder="Họ tên *"
              onChange={handleChange}
              value={form.name}
            />
            <input
              className="input w-full"
              name="email"
              placeholder="Email *"
              onChange={handleChange}
              value={form.email}
            />
            <input
              className="input w-full"
              name="phoneNumber"
              placeholder="Số điện thoại *"
              onChange={handleChange}
              value={form.phoneNumber}
            />
            <input
              className="input w-full"
              name="address"
              placeholder="Địa chỉ"
              onChange={handleChange}
              value={form.address}
            />
            <input
              className="input w-full"
              name="dob"
              type="date"
              placeholder="Ngày sinh *"
              onChange={handleChange}
              value={form.dob}
            />
            <input
              className="input w-full"
              name="identity"
              placeholder="Số CMND/CCCD *"
              onChange={handleChange}
              value={form.identity}
            />
            <select
              name="teacherPositionsId"
              className="input w-full"
              onChange={handleChange}
              value={form.teacherPositionsId[0] || ""}
            >
              <option value="">-- Vị trí công tác * --</option>
              {positions.map((pos) => (
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

          <textarea
            className="input w-full"
            name="education"
            placeholder="Học vấn (mỗi dòng là 1 mục)"
            rows={3}
            onChange={handleChange}
            value={form.education.join("\n")}
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherFormDrawer;
