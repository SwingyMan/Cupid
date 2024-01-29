package Imgur

type ImgurResponse struct {
	Data    ImgurData `json:"data"`
	Success bool      `json:"success"`
	Status  int64     `json:"status"`
}
