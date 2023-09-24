import validator from 'validator';
import { badRequest } from './httpHelper.js';

export const checkIfIdIsValid = (id) => validator.isUUID(id);

export const invalidIdResponse = () =>
    badRequest({ message: 'The provider id is not valid' });
