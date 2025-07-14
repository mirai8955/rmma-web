# AgentListPage デザイン仕様

## レイアウト構造
```
全画面背景 (bg-white)
└── コンテナ (container mx-auto p-4 sm:p-6 lg:p-8)
    ├── ページタイトル (text-3xl font-bold)
    └── カードグリッド (grid gap-6)
        └── AgentCard × N個
```

## カラーパレット
- **背景色**: 白 (`bg-white`)
- **テキスト**: ダークグレー (`text-gray-900`)
- **アイコン色**:
  - 青: `text-blue-500` (Search系)
  - 緑: `text-green-500` (Post系)
  - 紫: `text-purple-500` (Generation系)
  - グレー: `text-gray-500` (その他)
- **ボタン**: 青 (`bg-blue-600` / `hover:bg-blue-700`)

## レスポンシブグリッド
- **モバイル**: 1列 (`grid-cols-1`)
- **タブレット**: 2列 (`md:grid-cols-2`)
- **デスクトップ**: 3列 (`lg:grid-cols-3`)

## AgentCard デザイン
- **背景**: 白 (`bg-white`)
- **境界線**: グレー (`border-gray-200`)
- **角丸**: 大 (`rounded-xl`)
- **影**: `shadow-lg` → `hover:shadow-2xl`
- **パディング**: `p-6`
- **ホバー**: 影の拡大アニメーション (`transition-shadow`)

## タイポグラフィ
- **ページタイトル**: `text-3xl font-bold tracking-tight`
- **カードタイトル**: `text-lg font-semibold`
- **説明文**: `text-sm text-gray-500`

## アイコン
- **サイズ**: `w-8 h-8`
- **ライブラリ**: lucide-react (`Search`, `Bot`, `Cog`)

## インタラクション
- **カードホバー**: 影の拡大 (`hover:shadow-2xl`)
- **ボタンホバー**: 色変化 (`hover:bg-blue-700`)
- **アニメーション**: スムーズ遷移 (`transition-shadow`, `transition-colors`) 