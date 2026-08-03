import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface DadosConfirmacao {
  emailDestino: string;
  nomeUsuario: string;
  nomeSala: string;
  dia: string;
  turno: string;
}

export async function enviarEmailConfirmacao(dados: DadosConfirmacao): Promise<void> {
  const dataFormatada = new Date(dados.dia).toLocaleDateString("pt-BR");

  await transporter.sendMail({
    from: `"Hubin" <${process.env.EMAIL_USER}>`,
    to: dados.emailDestino,
    subject: "Reserva confirmada — Hubin",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #1F2421;">Reserva confirmada!</h2>
        <p>Olá, ${dados.nomeUsuario}!</p>
        <p>Sua reserva foi confirmada com sucesso:</p>
        <ul>
          <li><strong>Sala:</strong> ${dados.nomeSala}</li>
          <li><strong>Dia:</strong> ${dataFormatada}</li>
          <li><strong>Turno:</strong> ${dados.turno}</li>
        </ul>
        <p style="color: #5B6B63; font-size: 14px;">Hubin — Hub + In</p>
      </div>
    `,
  });
}