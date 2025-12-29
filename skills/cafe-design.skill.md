# カフェデザインスキル

## 概要
Cafe Foamに最適なデザインを作成するための専門知識

## スキル定義

### AIっぽいデザイン回避チェック
```yaml
禁止パターン:
  - 紫〜青のグラデーション背景
  - 絵文字の装飾的使用（本文補助以外）
  - Inter, Roboto, Arial フォント
  - 過度に均一な角丸カード群（全て同じradius）
  - 白背景＋青アクセント
  - ストックフォト的な人物画像
  - 過度に完璧なグリッド配置

許可パターン:
  - アースカラー系グラデーション（茶〜ベージュ）
  - Font Awesome等のアイコン（控えめに）
  - Noto Sans JP, Shippori Minchoなど和文フォント
  - 異なるサイズ・形状のカード混在
  - クリーム〜茶系背景
  - 実際のカフェ写真または手描き風イラスト
  - 意図的な非対称レイアウト
```

### カフェらしいカラーパレット
```css
/* 推奨カラー */
--espresso: #3C2415;      /* 深いエスプレッソブラウン */
--cream: #F5E6D3;         /* クリーミーベージュ */
--latte: #C4A77D;         /* ラテブラウン */
--matcha: #7B9971;        /* 抹茶グリーン */
--houji: #8B6914;         /* ほうじ茶ゴールド */
--caramel: #D2691E;       /* キャラメルオレンジ */
--paper: #FFFEF9;         /* 紙のような背景 */

/* 禁止カラー */
--ng-purple: #6B5CE7;     /* 禁止：紫系 */
--ng-blue: #007BFF;       /* 禁止：汎用ブルー */
--ng-teal: #20C997;       /* 禁止：ティール */
```

### タイポグラフィガイド
```css
/* 見出し - 和の品格 */
h1, h2, h3 {
  font-family: "Shippori Mincho", "Noto Serif JP", serif;
}

/* 本文 - 読みやすさ重視 */
body, p {
  font-family: "Noto Sans JP", "M PLUS 1p", sans-serif;
  line-height: 1.8;
}

/* 価格・数値 */
.price {
  font-family: "DM Mono", "Source Code Pro", monospace;
}
```

### 素材感の表現
```css
/* 紙テクスチャ */
.paper-texture {
  background-image: url('data:image/svg+xml,...');
  background-color: var(--paper);
}

/* 木目調 */
.wood-texture {
  background: linear-gradient(
    90deg,
    var(--espresso) 0%,
    var(--latte) 50%,
    var(--espresso) 100%
  );
}
```

## 適用チェックリスト
- [ ] 紫系のグラデーションを使用していない
- [ ] 絵文字を装飾目的で使用していない
- [ ] 和文フォントを適切に使用している
- [ ] カフェらしいカラーパレットを使用している
- [ ] 印刷しても読みやすいデザイン
- [ ] 片手で操作できるUI配置
