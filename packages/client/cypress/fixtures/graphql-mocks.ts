import { UserRole, TaskStatus } from '@buddy-app/schema';

const commonMocks = {
  Buddy: () => ({
    id: '1',
    name: 'Test Buddy',
    position: 'devops',
    startDate: '2019-11-10T13:42:25.172Z',
    email: 'test@test.com',
    phoneNumber: '+48333333333',
    photo: null,
    notes: 'buddy notes',
  }),
  Newbie: () => ({
    id: '1',
    name: 'Test Newbie',
    position: 'dev',
    startDate: '2019-10-15T13:42:25.172Z',
    email: 'test@test.com',
    phoneNumber: '+48345345345',
    photo: null,
    notes: 'newbie notes',
  }),
  NewbieTask: () => ({
    status: TaskStatus.Completed,
  }),
  BuddyTask: () => ({
    status: TaskStatus.Uncompleted,
  }),
  AuthPayload: () => ({
    token: 'token-secret',
    role: UserRole.Buddy,
  }),
};

export default commonMocks;
