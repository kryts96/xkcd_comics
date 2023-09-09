package config

import (
	"fmt"

	"github.com/jinzhu/configor"
)

const configFileName = "config/config.yaml"

var Config = struct {
	HttpServer struct {
		Port int `env:"HTTP_PORT"`
	}
	Xkcd struct {
		Xkcdurl string `env:"XKCD_XKCDURL"`
	}
}{}

func init() {
	err := configor.Load(&Config, configFileName)
	if err != nil {
		panic(err)
	}
	fmt.Printf("config: %#v", Config)
}
