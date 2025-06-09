import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate('userId') // Lấy thông tin user
      .populate('teacherPositionsId'); // ✅ Populate trực tiếp tới Position (không lồng positionId nữa)

    res.json({ data: teachers });
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách giáo viên:", error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      dob,
      identity,
      phoneNumber,
      isActive,
      teacherPositionsId
    } = req.body;

    // Kiểm tra thông tin bắt buộc
    if (!dob || !identity || !phoneNumber) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc: ngày sinh, CMND, hoặc số điện thoại' });
    }

    // Kiểm tra email trùng
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Tạo user
    const user = new User({
      name,
      email,
      phone,
      address,
      dob,
      identity,
      phoneNumber
    });
    await user.save();

    // Tạo mã code giáo viên không trùng
    let code;
    let isUnique = false;
    while (!isUnique) {
      code = Math.floor(100000000 + Math.random() * 900000000).toString();
      const exists = await Teacher.findOne({ code });
      if (!exists) isUnique = true;
    }

    // Tạo giáo viên
    const newTeacher = new Teacher({
      code,
      isActive,
      isDeleted: false,
      userId: user._id,
      teacherPositionsId: [teacherPositionsId], // Nếu nhận 1 vị trí duy nhất, để vào mảng
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newTeacher.save();

    res.status(201).json({ message: 'Tạo giáo viên thành công', data: newTeacher });
  } catch (error) {
    console.error("❌ Lỗi khi tạo giáo viên:", error);
    res.status(500).json({ message: 'Lỗi server khi tạo giáo viên' });
  }
};
