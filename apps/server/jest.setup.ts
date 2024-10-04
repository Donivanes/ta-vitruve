import { PrismaClient } from '@vitruve/database';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: prismaMock,
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export { prismaMock };