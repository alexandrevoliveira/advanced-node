import { PgUser } from '@/infra/repos/postgres/entities'
import { PgUserAccountRepository } from '@/infra/repos/postgres'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'

import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserAccountRepository()
  })

  describe('load', () => {
    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any_email' })

      const account = await sut.load({ email: 'any_email' })

      expect(account).toEqual({ id: '1' })
    })

    it('should return undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'any_email' })

      expect(account).toBeUndefined()
    })
  })

  describe('saveWithFacebook', () => {
    it('should create an account if id is undefined', async () => {
      const { id } = await sut.saveWithFacebook({
        name: 'any_name',
        email: 'any_email',
        facebookId: 'any_fb_id'
      })
      const pgUser = await pgUserRepo.findOne({ email: 'any_email' })

      expect(pgUser?.id).toBe(1)
      expect(id).toBe('1')
    })

    it('should update account if id is defined', async () => {
      await pgUserRepo.save({
        name: 'any_name',
        email: 'any_email',
        facebookId: 'any_fb_id'
      })

      const { id } = await sut.saveWithFacebook({
        id: '1',
        name: 'new_name',
        email: 'new_email',
        facebookId: 'new_fb_id'
      })
      const pgUser = await pgUserRepo.findOne({ id: 1 })

      expect(pgUser).toMatchObject({
        id: 1,
        name: 'new_name',
        email: 'any_email',
        facebookId: 'new_fb_id'
      })
      expect(id).toBe('1')
    })
  })
})
