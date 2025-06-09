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

    const formatted = teachers.map(t => ({
      code: t.code,
      name: t.name,
      email: t.email,
      phone: t.phone,
      isActive: t.isActive,
      address: t.address,
      teacherPosition: t.teacherPosition?.name || null,
      education: {
        level: t.education?.level,
        university: t.education?.university
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
