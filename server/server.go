package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	xl "github.com/antchfx/xmlquery"
)

func main() {

	type Mag struct {
		Name string
		Img  string
	}

	type Handler struct {
		Name string
	}

	f, err := os.Open("./czasopisma.xml")
	if err != nil {
		log.Fatal(err.Error())
	}
	doc, err := xl.Parse(f)
	if err != nil {
		log.Fatal(err.Error())
	}

	http.HandleFunc("/magazines/list", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		var tmp []Mag
		for _, n := range xl.Find(doc, "//zmienne/*") {
			var inTmp Mag
			inTmp.Img = fmt.Sprintf("%s%s", "http://www.atarionline.pl/biblioteka/czasopisma/img/", n.SelectElement("src").InnerText())
			inTmp.Name = n.SelectElement("klik").InnerText()
			tmp = append(tmp, inTmp)
		}
		json.NewEncoder(w).Encode(tmp)
	})

	http.HandleFunc("/magazines/get/years", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		var handler Handler

		json.NewDecoder(r.Body).Decode(handler)
	})

	log.Fatal(http.ListenAndServe(":9000", nil))
}
