package services

import (
	"encoding/json"
	"example/api/config"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

type ComicService interface {
	GetComic(c echo.Context) map[string]interface{}
}

type comicService struct {
	cli http.Client
}

func NewComicService(c http.Client) *comicService {
	return &comicService{cli: c}
}

func (cs *comicService) GetComic(c echo.Context) map[string]interface{} {
	var result map[string]interface{}
	comicId := c.Param("id")
	queryUrl := ""
	if comicId != "" {
		queryUrl = config.Config.Xkcd.Xkcdurl + "/" + comicId + "/info.0.json"
	} else {
		queryUrl = config.Config.Xkcd.Xkcdurl + "/info.0.json"
	}
	req, err := http.NewRequest("GET", queryUrl, nil)
	if err != nil {
		result["Error"] = err
		return result
	}

	resp, err := cs.cli.Do(req)
	if err != nil {
		result["Error"] = err
		return result
	}
	defer resp.Body.Close()
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		result["Error"] = err
		return result
	}
	respBodyStr := string(respBody)
	if resp.StatusCode == 200 {
		var resultContent map[string]interface{}
		jsonErr := json.Unmarshal(respBody, &resultContent)
		if jsonErr != nil {
			result["Error"] = jsonErr
			return result
		}
		result = resultContent
	} else {
		result["Result"] = respBodyStr
	}
	return result
}
