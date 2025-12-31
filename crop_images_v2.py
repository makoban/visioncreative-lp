from PIL import Image
import os

# 出力ディレクトリ
output_dir = "/home/ubuntu/visioncreative-lp/client/public/images/products"
os.makedirs(output_dir, exist_ok=True)

def crop_product_v2(page_num, product_id, crop_box):
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

# ユーザーの指示に基づき、ページ上部の黒背景メインビジュアル部分を切り出す
# おおよそ上半分 (0.0 - 0.55 程度) に商品名、写真、アイコンが含まれている

# KSLIM (Page 2)
crop_product_v2(2, "kslim", (0.0, 0.0, 1.0, 0.55))

# KPOSTER (Page 4)
crop_product_v2(4, "kposter", (0.0, 0.0, 1.0, 0.55))

# KDOUBLE (Page 6)
crop_product_v2(6, "kdouble", (0.0, 0.0, 1.0, 0.55))

# KFOLD (Page 8)
crop_product_v2(8, "kfold", (0.0, 0.0, 1.0, 0.55))

# KSTAND (Page 10)
crop_product_v2(10, "kstand", (0.0, 0.0, 1.0, 0.55))

# KTRIPLE (Page 12)
crop_product_v2(12, "ktriple", (0.0, 0.0, 1.0, 0.55))
