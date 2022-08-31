import { IUser } from '../../interfaces/IUser';
import connection from '../connection';
import UserSchema  from './user';
export const userModel = connection.database.model<IUser & Document>(
	'User',
	UserSchema
);
