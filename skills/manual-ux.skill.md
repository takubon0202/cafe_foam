# マニュアルUXスキル

## 概要
カフェスタッフが効率的に情報を取得できるマニュアルUXの専門知識

## ターゲットユーザー理解

### プライマリ: 新人バリスタ「田中さん」
```yaml
状況: 接客中に片手でスマホを操作
制約:
  - 時間がない（お客様を待たせている）
  - 片手しか使えない
  - 画面が見づらい環境
  - プレッシャーを感じている
ニーズ:
  - 3タップ以内で目的の情報に到達
  - 大きなボタン、読みやすい文字
  - 視覚的なステップガイド
```

### セカンダリ: 店長「佐藤さん」
```yaml
状況: 新人教育、記録管理
制約:
  - PCとスマホを併用
  - 複数のスタッフを管理
ニーズ:
  - チェックリストの一括確認
  - 編集・更新機能
  - 印刷対応
```

## 情報設計原則

### 3タップルール
```
ホーム → カテゴリ → 詳細 → アクション

例: カフェラテの作り方
1. ホーム画面
2. 「メニュー」タップ
3. 「カフェラテ」タップ
→ 作り方表示
```

### 視覚的階層
```
1. タイトル（何をするか）
2. 重要注意事項（赤/オレンジ）
3. ステップ（番号付きリスト）
4. 詳細説明（折りたたみ可）
5. 参考情報（グレーアウト）
```

### モバイルファースト操作
```css
/* タップ領域の最小サイズ */
.button, .link {
  min-height: 44px;
  min-width: 44px;
}

/* 親指操作エリア */
.primary-actions {
  position: fixed;
  bottom: 0;
  /* 画面下部にメインアクション配置 */
}
```

## コンポーネント設計

### メニューカード
```html
<article class="menu-card">
  <img src="..." alt="..." loading="lazy">
  <h3>カフェラテ</h3>
  <p class="price">¥400</p>
  <button class="btn-primary">作り方を見る</button>
</article>
```

### ステップガイド
```html
<ol class="step-guide">
  <li class="step" data-step="1">
    <div class="step-number">1</div>
    <div class="step-content">
      <h4>カップを温める</h4>
      <p>お湯を入れて1分待つ</p>
    </div>
  </li>
</ol>
```

### チェックリスト
```html
<div class="checklist">
  <label class="checklist-item">
    <input type="checkbox" data-id="c1">
    <span class="checkmark"></span>
    <span class="label">手洗い完了</span>
  </label>
</div>
```

## アクセシビリティ要件
- コントラスト比 4.5:1 以上
- フォーカスインジケーター明示
- スクリーンリーダー対応
- キーボードナビゲーション

## 印刷対応
```css
@media print {
  .nav, .footer, .no-print {
    display: none;
  }

  .page-break {
    break-before: page;
  }

  body {
    font-size: 10pt;
    line-height: 1.4;
  }
}
```

## 適用チェックリスト
- [ ] 3タップ以内で目的達成可能
- [ ] ボタンサイズ44px以上
- [ ] 片手操作を考慮した配置
- [ ] 緊急時でも見つけやすいUI
- [ ] 印刷時に読みやすい
