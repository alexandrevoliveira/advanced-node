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
    const fbUser = await sut.loadUser({ token: 'EAAFN6IfFATUBABfnwZAwz3dLYP8oZAkQ1m4ykXl1R9WQaXfiUEGMTtmZBEUofucwxHZBFMSvQXyMh0QYXnFbkLEnZBT7dlpWm3GQJOpzrBbovi5ZAEdviA0aiKBeH7efuFZCG9moRJAN28ieQQtTMjTPE9ZBeEhiAL5Bg8dTgdLml7ZAKMqDKVsdaMOJZCbodrRYFzpacZCjG8XFgZDZD' })

    expect(fbUser).toEqual({
      facebookId: '103885812449051',
      name: 'Alexandre Dev',
      email: 'alexandre_divckum_dev@tfbnw.net'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
