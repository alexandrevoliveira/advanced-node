import { FacebookAuthentication, setupFacebookAuthentication } from '@/domain/usecases'
import { makeFacebookApi, makeJwtTokenHandler } from '@/main/factories/infra/gateways'
import { makePgUserAccountRepo } from '@/main/factories/infra/repos/postgres'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler()
  )
}
