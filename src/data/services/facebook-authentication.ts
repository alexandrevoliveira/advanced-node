import { LoadFacebookUserApi } from '@/data/contracts/api'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      await this.userAccountRepo.load({ email: fbData.email })
      await this.userAccountRepo.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
