import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  code: String,
  isDeleted: Boolean,
  isActive: Boolean,
  startDate: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacherPositionsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  }],
  degrees: [String],
  
  // ✅ Thêm học vấn
  education: {
    level: { type: String, trim: true },
    school: { type: String, trim: true },
  },

  createdAt: Date,
  updatedAt: Date
}, {
  collection: 'teachers',
  strict: false
});

export default mongoose.model('Teacher', TeacherSchema);
