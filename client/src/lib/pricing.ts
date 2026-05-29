// 商品ごとの価格情報
export interface PriceOption {
  model: string;
  width: string;
  height: string;
  maxPower: string;
  avgPower: string;
  weight: string;
  resolutionW: string;
  resolutionH: string;
  priceUSD: number;
  priceJPY: number;
  taxLabel?: string;
  notes?: string;
}

export interface ProductPricing {
  name: string;
  minPrice: number;
  options: PriceOption[];
}

export const productPricing: Record<string, ProductPricing> = {
  kslim: {
    name: "K-SLIM（屋外）",
    minPrice: 598000,
    options: [
      {
        model: "P2.5",
        width: "480mm",
        height: "960mm",
        maxPower: "300W",
        avgPower: "200〜300W",
        weight: "35.4KG",
        resolutionW: "192P",
        resolutionH: "384P",
        priceUSD: 1380,
        priceJPY: 598000,
        taxLabel: "税込・全国送料込み",
        notes: "デビューキャンペーン価格。定価698,000円、限定100台。映像事前インストール対応。バッテリータイプは+98,000円。"
      }
    ]
  },
  kposter: {
    name: "K-POSTER（屋外セミ屋外）",
    minPrice: 0,
    options: []
  },
  kdouble: {
    name: "K-DOUBLE（屋外両面）",
    minPrice: 0,
    options: []
  },
  kfold: {
    name: "K-FOLD（室内展開折畳）",
    minPrice: 535652,
    options: [
      {
        model: "P2.5",
        width: "640mm",
        height: "1920mm",
        maxPower: "680W",
        avgPower: "230W",
        weight: "44KG",
        resolutionW: "256P",
        resolutionH: "768P",
        priceUSD: 1859.9,
        priceJPY: 535652,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P1.86",
        width: "640mm",
        height: "1920mm",
        maxPower: "680W",
        avgPower: "230W",
        weight: "44KG",
        resolutionW: "344P",
        resolutionH: "1032P",
        priceUSD: 2391.3,
        priceJPY: 688696,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P1.53",
        width: "640mm",
        height: "1920mm",
        maxPower: "680W",
        avgPower: "230W",
        weight: "44KG",
        resolutionW: "416P",
        resolutionH: "1248P",
        priceUSD: 3188.41,
        priceJPY: 918261,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P1.25",
        width: "640mm",
        height: "1920mm",
        maxPower: "800W",
        avgPower: "230W",
        weight: "44KG",
        resolutionW: "512P",
        resolutionH: "1536P",
        priceUSD: 4251.21,
        priceJPY: 1224348,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      }
    ]
  },
  kstand_indoor: {
    name: "K-STAND（室内用）",
    minPrice: 357016,
    options: [
      {
        model: "P2.5",
        width: "640mm",
        height: "960mm",
        maxPower: "400W",
        avgPower: "120W",
        weight: "20KG",
        resolutionW: "256P",
        resolutionH: "384P",
        priceUSD: 1115.68,
        priceJPY: 357016,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P1.86",
        width: "640mm",
        height: "960mm",
        maxPower: "400W",
        avgPower: "120W",
        weight: "20KG",
        resolutionW: "344P",
        resolutionH: "516P",
        priceUSD: 1381.38,
        priceJPY: 397837,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P1.53",
        width: "640mm",
        height: "960mm",
        maxPower: "400W",
        avgPower: "120W",
        weight: "20KG",
        resolutionW: "416P",
        resolutionH: "624P",
        priceUSD: 1779.93,
        priceJPY: 512619,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P1.25",
        width: "640mm",
        height: "960mm",
        maxPower: "400W",
        avgPower: "120W",
        weight: "20KG",
        resolutionW: "512P",
        resolutionH: "768P",
        priceUSD: 2444.18,
        priceJPY: 703923,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      }
    ]
  },
  kstand_semi_outdoor: {
    name: "K-STAND（セミ屋外用）",
    minPrice: 298358,
    options: [
      {
        model: "P3.0",
        width: "640mm",
        height: "960mm",
        maxPower: "600W",
        avgPower: "180W",
        weight: "22KG",
        resolutionW: "208P",
        resolutionH: "312P",
        priceUSD: 1035.97,
        priceJPY: 298358,
        notes: "輝度5000cd屋外/防水しない、GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P2.5",
        width: "640mm",
        height: "960mm",
        maxPower: "600W",
        avgPower: "180W",
        weight: "22KG",
        resolutionW: "256P",
        resolutionH: "384P",
        priceUSD: 1222,
        priceJPY: 351923,
        notes: "輝度5000cd屋外/防水しない、GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P2",
        width: "640mm",
        height: "960mm",
        maxPower: "600W",
        avgPower: "180W",
        weight: "22KG",
        resolutionW: "320P",
        resolutionH: "480P",
        priceUSD: 2603.6,
        priceJPY: 749836,
        notes: "輝度5000cd屋外/防水しない、GOB、木箱、フライトケース・バッテリーはご相談ください"
      }
    ]
  },
  ktriple: {
    name: "K-TRIPLE（室内三折畳両面）",
    minPrice: 1010010,
    options: [
      {
        model: "P2.5",
        width: "1280mm",
        height: "1920mm",
        maxPower: "900W",
        avgPower: "300W",
        weight: "78KG",
        resolutionW: "512P",
        resolutionH: "768P",
        priceUSD: 3506.98,
        priceJPY: 1010010,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P1.86",
        width: "1280mm",
        height: "1920mm",
        maxPower: "1100W",
        avgPower: "330W",
        weight: "78KG",
        resolutionW: "688P",
        resolutionH: "1032P",
        priceUSD: 4569.78,
        priceJPY: 1316097,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P1.53",
        width: "1280mm",
        height: "1920mm",
        maxPower: "1300W",
        avgPower: "433W",
        weight: "78KG",
        resolutionW: "832P",
        resolutionH: "1248P",
        priceUSD: 6163.99,
        priceJPY: 1775228,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      },
      {
        model: "P1.25",
        width: "1280mm",
        height: "1920mm",
        maxPower: "1500W",
        avgPower: "500W",
        weight: "80KG",
        resolutionW: "1024P",
        resolutionH: "1536P",
        priceUSD: 8289.59,
        priceJPY: 2387402,
        notes: "GOB、木箱、フライトケース・バッテリーはご相談ください"
      }
    ]
  }
};
