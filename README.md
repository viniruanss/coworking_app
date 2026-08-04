Hubin

Sistema de gestão e reserva de salas para coworking. Projeto fullstack desenvolvido em TypeScript durante bootcamp intensivo, com foco em arquitetura em camadas, segurança e prevenção de condição de corrida em reservas.

🔗 Aplicação em produção: https://hubin-dun.vercel.app/ 🔗 API (Swagger): https://coworking-api-7fq6.onrender.com/docs

Observação: o backend está hospedado no plano gratuito do Render, que "dorme" após um período de inatividade. A primeira requisição após inatividade pode levar de 30 a 50 segundos para responder.

Sobre o projeto

O Hubin permite que clientes de um coworking visualizem, reservem e gerenciem o uso de salas e cabines individuais, enquanto administradores gerenciam o catálogo de espaços disponíveis. O sistema foi modelado a partir de um problema real: como evitar que duas pessoas reservem a mesma sala no mesmo horário, sem travar a experiência do usuário nem exigir infraestrutura complexa.

Diferenciais técnicos
Soft lock em reservas: ao escolher uma sala, ela é reservada temporariamente por 10 minutos (status pendente) enquanto o cliente confirma. Se o prazo expirar sem confirmação, a sala é liberada automaticamente — resolvida via consulta condicional no banco (sem necessidade de jobs agendados), inspirada no modelo usado por sistemas de venda de ingressos.
Autenticação e autorização via JWT, com middlewares distintos para "usuário autenticado" e "usuário administrador".
Validação de dados em duas camadas: Zod no backend (fonte da verdade) e validação de formato no frontend (experiência do usuário).
Tratamento de erros centralizado, via middleware global no Express.
Envio de e-mail de confirmação ao concluir uma reserva, desacoplado da resposta da API (fire-and-forget), para não bloquear a experiência do usuário caso o serviço de e-mail esteja indisponível.
Modo escuro com paleta de cores completamente adaptável via variáveis semânticas.
Documentação interativa da API via Swagger, disponível em /docs.
Stack

Backend

Node.js + Express
TypeScript
Prisma ORM + PostgreSQL
JWT (jsonwebtoken) para autenticação
Zod para validação de schemas
bcryptjs para hash de senhas
Swagger (swagger-ui-express) para documentação da API
Nodemailer para envio de e-mails

Frontend

React + Vite
TypeScript
Tailwind CSS v4
React Router DOM
Axios

Infraestrutura

Banco de dados: Neon (PostgreSQL serverless)
Deploy do backend: Render
Deploy do frontend: Vercel
Arquitetura

O backend segue o princípio de responsabilidade única, separado em camadas:

src/
  routes/       → mapeia URL + método HTTP para o controller correspondente
  controllers/  → recebe a requisição, valida entrada, define status HTTP
  services/     → concentra as regras de negócio e o acesso ao banco via Prisma
  middlewares/  → autenticação, autorização e tratamento global de erros
  schemas/      → validação de dados de entrada com Zod
  config/       → configuração do Swagger
Modelo de dados
Usuario — dados de cadastro, endereço (relação), flag de administrador
Endereco — normalizado em tabela própria
Sala — nome, tipo (sala ou cabine), capacidade, preço por turno
Reserva — vincula usuário e sala, com dia, turno, status (pendente / confirmada / cancelada) e expiração do soft lock
Rodando o projeto localmente
Pré-requisitos
Node.js 18+
Uma instância PostgreSQL (local ou serviço como Neon/Supabase)
Backend
bash
cd backend
npm install

Crie um arquivo .env na raiz de backend/ com:

DATABASE_URL="sua-connection-string-postgresql"
JWT_SECRET="uma-string-secreta-aleatoria"
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="sua-senha-de-app-do-gmail"
bash
npx prisma migrate dev
npm run dev

O servidor sobe em http://localhost:3000. Documentação da API em http://localhost:3000/docs.

Frontend
bash
cd frontend
npm install

Crie um arquivo .env na raiz de frontend/ com:

VITE_API_URL="http://localhost:3000"
bash
npm run dev

A aplicação sobe em http://localhost:5173.

Principais rotas da API
Método	Rota	Descrição	Acesso
POST	/auth/login	Autentica e retorna token JWT	Público
POST	/usuarios	Cadastra novo usuário	Público
GET	/salas	Lista todas as salas	Público
POST	/salas	Cria uma sala	Admin
POST	/reservas	Cria reserva pendente (soft lock de 10 min)	Autenticado
PATCH	/reservas/:id	Confirma ou cancela uma reserva	Autenticado (dono)
GET	/reservas/minhas	Lista as reservas do usuário logado	Autenticado
DELETE	/reservas/:id	Remove uma reserva	Autenticado (dono) ou Admin

Documentação completa e interativa disponível via Swagger em /docs.

Autor

Desenvolvido por Vinicius, durante bootcamp intensivo de TypeScript fullstack.
