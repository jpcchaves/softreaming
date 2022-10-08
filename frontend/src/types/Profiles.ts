export interface Profiles {
  id?: string;
  profileName: string;
  profileUrlImage: string;
}

export interface UserProfiles extends Array<Profiles> {}
