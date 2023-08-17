package main

import (
	"example/api/config"
	"example/api/controllers"
	"example/api/services"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	cli := &http.Client{CheckRedirect: func(req *http.Request, via []*http.Request) error {
		return http.ErrUseLastResponse
	}}

	conf := config.Config

	comicService := services.NewComicService(*cli)
	comicController := controllers.NewComicController(comicService)

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{
			"http://localhost:5173",
		},
	}))

	e.GET("/comic/get", comicController.GetComic)

	address := fmt.Sprintf(":%d", conf.HttpServer.Port)
	e.Logger.Fatal(e.Start(address))
}
