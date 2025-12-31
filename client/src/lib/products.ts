export interface Product {
  id: string;
  name: string;
  category: 'outdoor' | 'indoor';
  description: string;
  price_label: string;
  features: string[];
  specs: {
    pixel_pitch: string;
    brightness: string;
    size: string;
    weight: string;
    waterproof: string;
    power: string;
  };
  image: string; // サムネイル用（カタログのメインページ画像を使用）
  catalogImages: string[]; // カタログ詳細ページ画像（複数枚）
  is_new?: boolean;
  is_popular?: boolean;
}

export const products: Product[] = [
  {
    id: 'kslim',
    name: 'KSLIM',
    category: 'outdoor',
    description: '超スリムフレームの屋外自立型LED看板。精巧な仕上げと美しい外観で、店舗の顔として最適です。',
    price_label: '30万円台〜',
    features: [
      '防水IP65',
      'バッテリー搭載24時間稼働',
      '高輝度視認性が高い',
      'スピーカー搭載',
      'スマホからアプリ配信'
    ],
    specs: {
      pixel_pitch: '2.5mm',
      brightness: '≥24500 cd/㎡',
      size: '1208.1*526.0*400MM',
      weight: '30KG',
      waterproof: 'IP65',
      power: '240w/㎡ (平均)'
    },
    image: '/images/catalog/001.webp',
    catalogImages: ['/images/catalog/001.webp', '/images/catalog/002.webp', '/images/catalog/003.webp'],
    is_popular: true
  },
  {
    id: 'kposter',
    name: 'KPOSTER',
    category: 'outdoor',
    description: '従来の看板を完全に代替する屋外自立型LED看板。高輝度で昼間でも鮮やかに表示されます。',
    price_label: 'お問い合わせ',
    features: [
      '防水IP65',
      'バッテリー搭載24時間稼働',
      '高輝度視認性が高い',
      'スピーカー搭載',
      'スマホからアプリ配信'
    ],
    specs: {
      pixel_pitch: '2.5mm / 1.9mm / 1.5mm',
      brightness: '≥24500 cd/㎡',
      size: '1300*504*438MM',
      weight: '55KG',
      waterproof: 'IP65',
      power: '240w/㎡ (平均)'
    },
    image: '/images/catalog/004.webp',
    catalogImages: ['/images/catalog/004.webp', '/images/catalog/005.webp', '/images/catalog/006.webp']
  },
  {
    id: 'kdouble',
    name: 'KDOUBLE',
    category: 'outdoor',
    description: '両面表示が可能な屋外自立型LCD看板。通行人の視線を両方向からキャッチします。',
    price_label: 'お問い合わせ',
    features: [
      '両面表示',
      '防水IP65',
      'バッテリー搭載24時間稼働',
      '高輝度視認性が高い',
      'スピーカー搭載'
    ],
    specs: {
      pixel_pitch: 'LCD (1920x1080)',
      brightness: '≥22000 cd/㎡',
      size: '1438*730*550MM',
      weight: '85KG',
      waterproof: 'IP65',
      power: '240w/㎡ (平均)'
    },
    image: '/images/catalog/007.webp',
    catalogImages: ['/images/catalog/007.webp', '/images/catalog/008.webp', '/images/catalog/009.webp']
  },
  {
    id: 'kfold',
    name: 'KFOLD',
    category: 'indoor',
    description: '展開・折り畳みが可能な革新的な屋内LED看板。一画面二表示など多彩な使い方が可能です。',
    price_label: 'お問い合わせ',
    features: [
      '展開・折り畳み可能',
      '一画面二表示',
      'GOB処理防水',
      '100000時間長寿命',
      'スピーカー搭載'
    ],
    specs: {
      pixel_pitch: '2.5mm / 1.9mm / 1.5mm / 1.2mm',
      brightness: '≥2800 cd/㎡',
      size: '2050*646*500MM (展開時)',
      weight: '43KG',
      waterproof: 'IP43',
      power: '240w/㎡ (平均)'
    },
    image: '/images/catalog/010.webp',
    catalogImages: ['/images/catalog/010.webp', '/images/catalog/011.webp'],
    is_new: true
  },
  {
    id: 'kstand',
    name: 'KSTAND',
    category: 'indoor',
    description: 'コンパクトで収納しやすい屋内自立型LED看板。バッテリー内蔵で持ち運びも簡単です。',
    price_label: 'お問い合わせ',
    features: [
      'コンパクト・軽量',
      '折り畳み式デザイン',
      'GOB処理防水',
      '100000時間長寿命',
      'スピーカー搭載'
    ],
    specs: {
      pixel_pitch: '2.5mm / 1.9mm / 1.5mm / 1.2mm',
      brightness: '≥2800 cd/㎡',
      size: '1160*640*430MM (展開時)',
      weight: '20KG',
      waterproof: 'IP43',
      power: '240w/㎡ (平均)'
    },
    image: '/images/catalog/012.webp',
    catalogImages: ['/images/catalog/012.webp', '/images/catalog/013.webp']
  },
  {
    id: 'ktriple',
    name: 'KTRIPLE',
    category: 'indoor',
    description: '業界で大好評の3面展開可能なLED看板。圧倒的な存在感で空間を演出します。',
    price_label: 'お問い合わせ',
    features: [
      '3面展開・折り畳み',
      '一画面二表示',
      'GOB処理防水',
      '100000時間長寿命',
      'スピーカー搭載'
    ],
    specs: {
      pixel_pitch: '2.5mm / 1.9mm / 1.5mm / 1.2mm',
      brightness: '≥24500 cd/㎡',
      size: '1280*1920*55MM (片面表示)',
      weight: '78KG',
      waterproof: 'IP65',
      power: '240w/㎡ (平均)'
    },
    image: '/images/catalog/014.webp',
    catalogImages: ['/images/catalog/014.webp', '/images/catalog/015.webp', '/images/catalog/016.webp'],
    is_popular: true
  }
];
