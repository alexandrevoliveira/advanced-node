import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAFN6IfFATUBAPFVkUShZAVOZA3baXLRfcbiJ6jev7o8YuTIZAQH4B70WbLNMrZA6ZCy5aoSmLpttZAgEGeH5mEZAEUPLGhp78cWvwMsOZAL3wTdWwGe6OTF9ZCQWo7xkQsZBNacZCmk9at6VF2h2hWLVTn9WII6XlZBE6q4Ugta2hHrpfajmVrispUZCJNV4nu2LiqeqqUAAJgaITwZDZD' })

    expect(fbUser).toEqual({
      facebookId: '103885812449051',
      name: 'Alexandre Teste',
      email: 'alexandre_nwqpczg_teste@tfbnw.net'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
