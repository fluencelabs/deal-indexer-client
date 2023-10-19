import { ethers } from "ethers";

type ProviderShort = {
  id: string;
  name: string;
  createdAt: number;
  totalComputeUnits: number;
  freeComputeUnits: number;
  isApproved: boolean;
  offers: Array<OfferShort>;
};

type OfferShort = {
  name: string;
  createdAt: number;
  totalComputeUnits: number;
  freeComputeUnits: number;
  paymentToken: PaymentToken;
  effectors: Array<Effector>;
};

type PaymentToken = {
  address: string;
  symbol: string;
};

type Provider = {
  id: string;
  name: string;
  createdAt: number;
  totalComputeUnits: number;
  freeComputeUnits: number;
  isApproved: boolean;
  peerCount: number;
  effectorCount: number;
  revenue: Array<Revenue>;
};

type Revenue = {
  total: number;
  paymentToken: PaymentToken;
  byDays: RevenueByDay[];
};

type RevenueByDay = {
  time: number;
  value: number;
};

type Offer = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  maxCollateralPerWorker: number;
  minPricePerWorkerEpoch: number;
  paymentToken: PaymentToken;
  totalComputeUnits: number;
  freeComputeUnits: number;
  effectors: Array<Effector>;
  peers: Array<Peer>;
};

type Effector = {
  cid: string;
  description: string;
};

type Peer = {
  id: string;
  offerId: string;
  transactionHash: string;
  workerSlots: number;
  computeUnits: Array<ComputeUnit>;
};

type ComputeUnit = {
  id: string;
  collateral: number;
  workerId: string | undefined;
};

type ShortDeal = {
  id: string;
  offerId: string;
  client: string;
  paymentToken: PaymentToken;
  createdAt: number;
  minWorkers: number;
  targetWorkers: number;
  registeredWorkers: number;
  status: DealStatus;
};

type DealShort = {
  id: string;
  createdAt: number;
  owner: string;
  minWorkers: number;
  targetWorkers: number;
  matchedWorkers: number;
  registeredWorkers: number;
  balance: number;
  status: DealStatus;
};

type Deal = {
  id: string;
  appCID: string;
  owner: string;
  createdAt: number;
  minWorkers: number;
  targetWorkers: number;
  matchedWorkers: number;
  registeredWorkers: number;
  paymentToken: PaymentToken;
  pricePerWorkerEpoch: number;
  collateral: number;
  computeUnits: Array<ComputeUnit>;
  whitelist: Array<string>;
  blacklist: Array<string>;
  effectors: Array<Effector>;
  totalPaidAmount: number;
  status: DealStatus;
};

enum DealStatus {
  Inactive,
  Active,
  Ended,
}

enum ProviderShortOrder {
  TotalComputeUnits,
  CreatedAt,
}

enum OfferShortOrder {
  CreatedAt,
  PricePerWorkerEpoch,
  MaxCollateralPerWorker,
  UpdatedAt,
}

enum ProviderShortSearch {
  None,
  Id,
  Name,
  EffectorIds,
}

enum ProviderDetailsStatusFilter {
  All,
  Active,
  Inactive,
}

export class DealIndexerClient {
  constructor(chainRPCUrl: string, indexerUrl: string) {}

  async getProviders(
    search: ProviderShortSearch,
    searchValue: string | undefined,
    order: ProviderShortOrder,
    skip: number,
    take: number
  ): Promise<Array<ProviderShort>> {
    return new Array(10).map((x, i) => ({
      id: ethers.hexlify(ethers.randomBytes(20)),
      name: `Test provider ${i}`,
      createdAt: new Date().getTime() / 1000,
      totalComputeUnits: 125,
      freeComputeUnits: 100,
      isApproved: true,
      offers: new Array(5).map((x, i) => ({
        name: `Test offer ${i}`,
        createdAt: new Date().getTime() / 1000,
        totalComputeUnits: 125,
        freeComputeUnits: 100,
        paymentToken: {
          address: ethers.hexlify(ethers.randomBytes(20)),
          symbol: "USDT",
        },
        effectors: [
          {
            cid: "rendomCID",
            description: "Test effector #1",
          },
          {
            cid: "rendomCID",
            description: "Test effector #2",
          },
        ],
        peers: new Array(5).map((x, i) => ({
          id: ethers.hexlify(ethers.randomBytes(32)),
          offerId: ethers.hexlify(ethers.randomBytes(32)),
          transactionHash: ethers.hexlify(ethers.randomBytes(32)),
          workerSlots: 10,
          computeUnits: new Array(5).map((x, i) => ({
            id: ethers.hexlify(ethers.randomBytes(32)),
            collateral: 10,
            dealId: ethers.hexlify(ethers.randomBytes(20)),
            workerId: ethers.hexlify(ethers.randomBytes(32)),
          })),
        })),
      })),
    }));
  }

  async getProvider(providerId: string): Promise<Provider> {
    return {
      id: ethers.hexlify(ethers.randomBytes(20)),
      name: `Test provider`,
      createdAt: new Date().getTime() / 1000,
      totalComputeUnits: 125,
      freeComputeUnits: 100,
      isApproved: true,
      peerCount: 10,
      effectorCount: 5,
      revenue: new Array(5).map((x, i) => ({
        total: 1000,
        paymentToken: {
          address: ethers.hexlify(ethers.randomBytes(20)),
          symbol: "USDT",
        },
        byDays: new Array(10).map((x, i) => ({
          time: new Date().getTime() / 1000 - i * 24 * 60 * 60,
          value: 100 * i + 1,
        })),
      })),
    };
  }

  async getOffersByProvider(
    providerId: string,
    filter: ProviderDetailsStatusFilter
  ): Promise<Array<OfferShort>> {
    return new Array(5).map((x, i) => ({
      id: ethers.hexlify(ethers.randomBytes(32)),
      name: `Test offer ${i}`,
      createdAt: new Date().getTime() / 1000 - i * 24 * 60 * 60,
      updatedAt: new Date().getTime() / 1000 - i * 24 * 60 * 60,
      maxCollateralPerWorker: 10 * i,
      minPricePerWorkerEpoch: 1.2 * i,
      paymentToken: {
        address: ethers.hexlify(ethers.randomBytes(20)),
        symbol: "USDT",
      },
      totalComputeUnits: 12 * i,
      freeComputeUnits: 1 * i,
      effectors: [
        {
          cid: "rendomCID",
          description: "Test effector #1",
        },
        {
          cid: "rendomCID",
          description: "Test effector #2",
        },
      ],
    }));
  }

  async getDealsByProvider(
    providerId: string,
    filter: ProviderDetailsStatusFilter
  ): Promise<Array<ShortDeal>> {
    return new Array(5).map((x, i) => ({
      id: ethers.hexlify(ethers.randomBytes(20)),
      offerId: ethers.hexlify(ethers.randomBytes(32)),
      client: ethers.hexlify(ethers.randomBytes(20)),
      paymentToken: {
        address: ethers.hexlify(ethers.randomBytes(20)),
        symbol: "USDT",
      },
      createdAt: new Date().getTime() / 1000 - i * 24 * 60 * 60,
      minWorkers: 1 * i,
      targetWorkers: 3 * i,
      registeredWorkers: 2 * i,
      status: DealStatus.Active,
    }));
  }

  async getOffers(
    effectorIds: Array<string> | undefined = undefined,
    paymentToken: string | undefined = undefined,
    minPricePerWorkerEpoch: number | undefined = undefined,
    maxPricePerWorkerEpoch: number | undefined = undefined,
    minCollateralPerWorker: number | undefined = undefined,
    maxCollateralPerWorker: number | undefined = undefined,
    onlyApproved: boolean = false,
    skip: number,
    take: number,
    order: OfferShortOrder
  ): Promise<Array<OfferShort>> {
    return new Array(5).map((x, i) => ({
      id: ethers.hexlify(ethers.randomBytes(32)),
      name: `Test offer ${i}`,
      createdAt: new Date().getTime() / 1000 - i * 24 * 60 * 60,
      updatedAt: new Date().getTime() / 1000 - i * 24 * 60 * 60,
      maxCollateralPerWorker: 10 * i,
      minPricePerWorkerEpoch: 1.2 * i,
      paymentToken: {
        address: ethers.hexlify(ethers.randomBytes(20)),
        symbol: "USDT",
      },
      totalComputeUnits: 12 * i,
      freeComputeUnits: 1 * i,
      effectors: [
        {
          cid: "rendomCID",
          description: "Test effector #1",
        },
        {
          cid: "rendomCID",
          description: "Test effector #2",
        },
      ],
    }));
  }

  async getOffer(offerId: string): Promise<Offer> {
    return {
      id: ethers.hexlify(ethers.randomBytes(32)),
      name: `Test offer`,
      createdAt: new Date().getTime() / 1000,
      updatedAt: new Date().getTime() / 1000,
      maxCollateralPerWorker: 10,
      minPricePerWorkerEpoch: 1.2,
      paymentToken: {
        address: ethers.hexlify(ethers.randomBytes(20)),
        symbol: "USDT",
      },
      totalComputeUnits: 12,
      freeComputeUnits: 1,
      effectors: [
        {
          cid: "rendomCID",
          description: "Test effector #1",
        },
        {
          cid: "rendomCID",
          description: "Test effector #2",
        },
      ],
      peers: new Array(5).map((x, i) => ({
        id: ethers.hexlify(ethers.randomBytes(32)),
        offerId: ethers.hexlify(ethers.randomBytes(32)),
        transactionHash: ethers.hexlify(ethers.randomBytes(32)),
        workerSlots: 10,
        computeUnits: new Array(5).map((x, i) => ({
          id: ethers.hexlify(ethers.randomBytes(32)),
          collateral: 10,
          dealId: ethers.hexlify(ethers.randomBytes(20)),
          workerId: ethers.hexlify(ethers.randomBytes(32)),
        })),
      })),
    };
  }

  async getDeals(
    effectorIds: Array<string> | undefined = undefined,
    paymentToken: string | undefined = undefined,
    minPricePerWorkerEpoch: number | undefined = undefined,
    maxPricePerWorkerEpoch: number | undefined = undefined,
    minCollateralPerWorker: number | undefined = undefined,
    maxCollateralPerWorker: number | undefined = undefined,
    createdAtFrom: number | undefined = undefined,
    createdAtTo: number | undefined = undefined,
    onlyApproved: boolean = false,
    skip: number,
    take: number,
    order: OfferShortOrder
  ): Promise<Array<DealShort>> {
    return new Array(5).map((x, i) => ({
      id: ethers.hexlify(ethers.randomBytes(20)),
      createdAt: new Date().getTime() / 1000 - i * 24 * 60 * 60,
      owner: ethers.hexlify(ethers.randomBytes(20)),
      minWorkers: 1 * i,
      targetWorkers: 3 * i,
      matchedWorkers: 2 * i,
      registeredWorkers: 2 * i,
      balance: 100 * i,
      status: DealStatus.Active,
    }));
  }

  async getDeal(dealId: string): Promise<Deal> {
    return {
      id: ethers.hexlify(ethers.randomBytes(20)),
      appCID: "randomCID",
      owner: ethers.hexlify(ethers.randomBytes(20)),
      createdAt: new Date().getTime() / 1000,
      minWorkers: 1,
      targetWorkers: 3,
      matchedWorkers: 2,
      registeredWorkers: 2,
      paymentToken: {
        address: ethers.hexlify(ethers.randomBytes(20)),
        symbol: "USDT",
      },
      pricePerWorkerEpoch: 1.2,
      collateral: 10,
      computeUnits: new Array(5).map((x, i) => ({
        id: ethers.hexlify(ethers.randomBytes(32)),
        collateral: 10,
        workerId: ethers.hexlify(ethers.randomBytes(32)),
      })),
      whitelist: new Array(5).map((x, i) =>
        ethers.hexlify(ethers.randomBytes(20))
      ),
      blacklist: new Array(5).map((x, i) =>
        ethers.hexlify(ethers.randomBytes(20))
      ),
      effectors: new Array(5).map((x, i) => ({
        cid: "rendomCID",
        description: `Test effector #{i}`,
      })),
      totalPaidAmount: 100,
      status: DealStatus.Active,
    };
  }
}
