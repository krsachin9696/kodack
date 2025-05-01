import prisma from '../../config/prismaClient.js';

const findUserByEmailOrUsername = async (username, email) => {
  return await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
};

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const updateUserByEmail = async (email, data) => {
  return await prisma.user.update({
    where: { email },
    data,
  });
};

export {
  findUserByEmailOrUsername,
  createUser,
  findUserByEmail,
  updateUserByEmail,
};
