library(rvest)
library(stringr)
library(lubridate)
library(dplyr)

strany <- 1:268

urls <- character()

html <- read_html("https://www.hrad.cz/cs/pro-media/tiskove-zpravy/aktualni-tiskove-zpravy")
urelky <- html %>%
  html_nodes(".box-content") %>%
  html_attr("href")
urls <- append(urls, urelky)

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


datumy_clean <- unlist(pluck((str_split(datumy, "\n")),1))

parse_date_time(datumy_clean, "dMY")

datumy_clean <- str_replace(datumy_clean, "ledna", "1.")
datumy_clean <- str_replace(datumy_clean, "února", "2.")
datumy_clean <- str_replace(datumy_clean, "března", "3.")
datumy_clean <- str_replace(datumy_clean, "dubna", "4.")
datumy_clean <- str_replace(datumy_clean, "května", "5.")
datumy_clean <- str_replace(datumy_clean, "června", "6.")
datumy_clean <- str_replace(datumy_clean, "července", "7.")
datumy_clean <- str_replace(datumy_clean, "srpna", "8.")
datumy_clean <- str_replace(datumy_clean, "září", "9.")
datumy_clean <- str_replace(datumy_clean, "října", "10.")
datumy_clean <- str_replace(datumy_clean, "listopadu", "11.")
datumy_clean <- str_replace(datumy_clean, "prosince", "12.")


datumy_celan <- dmy(datumy_clean)

datumy_celan <- as.data.frame(datumy_celan)
datumy_celan$rok <- year(datumy_celan$datumy_celan)


datumy_celan %>%
  group_by(rok) %>%
  summarise(count=n())


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


write.csv(data.frame(datum=datum_split, titulek=titulky, url=urls), "hrad-tiskovky.csv")
