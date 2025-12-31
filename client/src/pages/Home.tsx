import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { products } from "@/lib/products";
import { productPricing } from "@/lib/pricing";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Download, Mail, X, Zap, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// フォームデータの型定義
interface FormData {
  companyName: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'outdoor' | 'indoor'>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [catalogModalOpen, setCatalogModalOpen] = useState<boolean>(false);
  const [currentCatalogImages, setCurrentCatalogImages] = useState<string[]>([]);
  const [priceModalOpen, setPriceModalOpen] = useState<boolean>(false);

  // お問い合わせフォームの状態
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    product: '',
    message: '',
  });
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // tRPC mutation
  const submitInquiry = trpc.inquiry.submit.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setShowConfirmation(false);
        setShowSuccess(true);
        // フォームをリセット
        setFormData({
          companyName: '',
          name: '',
          email: '',
          phone: '',
          product: '',
          message: '',
        });
        setSelectedProduct('');
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error('送信に失敗しました。時間をおいて再度お試しください。');
      console.error('Inquiry submission error:', error);
    },
  });

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquiry = (productName: string) => {
    setSelectedProduct(productName);
    setFormData(prev => ({ ...prev, product: productName }));
    scrollToSection('contact');
  };

  const openCatalog = (images: string[]) => {
    setCurrentCatalogImages(images);
    setCatalogModalOpen(true);
  };

  // フォーム入力ハンドラー
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'product') {
      setSelectedProduct(value);
    }
  };

  // 確認画面を表示
  const handleShowConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    if (!formData.name.trim()) {
      toast.error('お名前を入力してください');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('メールアドレスを入力してください');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('有効なメールアドレスを入力してください');
      return;
    }

    setShowConfirmation(true);
  };

  // 送信処理
  const handleSubmit = () => {
    submitInquiry.mutate({
      companyName: formData.companyName || undefined,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      product: formData.product || undefined,
      message: formData.message || undefined,
    });
  };

  // 確認画面を閉じて編集に戻る
  const handleBackToEdit = () => {
    setShowConfirmation(false);
  };

  // 成功画面を閉じる
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <span className="text-xl font-bold tracking-tight">visioncreative</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium hover:text-primary transition-colors">特徴</button>
            <button onClick={() => scrollToSection('products')} className="text-sm font-medium hover:text-primary transition-colors">製品一覧</button>
            <button onClick={() => scrollToSection('service')} className="text-sm font-medium hover:text-primary transition-colors">AI制作</button>
            <Button onClick={() => scrollToSection('contact')} size="sm" className="rounded-full px-6">お問い合わせ</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-background.png" 
            alt="Digital Signage Background" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background"></div>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20 backdrop-blur-sm">
              小型デジタルサイネージ専門店
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              店舗集客に<br />
              <span className="text-gradient">30万円</span>からの<br />
              デジタルサイネージ
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              映像も1万円から制作可能。<br className="md:hidden" />
              全てお任せで、あなたの店舗を輝かせます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => scrollToSection('products')} size="lg" className="rounded-full px-8 h-14 text-lg shadow-lg shadow-primary/25 w-full sm:w-auto">
                製品ラインアップを見る <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => scrollToSection('contact')} variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg bg-white/50 backdrop-blur-sm border-white/40 hover:bg-white/80 w-full sm:w-auto">
                お問い合わせ
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why visioncreative?</h2>
            <p className="text-muted-foreground text-lg">選ばれる3つの理由</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="text-center p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
                <img src="/images/icon-price.png" alt="Low Price" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">圧倒的な低価格</h3>
              <p className="text-muted-foreground">
                業界常識を覆す30万円台からの導入が可能。初期投資を抑えながら、高品質なデジタルサイネージを導入できます。
              </p>
            </GlassCard>

            <GlassCard className="text-center p-8" transition={{ delay: 0.1 }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
                <img src="/images/icon-speed.png" alt="Speed" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">映像制作1万円〜</h3>
              <p className="text-muted-foreground">
                映像コンテンツもAIを活用して制作するため、1万円からという低価格を実現。全てお任せでスピーディーに納品します。
              </p>
            </GlassCard>

            <GlassCard className="text-center p-8" transition={{ delay: 0.2 }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
                <img src="/images/icon-easy.png" alt="Easy" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">簡単・安心運用</h3>
              <p className="text-muted-foreground">
                工事不要で電源を入れるだけ。スマホアプリから簡単に配信でき、2年間の保証付きで安心して運用いただけます。
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Lineup</h2>
              <p className="text-muted-foreground">用途に合わせて選べる多彩なラインアップ</p>
            </div>
            <div className="flex gap-2 mt-6 md:mt-0 bg-white/50 p-1 rounded-lg backdrop-blur-sm">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/50'}`}
              >
                すべて
              </button>
              <button 
                onClick={() => setActiveCategory('outdoor')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeCategory === 'outdoor' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/50'}`}
              >
                屋外用
              </button>
              <button 
                onClick={() => setActiveCategory('indoor')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeCategory === 'indoor' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/50'}`}
              >
                屋内用
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <GlassCard key={product.id} className="flex flex-col h-full p-0 overflow-hidden group">
                <div className="relative h-72 bg-black overflow-hidden flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.is_new && (
                    <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                      NEW
                    </span>
                  )}
                  {product.is_popular && (
                    <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                      POPULAR
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-10">
                    <span className="text-white font-bold text-lg">{product.price_label}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-secondary rounded text-muted-foreground uppercase">
                      {product.category === 'outdoor' ? '屋外用' : '屋内用'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  
                  <div className="bg-secondary/50 rounded-lg p-3 mb-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ピッチ</span>
                      <span className="font-medium">{product.specs.pixel_pitch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">輝度</span>
                      <span className="font-medium">{product.specs.brightness}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">サイズ</span>
                      <span className="font-medium text-xs">{product.specs.size}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 flex flex-col gap-2">
                    <Button 
                      onClick={() => openCatalog(product.catalogImages)} 
                      variant="outline"
                      className="w-full rounded-full border-primary/20 hover:bg-primary/5 text-primary"
                    >
                      カタログ詳細を見る
                    </Button>
                    <Button 
                      onClick={() => setPriceModalOpen(true)} 
                      variant="outline"
                      className="w-full rounded-full border-primary/20 hover:bg-primary/5 text-primary"
                    >
                      価格表を見る
                    </Button>
                    <Button 
                      onClick={() => handleInquiry(product.name)} 
                      className="w-full rounded-full group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      この商品について問い合わせる
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Catalog Modal */}
        <Dialog open={catalogModalOpen} onOpenChange={setCatalogModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-black/90 border-none">
            <div className="relative">
              <button 
                onClick={() => setCatalogModalOpen(false)}
                className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col gap-0">
                {currentCatalogImages.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`Catalog Page ${index + 1}`} 
                    className="w-full h-auto"
                  />
                ))}
              </div>
              <div className="p-6 bg-white sticky bottom-0 flex justify-center border-t">
                <Button 
                  onClick={() => {
                    setCatalogModalOpen(false);
                    scrollToSection('contact');
                  }} 
                  size="lg" 
                  className="rounded-full px-8 shadow-lg"
                >
                  この商品について問い合わせる
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Price Table Modal */}
        <Dialog open={priceModalOpen} onOpenChange={setPriceModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-white">
            <div className="relative">
              <button 
                onClick={() => setPriceModalOpen(false)}
                className="absolute top-4 right-4 z-50 text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="mt-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">商品価格表</h2>
                <div className="space-y-8">
                  {Object.entries(productPricing).map(([key, product]) => (
                    <div key={key} className="border-b pb-6 last:border-b-0">
                      <h3 className="text-xl font-bold mb-4 text-gray-800">{product.name}</h3>
                      {product.options.length === 0 ? (
                        <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                          <p className="font-medium">お問い合わせください</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b-2 border-gray-300 bg-gray-50">
                                <th className="text-left py-3 px-3 font-bold text-gray-700">モデル</th>
                                <th className="text-left py-3 px-3 font-bold text-gray-700">解像度</th>
                                <th className="text-left py-3 px-3 font-bold text-gray-700">サイズ</th>
                                <th className="text-left py-3 px-3 font-bold text-gray-700">消費電力</th>
                                <th className="text-right py-3 px-3 font-bold text-gray-700">価格（税抜）</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.options.map((option, idx) => (
                                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                  <td className="py-3 px-3 font-medium text-gray-800">{option.model}</td>
                                  <td className="py-3 px-3 text-gray-700">{option.resolutionW}×{option.resolutionH}P</td>
                                  <td className="py-3 px-3 text-gray-700 text-xs">{option.width}×{option.height}</td>
                                  <td className="py-3 px-3 text-gray-700 text-xs">平均 {option.avgPower}</td>
                                  <td className="py-3 px-3 text-right font-bold text-primary">¥{option.priceJPY.toLocaleString('ja-JP')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {product.options[0]?.notes && (
                            <p className="text-xs text-gray-600 mt-3 p-3 bg-gray-50 rounded">
                              <span className="font-bold">注記:</span> {product.options[0].notes}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* AI Service Section */}
      <section id="service" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img src="/images/ai-content-creation.png" alt="AI Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">AI Content Creation</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                映像もAIにお任せ。<br />
                <span className="text-gradient">早い・安い・高品質</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                デジタルサイネージの効果を最大化するには、魅力的なコンテンツが不可欠です。
                visioncreativeでは、最新のAI技術を駆使して、高品質な映像コンテンツを短納期・低価格で制作します。
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">スピード納品</h4>
                    <p className="text-muted-foreground">AIによる自動生成とプロの監修を組み合わせ、従来の制作期間を大幅に短縮。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">コスト削減</h4>
                    <p className="text-muted-foreground">制作工程の効率化により、驚きの低価格を実現。定期的なコンテンツ更新も容易です。</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative space-y-6">
              <GlassCard className="p-2 rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="/images/ai-content-creation.png" alt="AI Content Service" className="rounded-lg w-full shadow-2xl" />
              </GlassCard>
              
              {/* YouTube Shorts */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-xl">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/qK_7ajGNjmw"
                  title="AI制作事例 - YouTube Shorts"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-white font-bold text-sm bg-gray-900 rounded-lg py-2">AI制作事例</p>
                <p className="text-gray-600 text-xs">最新のAI技術による映像制作</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">活用シーン</h2>
            <p className="text-muted-foreground">様々な業種で導入されています</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              '飲食店', '美容室', '学習塾', '歯科医院', 
              'ショッピングモール', 'ホテル', '自動車販売', 
              'ペットショップ', 'イベント会場', 'カルチャースクール'
            ].map((item, idx) => (
              <span key={idx} className="px-6 py-3 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">動画で見る</h2>
            <p className="text-muted-foreground mb-8">YouTubeチャンネルでサンプル動画を公開中</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* YouTube Channel Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-red-600">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">visioncreative</h3>
                    <p className="text-sm text-muted-foreground">小型デジタルサイネージ専門</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  YouTubeチャンネルでは、K-SLIM、K-STAND、K-FOLD、K-TRIPLEなどの製品デモ動画や、実際の導入事例、使用例を多数公開しています。
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-red-600 font-bold">34</span>
                    <span className="text-gray-600">本の動画を公開中</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-red-600 font-bold">9</span>
                    <span className="text-gray-600">人のチャンネル登録者</span>
                  </div>
                </div>

                <a 
                  href="https://youtube.com/@visioncreative-f7u?si=UGIDeIXzY84p3QBr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                >
                  <Button size="lg" className="w-full rounded-full h-12 text-lg font-bold shadow-lg shadow-red-600/20 bg-red-600 hover:bg-red-700">
                    チャンネルを見る <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Video Thumbnails Preview */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-xl">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/JU58AHwMxBY"
                  title="製品デモ動画 - 大型サイネージレンタル開始"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-white font-bold text-sm bg-gray-900 rounded-lg py-2">製品デモ動画</p>
                <p className="text-gray-600 text-xs">大型サイネージレンタル開始</p>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                チャンネルでは、各製品の特徴や活用シーンを動画でわかりやすく紹介しています
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-secondary/30 to-background relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <GlassCard className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
              <p className="text-muted-foreground">
                製品に関するご質問や導入のご相談など、お気軽にお問い合わせください。<br />
                担当者より迅速にご連絡いたします。
              </p>
            </div>

            <form onSubmit={handleShowConfirmation} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">会社名・店舗名</label>
                  <input 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="例: 株式会社visioncreative" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">お名前 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="例: 山田 太郎" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">メールアドレス <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="example@visioncreative.jp" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">電話番号</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="03-1234-5678" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">興味のある製品</label>
                <select 
                  name="product"
                  className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.product}
                  onChange={handleInputChange}
                >
                  <option value="">選択してください</option>
                  {products.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                  <option value="AIコンテンツ制作">AIコンテンツ制作</option>
                  <option value="その他・未定">その他・未定</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">お問い合わせ内容</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4} 
                  className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                  placeholder="ご質問やご要望をご記入ください"
                ></textarea>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full rounded-full h-12 text-lg font-bold shadow-lg shadow-primary/20">
                  入力内容を確認する <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      </section>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-2xl p-0 bg-white overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">入力内容の確認</h2>
            <p className="text-muted-foreground text-center mb-8">以下の内容で送信してよろしいですか？</p>
            
            <div className="space-y-4 bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">会社名・店舗名</span>
                <span className="col-span-2 text-sm">{formData.companyName || '未入力'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">お名前</span>
                <span className="col-span-2 text-sm font-medium">{formData.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">メールアドレス</span>
                <span className="col-span-2 text-sm">{formData.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">電話番号</span>
                <span className="col-span-2 text-sm">{formData.phone || '未入力'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">興味のある製品</span>
                <span className="col-span-2 text-sm">{formData.product || '未選択'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3">
                <span className="text-sm font-medium text-gray-600">お問い合わせ内容</span>
                <span className="col-span-2 text-sm whitespace-pre-wrap">{formData.message || '未入力'}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={handleBackToEdit}
                className="flex-1 rounded-full h-12"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                修正する
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={submitInquiry.isPending}
                className="flex-1 rounded-full h-12 font-bold"
              >
                {submitInquiry.isPending ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    送信中...
                  </>
                ) : (
                  <>
                    送信する
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md p-0 bg-white overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">送信完了</h2>
            <p className="text-muted-foreground mb-8">
              お問い合わせありがとうございます。<br />
              担当者より折り返しご連絡いたします。
            </p>
            <Button 
              onClick={handleCloseSuccess}
              className="w-full rounded-full h-12 font-bold"
            >
              閉じる
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">V</div>
                <span className="text-xl font-bold tracking-tight">visioncreative</span>
              </div>
              <p className="text-gray-400 max-w-sm mb-6">
                店舗集客に30万円からのデジタルサイネージ。<br />
                映像も1万円から制作可能。<br />
                全てお任せの小型デジタルサイネージ専門店。
              </p>
              <div className="flex gap-4">
                <a href="https://line.me/R/ti/p/@834tysvk" target="_blank" rel="noopener noreferrer" className="bg-[#06C755] hover:bg-[#05b34c] text-white px-4 py-2 rounded-full flex items-center text-sm font-bold transition-colors">
                  LINE公式アカウント
                </a>
                <a href="https://youtube.com/@visioncreative-f7u?si=UGIDeIXzY84p3QBr" target="_blank" rel="noopener noreferrer" className="bg-[#FF0000] hover:bg-[#cc0000] text-white px-4 py-2 rounded-full flex items-center text-sm font-bold transition-colors">
                  YouTube
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">運営会社</h4>
              <div className="text-gray-400 text-sm space-y-4">
                <div>
                  <p className="font-bold text-white mb-1">株式会社ビー・クリエイティブ</p>
                  <a href="https://www.becreative.co.jp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">会社紹介サイト &rarr;</a>
                </div>
                <div>
                  <p className="font-bold text-gray-300">本社</p>
                  <p>〒468-0015</p>
                  <p>愛知県名古屋市天白区原3丁目304番1号</p>
                  <p>T&Lビル2-A</p>
                  <p>TEL: 052-847-7500</p>
                  <p>FAX: 052-847-7501</p>
                </div>
                <div>
                  <p className="font-bold text-gray-300">東京</p>
                  <p>〒141-0031</p>
                  <p>東京都品川区西五反田1-11-1</p>
                  <p>Aios五反田駅前506</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">お問い合わせ</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-primary" /> 
                  <a href="mailto:visioncreative@becreative.co.jp" className="hover:text-white transition-colors">visioncreative@becreative.co.jp</a>
                </li>
                <li className="flex items-center">
                  <a href="https://www.becreative.co.jp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.becreative.co.jp</a>
                </li>
                <li>
                  <a href="https://line.me/R/ti/p/@834tysvk" target="_blank" rel="noopener noreferrer" className="block bg-[#06C755] text-white text-center py-3 rounded-lg font-bold hover:bg-[#05b34c] transition-colors">
                    LINEで相談する
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 株式会社ビー・クリエイティブ All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
