import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from 'src/modules/link/entities/link.entity';
import { RedirectService } from 'src/modules/redirect/redirect.service';
import { TrimliConfigService } from 'src/modules/trimli-config/trimli-config.service';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

export const mockLink = {
  id: 'cb33c879-d9bf-492e-8bac-adf6bd2f01ba',
  sourceURl: 'https://example.com',
  shortCode: 'a1b2C3',
  clickCount: 0,
  redirectUrl: 'http://localhost:3000/a1b2C3',
  userId: '',
  user: {} as User,
  deletedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockConfigVariables = {
  SERVER_URL: `http://localhost:${PORT}`,
};

describe('RedirectService', () => {
  let service: RedirectService;
  let linkRepository: Repository<Link>;
  let configService: TrimliConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedirectService,
        {
          provide: TrimliConfigService,
          useValue: {
            get: jest
              .fn()
              .mockImplementation((key: string) => mockConfigVariables[key]),
          },
        },
        {
          provide: getRepositoryToken(Link),
          useValue: {
            findOne: jest.fn().mockReturnValue(mockLink),
            save: jest.fn().mockImplementation((link: Link) => ({
              ...link,
            })),
          },
        },
      ],
    }).compile();

    service = module.get<RedirectService>(RedirectService);
    linkRepository = module.get<Repository<Link>>(getRepositoryToken(Link));
    configService = module.get<TrimliConfigService>(TrimliConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should build redirect url using SERVER_URL', async () => {
    const spyConfigService = jest.spyOn(configService, 'get');
    const result = service.buildRedirectUrl(mockLink);

    expect(result).toMatch(new RegExp(`^${mockConfigVariables.SERVER_URL}`));

    expect(spyConfigService).toHaveBeenCalledTimes(1);

    expect(spyConfigService).toHaveBeenCalledWith('SERVER_URL');
  });
});
