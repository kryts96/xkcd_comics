package controllers

import (
	"example/api/services"
	"net/http"

	"github.com/labstack/echo/v4"
)

type comicController struct {
	cs services.ComicService
}

func NewComicController(s services.ComicService) *comicController {
	return &comicController{cs: s}
}

func (c *comicController) GetComic(ec echo.Context) error {
	res := c.cs.GetComic(ec)
	return ec.JSON(http.StatusOK, map[string]interface{}{
		"Success":  true,
		"Response": res,
	})
}
