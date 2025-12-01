/**
 * Seed principal do Prisma para popular o banco
 * com dados iniciais de usuários e eventos.
 */

const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

/**
 * Cria o usuário administrador caso não exista.
 * @async
 */
async function seedAdminUser() {
  const adminEmail = "admin@ifrs.com";

  const existingAdmin = await prisma.usuario.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("ℹ️ Admin já existe.");
    return;
  }

  const hashed = await bcrypt.hash("123", 10);

  await prisma.usuario.create({
    data: {
      nome: "Administrador",
      telefone: "549999999999",
      email: adminEmail,
      senha: hashed,
      role: "admin",
    },
  });

  console.log("✅ Admin criado com sucesso!");
}

/**
 * Cria eventos padrões iniciais.
 * @async
 */
async function seedEventosPadrao() {
  const eventos = [
    { titulo: "Workshop de Tecnologia", data_evento: "2025-12-25T00:00:00.000Z" },
    { titulo: "Palestra de Inovação", data_evento: "2025-12-25T00:00:00.000Z" },
    { titulo: "Semana Acadêmica", data_evento: "2025-12-23T00:00:00.000Z" },
  ];

  for (const evento of eventos) {
    const exists = await prisma.evento.findFirst({
      where: { titulo: evento.titulo },
    });

    if (!exists) {
      await prisma.evento.create({ data: evento });
      console.log(`Evento criado: ${evento.titulo}`);
    } else {
      console.log(`Evento já existe: ${evento.titulo}`);
    }
  }
}

async function main() {
  console.log("Iniciando seeds...");

  await seedAdminUser();
  await seedEventosPadrao();

  console.log("Seeds finalizadas!");
}

main()
  .catch((e) => {
    console.error("Erro ao rodar seeds:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
