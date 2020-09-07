library(rvest)
library(stringr)

strany <- 1:268

urls <- character()

for (i in strany) {
  html <- read_html(paste0("https://www.hrad.cz/cs/pro-media/tiskove-zpravy/aktualni-tiskove-zpravy/strana-", i))
  urelky <- html %>%
    html_nodes(".box-content") %>%
    html_attr("href")
  urls <- append(urls, urelky)
}


datumy <- character()

for (i in urls) {
  html <- read_html(paste0("https://www.hrad.cz", i))
  datum <- html %>%
    html_node(".text-content > p:nth-child(2) > strong:nth-child(1)") %>%
    html_text() %>%
    str_trim() %>%
    print()
  datumy <- append(datumy, datum)
}


titulky <- character()

for (i in urls) {
  html <- read_html(paste0("https://www.hrad.cz", i))
  titulek <- html %>%
    html_node("h1") %>%
    html_text() %>%
    str_trim() %>%
    print()
  titulky <- append(titulky, titulek)
}

datum_split <- str_split(datumy, "\n")

datum_split <- pluck(datum_split, 1)

datum_split <- unlist(datum_split)


write.csv(data.frame(datum=datum_split, titulek=titulky, url=urls), "Desktop/hrad-tiskovky.csv")
