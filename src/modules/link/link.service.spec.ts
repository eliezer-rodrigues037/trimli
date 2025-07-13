import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MAX_CODE_GENERATION__ATTEMPTS } from 'src/modules/link/constants/max-code-generation-attempts';
import { Link } from 'src/modules/link/entities/link.entity';
import { RedirectService } from 'src/modules/redirect/redirect.service';
import { Repository } from 'typeorm';
import { LinkService } from './link.service';

export const mockLink = {
  id: 'cb33c879-d9bf-492e-8bac-adf6bd2f01ba',
  sourceURl: 'https://example.com',
  shortCode: 'a1b2C3',
  clickCount: 0,
  redirectUrl: 'http://localhost:3000/a1b2C3',
  userId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('LinkService', () => {
  let service: LinkService;
  let linkRepository: Repository<Link>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: RedirectService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Link),
          useValue: {
            findOne: jest.fn().mockReturnValue(mockLink),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);

    linkRepository = module.get<Repository<Link>>(getRepositoryToken(Link));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should respect max code generation attempts', async () => {
    const spyLinkRepository = jest.spyOn(linkRepository, 'findOne');

    await expect(
      service.create({
        createLinkDto: { sourceURl: 'https://example.com' },
      }),
    ).rejects.toThrow('Failed to generate a unique code');

    expect(spyLinkRepository).toHaveBeenCalledTimes(
      MAX_CODE_GENERATION__ATTEMPTS,
    );
  });
});
