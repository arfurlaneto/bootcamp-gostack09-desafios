import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class NewMembershipMail {
  get key() {
    return 'NewMembershipMail';
  }

  async handle({ data }) {
    const { membership, student, plan } = data;

    const student_first_name = student.name.split(' ')[0];

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: `Parabéns pela sua matrícula, ${student_first_name}!`,
      template: 'newMembership',
      context: {
        student_first_name,
        student_name: student.name,
        plan_name: plan.title,
        start_date: format(
          parseISO(membership.start_date),
          "dd 'de' MMMM', às' H:MM'h'",
          { locale: pt },
        ),
        end_date: format(
          parseISO(membership.end_date),
          "dd 'de' MMMM', às' H:MM'h'",
          { locale: pt },
        ),
        price: `R$ ${membership.price}`,
      },
    });
  }
}

export default new NewMembershipMail();
