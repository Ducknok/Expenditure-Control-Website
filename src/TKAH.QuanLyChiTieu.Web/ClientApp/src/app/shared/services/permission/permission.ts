export interface Permission {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  tenantId: number;
  name: string;
  isGranted: true;
  roleId: number;
}
