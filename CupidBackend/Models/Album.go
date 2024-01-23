package Models

type Album struct {
	ID        uint
	Title     string
	Code      string
	AdminID   uint8
	NumPages  int
	UserID    []uint8 `gorm:"many2many:album_users"`
	PhotoSets []PhotoSet
}
