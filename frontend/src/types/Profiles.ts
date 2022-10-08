export interface Profiles {
  id?: number;
  profileName: string;
  profileUrlImage: string;
}

export interface UserProfiles extends Array<Profiles> {}
