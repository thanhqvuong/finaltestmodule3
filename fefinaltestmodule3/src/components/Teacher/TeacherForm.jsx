import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TeacherForm = ({ onClose, onRefresh }) => {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    phone: "",
    email: "",
    cccd: "",
    address: "",
    positionId: "",  // Thêm trường vị trí công tác
  });

  const [degrees, setDegrees] = useState([]);
  const [showAddDegree, setShowAddDegree] = useState(false);
  const [newDegree, setNewDegree] = useState({
    level: "",
    school: "",
    major: "",
    status: "",
    graduatedYear: "",
  });

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/positions");
        setPositions(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách vị trí:", error);
        toast.error("Không thể tải vị trí công tác");
      }
    };
    fetchPositions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewDegreeChange = (e) => {
    const { name, value } = e.target;
    setNewDegree((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDegree = () => {
    setDegrees((prev) => [...prev, newDegree]);
    setNewDegree({
      level: "",
      school: "",
      major: "",
      status: "",
      graduatedYear: "",
    });
    setShowAddDegree(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/teachers", {
        ...formData,
        degrees,
      });
      toast.success("Tạo giáo viên thành công!");
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo giáo viên:", error);
      toast.error("Tạo giáo viên thất bại");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white p-6 shadow-md rounded space-y-4"
    >
      {/* Nút đóng */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        title="Đóng"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold mb-2">Thông tin cá nhân</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Họ và tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ngày sinh</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Số CCCD</label>
          <input
            type="text"
            name="cccd"
            value={formData.cccd}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Chọn vị trí công tác - đặt trước phần học vị */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Vị trí công tác</label>
        <select
          name="positionId"
          value={formData.positionId}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Chọn vị trí --</option>
          {positions.map((pos) => (
            <option key={pos._id} value={pos._id}>
              {pos.name}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Học vị</h3>

      <table className="w-full text-sm border mb-2">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Bậc</th>
            <th className="border px-2 py-1">Trường</th>
            <th className="border px-2 py-1">Ngành</th>
            <th className="border px-2 py-1">Hoàn thành</th>
            <th className="border px-2 py-1">Năm TN</th>
          </tr>
        </thead>
        <tbody>
          {degrees.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-2">
                Trống
              </td>
            </tr>
          ) : (
            degrees.map((d, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{d.level}</td>
                <td className="border px-2 py-1">{d.school}</td>
                <td className="border px-2 py-1">{d.major}</td>
                <td className="border px-2 py-1">{d.status}</td>
                <td className="border px-2 py-1">{d.graduatedYear}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() => setShowAddDegree(true)}
        className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Thêm
      </button>

      {showAddDegree && (
        <div className="grid grid-cols-5 gap-2 mt-3">
          <select
            name="level"
            value={newDegree.level}
            onChange={handleNewDegreeChange}
            className="border px-2 py-1 rounded"
          >
            <option value="">-- Bậc --</option>
            <option value="Trung học">Trung học</option>
            <option value="Cao đẳng">Cao đẳng</option>
            <option value="Đại học">Đại học</option>
            <option value="Kỹ sư">Kỹ sư</option>
            <option value="Thạc sĩ">Thạc sĩ</option>
            <option value="Tiến sĩ">Tiến sĩ</option>
            <option value="Hậu tiến sĩ">Hậu tiến sĩ</option>
            <option value="Giáo sư">Giáo sư</option>
          </select>

          <input
            type="text"
            name="school"
            placeholder="Trường"
            value={newDegree.school}
            onChange={handleNewDegreeChange}
            className="border px-2 py-1 rounded"
          />

          <input
            type="text"
            name="major"
            placeholder="Ngành"
            value={newDegree.major}
            onChange={handleNewDegreeChange}
            className="border px-2 py-1 rounded"
          />

          <div className="flex items-center gap-1 px-2 py-1 border rounded">
            <input
              type="checkbox"
              name="status"
              checked={newDegree.status === "Hoàn thành"}
              onChange={(e) =>
                setNewDegree((prev) => ({
                  ...prev,
                  status: e.target.checked ? "Hoàn thành" : "",
                }))
              }
            />
            <label className="text-sm">Hoàn thành</label>
          </div>

          <input
            type="number"
            name="graduatedYear"
            placeholder="Năm TN"
            value={newDegree.graduatedYear}
            onChange={handleNewDegreeChange}
            className="border px-2 py-1 rounded"
            min="1900"
            max={new Date().getFullYear()}
          />

          <div className="col-span-5 flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={handleAddDegree}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={() => setShowAddDegree(false)}
              className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;
