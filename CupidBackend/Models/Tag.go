package Models

type Tag struct {
	TagID uint `gorm:"primaryKey"`
	Name  string
}
