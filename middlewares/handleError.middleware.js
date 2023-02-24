import prismaClient from '@prisma/client'

const { PrismaClient, Prisma } = prismaClient
const prisma = new PrismaClient()

export const prismaInstance = prisma

export const prismaErrorHandling = (err, errorCode) => {
  if (err instanceof Prisma.PrismaClientValidationError) {
    return {
      error: 'Bad Request',
      code: 400,
      errorMessage: err.message,
    }
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err?.code == 'P2025') {
      return {
        error: 'Not Found',
        code: 404,
        errorMessage: err.message,
      }
    }
    if (err?.code == 'P2003') {
      return {
        error: 'error in field constraints',
        code: 422,
        errorMessage: err.message,
      }
    }

    if (err?.code == 'P2002') {
      return {
        error: 'error in field conflict',
        code: 409,
        errorMessage: err.message,
      }
    }
    return { error: err, code: 401, errorMessage: err.message }
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return { error: 'error', code: 500, errorMessage: err.message }
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    return { error: 'error', code: 500, errorMessage: err.message }
  }

  if (err instanceof Prisma.PrismaClientRustPanicError) {
    return { error: 'error', code: 502, errorMessage: err.message }
  } else {
    return { error: 'internal error', code: 500, errorMessage: err }
  }
}