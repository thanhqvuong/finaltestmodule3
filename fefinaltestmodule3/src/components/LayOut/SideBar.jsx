const Sidebar = ({ onSelect }) => {
  const menuItems = [
    { label: "Thống kê", value: "statistic" },
    { label: "Lớp học", value: "classroom" },
    { label: "Học sinh", value: "student" },
    { label: "Giáo viên", value: "teacher" },
    { label: "Dữ liệu", value: "data" },
    { label: "Vị trí công tác", value: "position" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-blue-600">School System</h2>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(item.value)}
              className="block w-full text-left px-4 py-2 rounded hover:bg-blue-100 text-gray-700"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
