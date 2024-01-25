package Models

type User struct {
	UserID   uint `gorm:"primaryKey"`
	Username string
}
