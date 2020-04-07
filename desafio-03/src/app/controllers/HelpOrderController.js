import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { id } = req.params;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id: id,
      },
      include: { model: Student, as: 'student', attributes: ['id', 'name'] },
      order: [['created_at', 'DESC']],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id: id, question,
    });

    return res.send(helpOrder);
  }
}

export default new HelpOrderController();
