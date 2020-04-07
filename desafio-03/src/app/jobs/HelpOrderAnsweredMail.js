import Mail from '../../lib/Mail';

class HelpOrderAnsweredMail {
  get key() {
    return 'HelpOrderAnsweredMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    const { student } = helpOrder;

    const student_first_name = student.name.split(' ')[0];

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: `${student_first_name}, sua dúvida foi respondida!`,
      template: 'helpOrderAnswered',
      context: {
        student_first_name, student, helpOrder,
      },
    });
  }
}

export default new HelpOrderAnsweredMail();
