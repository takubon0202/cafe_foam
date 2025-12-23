# Cafe Foam デザインガイドライン

## 1. ブランドアイデンティティ

### ブランドコンセプト
```
「温かみのある、プロフェッショナルなカフェ体験」

キーワード:
- 和モダン
- クラフト感
- 実用性
- 温かみ
- プロフェッショナル
```

### ブランドボイス
```
トーン: 親しみやすく、でも専門的
言葉遣い: 丁寧語、簡潔
NG: 過度にカジュアル、命令形
```

## 2. カラーシステム

### プライマリカラー
| 名前 | HEX | RGB | 用途 |
|------|-----|-----|------|
| Espresso | #3C2415 | 60, 36, 21 | ヘッダー、重要ボタン、見出し |
| Cream | #F5E6D3 | 245, 230, 211 | カード背景、アクセント |
| Latte | #C4A77D | 196, 167, 125 | ホバー、セカンダリボタン |

### アクセントカラー
| 名前 | HEX | RGB | 用途 |
|------|-----|-----|------|
| Matcha | #7B9971 | 123, 153, 113 | 和メニュー、成功状態 |
| Houji | #8B6914 | 139, 105, 20 | 警告、注意 |
| Caramel | #D2691E | 210, 105, 30 | 洋メニュー、CTA |

### 背景カラー
| 名前 | HEX | RGB | 用途 |
|------|-----|-----|------|
| Paper | #FFFEF9 | 255, 254, 249 | メイン背景 |
| Surface | #FAF6F0 | 250, 246, 240 | セクション背景 |

### テキストカラー
| 名前 | HEX | RGB | 用途 |
|------|-----|-----|------|
| Primary | #2D2926 | 45, 41, 38 | メインテキスト |
| Secondary | #5C5552 | 92, 85, 82 | サブテキスト |
| Muted | #8C8580 | 140, 133, 128 | 注釈 |

### 禁止カラー
```
❌ #6B5CE7（紫系）
❌ #007BFF（汎用ブルー）
❌ #20C997（ティール）
❌ 純粋な黒 #000000
❌ 純粋な白 #FFFFFF
```

## 3. タイポグラフィ

### フォントファミリー
```css
/* 見出し */
--font-heading: "Shippori Mincho", "Noto Serif JP", serif;

/* 本文 */
--font-body: "Noto Sans JP", "M PLUS 1p", sans-serif;

/* 数字・価格 */
--font-mono: "DM Mono", "Source Code Pro", monospace;
```

### フォントサイズ（モバイルファースト）
```css
--text-xs: 0.75rem;    /* 12px - 注釈、キャプション */
--text-sm: 0.875rem;   /* 14px - サブ情報、ラベル */
--text-base: 1rem;     /* 16px - 本文 */
--text-lg: 1.125rem;   /* 18px - 小見出し */
--text-xl: 1.25rem;    /* 20px - 見出し */
--text-2xl: 1.5rem;    /* 24px - セクション見出し */
--text-3xl: 2rem;      /* 32px - ページタイトル */
```

### 行間
```css
--leading-tight: 1.3;   /* 見出し */
--leading-normal: 1.6;  /* 通常テキスト */
--leading-relaxed: 1.8; /* 長文 */
```

## 4. スペーシング

### 基準値（8の倍数）
```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
```

## 5. コンポーネント

### ボタン
```css
/* プライマリ */
.btn-primary {
  background: var(--color-espresso);
  color: var(--color-paper);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: 500;
  min-height: 44px;
}

/* セカンダリ */
.btn-secondary {
  background: var(--color-cream);
  color: var(--color-espresso);
  border: 1px solid var(--color-latte);
}
```

### カード
```css
.card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
}
```

### 入力フィールド
```css
.input {
  border: 1px solid var(--color-latte);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
  font-size: var(--text-base);
}

.input:focus {
  outline: 2px solid var(--color-matcha);
  outline-offset: 2px;
}
```

## 6. アイコン

### 使用ライブラリ
- Font Awesome 6（Free版）
- 控えめに使用

### 使用ガイドライン
```html
<!-- 良い例：意味のあるアイコン -->
<button>
  <i class="fas fa-coffee"></i>
  <span>メニュー</span>
</button>

<!-- 悪い例：装飾のみ -->
<h2>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  人気メニュー
  <i class="fas fa-star"></i>
</h2>
```

## 7. 画像

### サイズ規定
| カテゴリ | サイズ | フォーマット |
|----------|--------|--------------|
| メニュー写真 | 400x400px | WebP + JPG |
| 手順写真 | 800x600px | WebP + JPG |
| アイコン | 48x48px | SVG |
| ヒーロー画像 | 1200x600px | WebP + JPG |

### スタイルガイド
```
✓ 自然光風の柔らかいライティング
✓ 木目やリネンの背景
✓ 温かみのある色調
✓ 実際のカフェの雰囲気

❌ 完璧すぎるAI生成画像
❌ ストックフォト的な構図
❌ 冷たい印象のスタジオ撮影風
```

## 8. レスポンシブ

### ブレークポイント
```css
--bp-sm: 640px;   /* スマホ */
--bp-md: 768px;   /* タブレット */
--bp-lg: 1024px;  /* 小型デスクトップ */
--bp-xl: 1280px;  /* 標準デスクトップ */
```

### モバイルファースト原則
```css
/* 基本（モバイル） */
.container {
  padding: var(--space-4);
}

/* タブレット以上 */
@media (min-width: 768px) {
  .container {
    padding: var(--space-8);
  }
}
```

## 9. 印刷対応

```css
@media print {
  /* 不要要素の非表示 */
  .nav, .footer, button {
    display: none !important;
  }

  /* 背景色を印刷 */
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ページ分割制御 */
  .card {
    break-inside: avoid;
  }

  /* フォントサイズ調整 */
  body {
    font-size: 10pt;
  }
}
```

## 10. アクセシビリティ

### 必須要件
- コントラスト比 4.5:1 以上
- フォーカスインジケーター明示
- alt属性必須
- ARIA ラベル適切な使用
- キーボードナビゲーション対応

### チェックリスト
- [ ] 全ての画像に意味のあるalt
- [ ] ボタン・リンクに明確なラベル
- [ ] フォーム要素にlabel
- [ ] 色だけに依存しない情報伝達
- [ ] Tab順序の論理性
