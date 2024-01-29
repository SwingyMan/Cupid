package Models

type AlbumJson2 struct {
	ID       uint8      `json:"id"`
	Title    string     `json:"title"`
	Code     string     `json:"code"`
	AdminID  int        `json:"adminID"`
	NumPages int        `json:"num_pages"`
	UserIDs  []int      `json:"userIDs"`
	Pages    [][]string `json:"pages"`
}
