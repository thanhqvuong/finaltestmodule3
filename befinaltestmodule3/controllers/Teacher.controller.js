import Teacher from '../models/Teacher.js';

export const getAllTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Teacher.countDocuments();

    const teachers = await Teacher.find({})
      .populate('teacherPosition')
      .skip(skip)
      .limit(limit)
      .lean();

    // Định dạng kết quả trả về
    const formatted = teachers.map(t => ({
      code: t.code,
      name: t.name,
      email: t.email,
      phone: t.phone,
      isActive: t.isActive,
      address: t.address,
      teacherPosition: t.teacherPosition ? t.teacherPosition.name : null,
      education: {
        level: t.education ? t.education.level : null,
        university: t.education ? t.education.university : null
      }
    }));

    res.status(200).json({
      data: formatted,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { name, email, phone, isActive, address, teacherPosition, education } = req.body;
    // Kiểm tra email trùng
    const existingEmail = await Teacher.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Tạo mã giáo viên ngẫu nhiên không trùng
    let code;
    do {
      code = Math.floor(100000 + Math.random() * 900000).toString(); // mã 6 chữ số
    } while (await Teacher.findOne({ code }));

    const newTeacher = new Teacher({
      code,
      name,
      email,
      phone,
      isActive,
      address,
      teacherPosition,
      education
    });

    await newTeacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher: newTeacher });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
