export type Username = string

export type User = {
	_id: string;
	username: string;
	password: string;
	profilePicId: string;
	lastConnected: Date;
}
