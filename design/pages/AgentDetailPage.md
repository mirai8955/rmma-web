# AgentDetailPage デザイン仕様

## レイアウト構造
```
全画面背景 (bg-white)
└── コンテナ (container mx-auto p-4 sm:p-6 lg:p-8)
    ├── 戻るボタン (inline-flex items-center)
    ├── エージェントヘッダー (カード形式)
    ├── 説明セクション (カード形式)
    ├── 指示セクション (カード形式)
    ├── ツールセクション (カード形式)
    └── 技術詳細セクション (カード形式)
```

## カラーパレット
- **背景色**: 白 (`bg-white`)
- **カード背景**: 白 (`bg-white`)
- **カード境界線**: グレー (`border-gray-200`)
- **戻るボタン**: 青 (`text-blue-600` / `hover:text-blue-700`)
- **メインアイコン**: 青 (`text-blue-500`)
- **ツールアイコン**: グレー (`text-gray-500`)

## カードデザイン
- **角丸**: 大 (`rounded-xl`)
- **影**: `shadow-lg`
- **境界線**: `border border-gray-200`
- **パディング**: `p-6`
- **間隔**: `mb-6` (カード間)

## タイポグラフィ
- **ページタイトル**: `text-3xl font-bold`
- **セクションタイトル**: `text-xl font-semibold`
- **説明文**: `text-gray-700 leading-relaxed`
- **指示文**: `text-sm whitespace-pre-wrap` (preタグ使用)
- **技術詳細**: `font-mono text-sm`

## セクション別スタイル

### ヘッダーセクション
- **アイコン**: `w-12 h-12` (大きめ)
- **レイアウト**: `flex items-center space-x-4`
- **モデル情報**: `text-sm text-gray-500`

### 指示セクション
- **背景**: `bg-gray-50` (ネストされたボックス)
- **パディング**: `p-4`
- **角丸**: `rounded-lg`
- **フォーマット**: `<pre>`タグで改行保持

### ツールセクション
- **グリッド**: `grid-cols-1 md:grid-cols-2 gap-3`
- **ツールアイテム**: `bg-gray-50 rounded-lg p-3`
- **アイコン**: `w-4 h-4` + `mr-3`
- **フォント**: `font-mono text-sm`

### 技術詳細セクション
- **レイアウト**: `flex justify-between items-center`
- **区切り線**: `border-b border-gray-200`
- **パディング**: `py-2`

## インタラクション
- **戻るボタン**: ホバー時色変化 (`hover:text-blue-700`)
- **アニメーション**: スムーズ遷移 (`transition-colors`)

## レスポンシブ対応
- **ツールグリッド**: モバイル1列 → タブレット2列
- **パディング**: `p-4 sm:p-6 lg:p-8` 