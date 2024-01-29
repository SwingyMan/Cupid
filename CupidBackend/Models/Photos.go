package Models

type Photo struct {
	//[ 0] photo_id                                       INT8                 null: false  primary: true   isArray: false  auto: false  col: INT8            len: -1      default: []
	PhotoID int64 `gorm:"primary_key;column:photo_id;type:INT8;"`
	//[ 1] url                                            TEXT                 null: true   primary: false  isArray: false  auto: false  col: TEXT            len: -1      default: []
	URL string `gorm:"column:url;type:TEXT;"`
	//[ 2] user_id                                        INT2                 null: true   primary: false  isArray: false  auto: false  col: INT2            len: -1      default: []
	UserID uint8 `gorm:"column:user_id;type:INT2;"`
}
