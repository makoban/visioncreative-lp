from PIL import Image
import os

# 出力ディレクトリ作成
output_dir = "/home/ubuntu/visioncreative-lp/client/public/images/products"
os.makedirs(output_dir, exist_ok=True)

# 画像パスのマッピング（ページ番号と商品ID）
# ページ番号はファイル名に対応 (001.webp -> page 1)
# カタログの構成に基づいてクロップ範囲を指定（概算）
# 黒い画面の商品画像を切り出す

# 画像サイズは元のwebpがおそらく高解像度ではないため、アスペクト比を維持して切り出す
# 各ページのレイアウトを確認しながら調整が必要だが、まずは中心付近の商品を狙う

def crop_product(page_num, product_id, crop_box):
    try:
        img_path = f"/tmp/pdf_images/Kvposter(1)/{page_num:03d}.webp"
        if not os.path.exists(img_path):
            print(f"File not found: {img_path}")
            return

        img = Image.open(img_path)
        width, height = img.size
        
        # crop_boxは (left_ratio, top_ratio, right_ratio, bottom_ratio)
        left = int(width * crop_box[0])
        top = int(height * crop_box[1])
        right = int(width * crop_box[2])
        bottom = int(height * crop_box[3])
        
        cropped = img.crop((left, top, right, bottom))
        
        # 保存
        save_path = os.path.join(output_dir, f"{product_id}.png")
        cropped.save(save_path)
        print(f"Saved {save_path}")
        
    except Exception as e:
        print(f"Error processing {product_id}: {e}")

# 各商品のページとクロップ範囲（要調整）
# ページ番号はPDFのページ番号
# 1: KSLIM (表紙) -> 2ページ目が詳細か？
# 2: KSLIM 詳細
# 3: KSLIM スペック
# 4: KPOSTER
# 5: KPOSTER スペック
# 6: KDOUBLE
# 7: KDOUBLE スペック
# 8: KFOLD
# 9: KFOLD スペック
# 10: KSTAND
# 11: KSTAND スペック
# 12: KTRIPLE
# 13: KTRIPLE スペック

# クロップ範囲は試行錯誤が必要だが、一旦中央の商品を狙う
# (left, top, right, bottom) 0.0-1.0

# KSLIM (Page 2)
crop_product(2, "kslim", (0.1, 0.1, 0.9, 0.8))

# KPOSTER (Page 4)
crop_product(4, "kposter", (0.1, 0.1, 0.9, 0.8))

# KDOUBLE (Page 6)
crop_product(6, "kdouble", (0.1, 0.1, 0.9, 0.8))

# KFOLD (Page 8)
crop_product(8, "kfold", (0.1, 0.1, 0.9, 0.8))

# KSTAND (Page 10)
crop_product(10, "kstand", (0.1, 0.1, 0.9, 0.8))

# KTRIPLE (Page 12)
crop_product(12, "ktriple", (0.1, 0.1, 0.9, 0.8))
