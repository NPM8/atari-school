package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	xl "github.com/antchfx/xmlquery"
)

func addCorsHeader(res http.ResponseWriter) {
	headers := res.Header()
	headers.Add("Access-Control-Allow-Origin", "*")
	headers.Add("Vary", "Origin")
	headers.Add("Vary", "Access-Control-Request-Method")
	headers.Add("Vary", "Access-Control-Request-Headers")
	headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token")
	headers.Add("Access-Control-Allow-Methods", "GET, POST,OPTIONS")
}

func main() {

	type Mag struct {
		Name string
		Img  string
	}

	type Mgazineobj struct {
		Nazwa         string
		Numer         string
		Wydawca       string
		Format        string
		Stron         string
		Miniaturka    string
		Plik          string
		Skan          string
		Przetworzenie string
		Podeslal      string
	}

	type Handler struct {
		Name string `json:"name"`
		Year string `json:"year"`
	}

	type YearsHandler struct {
		Years []string `json:"years"`
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
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With,content-type")
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
		addCorsHeader(w)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With,content-type")

		var handler Handler
		if r.Body == nil {
			http.Error(w, "Please send a request body", 400)
			return
		}
		err := json.NewDecoder(r.Body).Decode(&handler)
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}
		fmt.Println(handler.Name)
		// err := json.NewDecoder(r.Body).Decode(&handler)
		// if err != nil {
		//     panic(err)
		// }
		// fmt.Sprintf("%s/%s","//lata",handler.Name)
		fmt.Print(handler.Name)
		lata := xl.FindOne(doc, "//lata/"+handler.Name).InnerText()
		var years YearsHandler
		years.Years = strings.Split(lata, ",")
		json.NewEncoder(w).Encode(years)
	})

	http.HandleFunc("/magazine/get/magazines", func(w http.ResponseWriter, r *http.Request) {
		addCorsHeader(w)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With,content-type")

		var handler Handler
		if r.Body == nil {
			http.Error(w, "Please send a request body", 400)
			return
		}
		err := json.NewDecoder(r.Body).Decode(&handler)
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}
		var tmp []Mgazineobj
		switch handler.Year {
		case "all":
			break
		default:

		}
		for _, n := range xl.Find(doc, fmt.Sprintf("//%s/*[@rok=%s]", handler.Name, handler.Year)) {

		}
	})

	log.Fatal(http.ListenAndServe(":9000", nil))
}
