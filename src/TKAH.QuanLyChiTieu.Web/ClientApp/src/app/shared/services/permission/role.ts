import { Permission } from './permission';

export interface Role {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  isDeleted: true;
  deleterUserId: number;
  deletionTime: Date;
  tenantId: number;
  name: string;
  displayName: string;
  isStatic: true;
  isDefault: true;
  permissions: Permission[];
}
