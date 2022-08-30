import { FacebookAuthentication, setupFacebookAuthentication } from '@/domain/usecases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makeJwtTokenHandler } from '@/main/factories/crypto'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler()
  )
}
