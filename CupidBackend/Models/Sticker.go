package Models

type Sticker struct {
	StickerID   uint `gorm:"primaryKey"`
	StickerLink string
}
