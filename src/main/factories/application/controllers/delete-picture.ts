import { DeletePictureController } from '@/application/controllers'
import { makeChangeProfilePicture } from '@/main/factories/domain/usecases'

export const makeDeletePictureController = (): DeletePictureController => {
  return new DeletePictureController(makeChangeProfilePicture())
}
