package main

import (
	"log"
	"net/http"
	"strings"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/final/icons/", func(w http.ResponseWriter, r *http.Request) {
		http.StripPrefix("/final/icons/", http.FileServer(http.Dir("./final/icons/"))).ServeHTTP(w, r)
	})

	mux.HandleFunc("/build/individual/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, ".js") {
			w.Header().Add("Content-Type", "application/javascript")
		}
		http.StripPrefix("/build/individual/", http.FileServer(http.Dir("./build/individual/"))).ServeHTTP(w, r)
	})

	mux.HandleFunc("/styles.css", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/css")
		http.ServeFile(w, r, "styles.css")
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})

	log.Println("Listening on :8080...")
	err := http.ListenAndServe(":8080", mux)
	if err != nil {
		log.Fatal(err)
	}
}
