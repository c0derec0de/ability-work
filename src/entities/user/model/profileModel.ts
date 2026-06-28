import { createStore } from 'effector'
import { mockProfile } from '../../../shared/mock/mockProfile'

export const $profile = createStore(mockProfile)
