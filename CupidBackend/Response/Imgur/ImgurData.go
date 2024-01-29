package Imgur

// ImgurData represents the "data" field in the JSON response
type ImgurData struct {
	ID          string        `json:"id"`
	Title       interface{}   `json:"title"`
	Description interface{}   `json:"description"`
	Datetime    int64         `json:"datetime"`
	Type        string        `json:"type"`
	Animated    bool          `json:"animated"`
	Width       int64         `json:"width"`
	Height      int64         `json:"height"`
	Size        int64         `json:"size"`
	Views       int64         `json:"views"`
	Bandwidth   int64         `json:"bandwidth"`
	Vote        interface{}   `json:"vote"`
	Favorite    bool          `json:"favorite"`
	Nsfw        interface{}   `json:"nsfw"`
	Section     interface{}   `json:"section"`
	AccountURL  interface{}   `json:"account_url"`
	AccountID   int64         `json:"account_id"`
	IsAd        bool          `json:"is_ad"`
	InMostViral bool          `json:"in_most_viral"`
	Tags        []interface{} `json:"tags"`
	AdType      int64         `json:"ad_type"`
	AdURL       string        `json:"ad_url"`
	InGallery   bool          `json:"in_gallery"`
	Deletehash  string        `json:"deletehash"`
	Name        string        `json:"name"`
	Link        string        `json:"link"`
}
