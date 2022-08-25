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
    const fbUser = await sut.loadUser({ token: 'EAAFN6IfFATUBAKvoscCtgaQ8FxHyDvT4P67cjZBQoMpkdwFwiP8ZCXwEhnf1AsNVZAPIN2gkDfvPCEsA8s8mVcUDLt12K3glUPebUVh70kLw1OwJGLHiZAhuH0jhHei48ikll5NUL8CZCbPTGfb57pA6GIXzXb5bIr0PTVUBtoafp10dcXTG7wwLQrZBFjyYgPZAtJod60MXQZDZD' })

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
