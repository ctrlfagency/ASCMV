#!/usr/bin/Rscript
#install.packages("tm")
#install.packages("Snowball")
#If it is not  working because of a conflict version
#install.packages('devtools')
#require(devtools)
#install.packages('RWeka','RWekajars','rJava')
#si erreur 
#sudo apt-get install r-cran-rjava
#sudo apt-get install icedtea-7-plugin
#Advice
#sudo R CMD javareconf
#install_url("https://cran.r-project.org/src/contrib/Archive/Snowball/Snowball_0.0-11.tar.gz")
#ls("packages:Snowball)
#require(Snowball)
setwd(Sys.getenv("PWD"))
library("tm")
library("Snowball")

closeAllConnections()
rm(list=ls())
con <- file("result.log")
sink(con, append=TRUE)
sink(con, append=TRUE, type="message")
#lit les fichiers csv
rm(list=ls())
read1 <- read.csv(file="coranfrt.csv",head=TRUE,sep="|")
#compte le nombre de lignes contenant les termes
nread1 <- (as.integer(nrow(read1[1])))
#prépare l'affichage de la 2eme colonne en lisant les 100 premiers enregistrements
doc1 <- read1[1:15, 4]
#doc.list <- list(doc1, doc2, doc3, doc4, doc5, doc6, doc7)
#names(doc.list) <- paste0("doc", c(1:nread1))

query <- ""

my.docs <- VectorSource(c(doc1, query))
my.docs$Names <- c(doc1, "query")

my.corpsdutexte <- Corpus(my.docs)
my.corpsdutexte

getTransformations()
#supprime la ponctuation
my.corpsdutexte <- tm_map(my.corpsdutexte, removePunctuation)

my.corpsdutexte <- tm_map(my.corpsdutexte, stemDocument)
my.corpsdutexte$doc1

my.corpsdutexte <- tm_map(my.corpsdutexte, removeNumbers)
my.corpsdutexte <- tm_map(my.corpsdutexte, content_transformer(tolower))
my.corpsdutexte <- tm_map(my.corpsdutexte, stripWhitespace)
my.corpsdutexte$doc1

term.doc.matrix.stm <- TermDocumentMatrix(my.corpsdutexte)
inspect(term.doc.matrix.stm[1, ])

term.doc.matrix <- as.matrix(term.doc.matrix.stm)

cat("Représentation de la fonction coût (de la matrice)", object.size(term.doc.matrix), "bytes.\n", 
    "Simple triplet matrix representation costs", object.size(term.doc.matrix.stm), 
    "bytes.")

get.tf.idf.weights <- function(tf.vec, df) {
  # Computes tfidf weights from a term frequency vector and a document
  # frequency scalar
  weight = rep(0, length(tf.vec))
  weight[tf.vec > 0] = (1 + log2(tf.vec[tf.vec > 0])) * log2(nread1/df)
  weight
}

#cat("Un mot apparait à l'aide de la fonction cat sur 4 / 6 documents, apparait 1, 2, 3, and 6 fois respectivement: \n", 
   # get.tf.idf.weights(c(1, 2, 3, 0, 0, 6), 5))

get.weights.per.term.vec <- function(tfidf.row) {
  term.df <- sum(tfidf.row[1:nread1] > 0)
  tf.idf.vec <- get.tf.idf.weights(tfidf.row, term.df)
  return(tf.idf.vec)
}

tfidf.matrix <- t(apply(term.doc.matrix, c(1), FUN = get.weights.per.term.vec))
colnames(tfidf.matrix) <- colnames(term.doc.matrix)

tfidf.matrix[1,1:15 ]

angle <- seq(-pi, pi, by = pi/16)
png("graphiquederecherche.png")
plot(cos(angle) ~ angle, type = "b", xlab = "Angle(radians)", main = "Similarité (cosinus)")

tfidf.matrix <- scale(tfidf.matrix, center = FALSE, scale = sqrt(colSums(tfidf.matrix^2)))
tfidf.matrix[1,1:15 ]
query.vector <- tfidf.matrix[, (nread1 + 1)]
tfidf.matrix <- tfidf.matrix[, 1:nread1]

doc.scores <- t(query.vector) %*% tfidf.matrix
#results.df <- data.frame(doc = names(doc.list), score = t(doc.scores), text = unlist(doc.list))

results.df <- data.frame(doc = names(doc1), score = t(doc.scores), text = doc1)
results.df <- results.df[order(results.df$score, decreasing = TRUE), ]
options(width = 2000)
print(results.df, row.names = FALSE, right = FALSE, digits = 2)

