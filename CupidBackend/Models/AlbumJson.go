package Models

type AlbumJson struct {
	ID       uint8   `json:"id"`
	Title    string  `json:"title"`
	Code     string  `json:"code"`
	AdminID  int     `json:"adminID"`
	NumPages int     `json:"num_pages"`
	UserIDs  []int   `json:"userIDs"`
	PhotoIDs [][]int `json:"photoIDs"`
}
