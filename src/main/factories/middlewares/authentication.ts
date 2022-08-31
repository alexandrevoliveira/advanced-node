import { AuthenticationMiddleware } from '@/application/middlewares'
import { setupAuthorize } from '@/domain/usecases'
import { makeJwtTokenHandler } from '@/main/factories/crypto'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const authorize = setupAuthorize(makeJwtTokenHandler())
  return new AuthenticationMiddleware(authorize)
}
